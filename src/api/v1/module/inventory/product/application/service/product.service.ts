import { Injectable, Inject } from "@nestjs/common";
// import { ProductCreateInterface as CreateInterface } from "../../domain/interface/product-create.interface";
// import { ProductInterface as FindInterface } from "src/api/v1/datasource/remas/shared/domain/interface/product.interface";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { Measure, Product, ProductMaintenanceStep, ProductMaintenanceStepDetail, ProductType } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { ProductDto } from "src/api/v1/datasource/remas/shared/domain/dto/product.dto";
import { Op, WhereOptions } from "sequelize";
import { CreateProductDto } from "../../domain/dto/product.dto";
import { FilterResponseHelper } from "shared/filter_response";
import { ValidationHelper } from "shared/validation/application/helper/validation.helper";


@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productService: typeof Product,
        @Inject('PRODUCT_MAINTENANCE_STEP_REPOSITORY')
        private productMantenanceStepService: typeof ProductMaintenanceStep,
        @Inject('PRODUCT_MAINTENANCE_STEP_DETAIL_REPOSITORY')
        private productMantenanceStepDetailService: typeof ProductMaintenanceStepDetail,
    ) { }

    create(data: CreateProductDto) {
        data = JSON.parse(JSON.stringify(data));
        const productMaintenanceSteps = StructureHelper.searchProperty(data, 'productMaintenanceSteps', true)[0];


        const include = [];
        if (productMaintenanceSteps && productMaintenanceSteps[0]) {
            const productMaintenanceStepDetails = StructureHelper.searchProperty(productMaintenanceSteps[0], 'productMaintenanceStepDetails', true)[0];
            const stepInclude = [];
            if (productMaintenanceStepDetails && productMaintenanceStepDetails[0]) {
                productMaintenanceStepDetails.forEach((productMaintenanceStepDetail) => {
                    if (productMaintenanceStepDetail.productUuid == data.uuid) {
                        throw FilterResponseHelper.httpException('BAD_REQUEST', 'El producto principal no puede ser elegido en el detalle de pasos de mantenimientos.');
                    }
                });
                stepInclude.push({
                    model: ProductMaintenanceStepDetail,
                    require: true,
                });
            }
            include.push({
                model: ProductMaintenanceStep,
                require: true,
            });
        }

        if (!ValidationHelper.isUUID(data?.uuid)) delete data.uuid;
        return this.productService.create(data as any, {
            include: include,
        });
    }

    findAll(data?: Partial<ProductDto>) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        const productChild = StructureHelper.searchProperty(data, 'productChild', true)[0];
        if (productChild?.name) Object.assign(productChild, { name: { [Op.like]: `%${productChild.name}%` } });
        const productParent = StructureHelper.searchProperty(data, 'productParent', true)[0];
        if (productParent?.name) Object.assign(productParent, { name: { [Op.like]: `%${productParent.name}%` } });
        const measure = StructureHelper.searchProperty(data, 'measure', true)[0];
        if (measure?.name) Object.assign(measure, { name: { [Op.like]: `%${measure.name}%` } });
        const productType = StructureHelper.searchProperty(data, 'productType', true)[0];
        if (productType?.name) Object.assign(productType, { name: { [Op.like]: `%${productType.name}%` } });
        if (data?.name) Object.assign(data, { name: { [Op.like]: `%${data.name}%` } });
        if (data?.description) Object.assign(data, { description: { [Op.like]: `%${data.description}%` } });
        if (data?.sku) Object.assign(data, { sku: { [Op.like]: `%${data.sku}%` } });

        if (!data?.condition) {
            Object.assign(data, { condition: true });
        }

        const productMaintenanceSteps = StructureHelper.searchProperty(data, 'productMaintenanceSteps', true)[0];

        const include = [];
        if (productMaintenanceSteps) {
            const productMaintenanceStepDetails = StructureHelper.searchProperty(productMaintenanceSteps, 'productMaintenanceStepDetails', true)[0];
            const productMaintenanceStepDetailsInclude = [];
            if (productMaintenanceStepDetails) productMaintenanceStepDetailsInclude.push({
                model: ProductMaintenanceStepDetail,
                where: productMaintenanceStepDetails
            });

            include.push({
                model: ProductMaintenanceStep,
                where: productMaintenanceSteps,
                include: productMaintenanceStepDetailsInclude,
            });
        }
        if (productChild) include.push({
            model: Product,
            as: 'productChild',
            where: productChild,
        });

        if (productParent) include.push({
            model: Product,
            as: 'productParent',
            where: productParent,
        });

        if (measure) include.push({
            model: Measure,
            where: measure
        });

        if (productType) include.push({
            model: ProductType,
        });

        return this.productService.findAll({
            where: data,
            include: include,
            ...pagination,
        });
    }

    async findOne(uuid: string) {
        // const product = JSON.parse(JSON.stringify(
        const product = JSON.parse(JSON.stringify((await this.productService.findOne({
            where: { uuid },
            include: [{
                model: ProductMaintenanceStep,
                include: [{
                    model: ProductMaintenanceStepDetail
                }]
            }]
        }))));
        product.productMaintenanceSteps = product.productMaintenanceSteps.map((productMaintenanceStep) => {
            productMaintenanceStep.productMaintenanceStepDetails = productMaintenanceStep['pmsd'];
            delete productMaintenanceStep['pmsd'];
            return productMaintenanceStep;
        });
        return product;
    }

    async update(uuid: string, data: CreateProductDto) {
        data = JSON.parse(JSON.stringify(data));
        const productMaintenanceSteps = StructureHelper.searchProperty(data, 'productMaintenanceSteps')[0] as ProductMaintenanceStep[] | undefined;

        const stepsSaveUuid = productMaintenanceSteps.map((stepSave) => stepSave.uuid);
        const stepsDelete = await this.productMantenanceStepService.findAll({
            where: { uuid: { [Op.notIn]: stepsSaveUuid }, productUuid: uuid }
        });
        const deleteStepsUuid = stepsDelete.map((stepDelete) => stepDelete.uuid);
        if (deleteStepsUuid && deleteStepsUuid.length > 0) await this.productMantenanceStepService.destroy({ where: { uuid: { [Op.in]: deleteStepsUuid } } });

        const detailsSaveUuid = productMaintenanceSteps.map((stepSave, index, array) => {
            const stepsSave = stepSave?.productMaintenanceStepDetails?.map((detail) => detail.uuid) ?? [];
            if (!stepSave) {
                const deleted = array.splice(index, 1);
            }

            return stepsSave;
        }).flat();

        const detailsDelete = await this.productMantenanceStepDetailService.findAll({
            where: {
                uuid: { [Op.notIn]: detailsSaveUuid },
                productMaintenanceStepUuid: { [Op.in]: stepsSaveUuid }
            }
        });
        const deleteDetailsUuid = detailsDelete.map((detailDelete) => detailDelete.uuid);
        if (deleteDetailsUuid && deleteDetailsUuid.length > 0) await this.productMantenanceStepDetailService.destroy({ where: { uuid: { [Op.in]: deleteDetailsUuid } } });

        for (let index = 0; index < productMaintenanceSteps.length; index++) {
            const productMaintenanceStep = productMaintenanceSteps[index];
            if (productMaintenanceStep?.uuid) await this.productMantenanceStepService.update(productMaintenanceStep, { where: { uuid: productMaintenanceStep.uuid } })
            else await this.productMantenanceStepService.create(productMaintenanceStep as any);

            const productMaintenanceStepDetails = StructureHelper.searchProperty(productMaintenanceStep, 'productMaintenanceStepDetails')[0] as ProductMaintenanceStepDetail[] | undefined;
            for (let indexDetail = 0; indexDetail < productMaintenanceStepDetails?.length; indexDetail++) {
                const productMaintenanceStepDetail = productMaintenanceStepDetails[indexDetail];
                if (productMaintenanceStepDetail?.uuid) await this.productMantenanceStepDetailService.update(productMaintenanceStepDetail, { where: { uuid: productMaintenanceStepDetail.uuid } })
                else await this.productMantenanceStepDetailService.create(productMaintenanceStepDetail as any)
            }

        }

        await this.productService.update(data as any, { where: { uuid } });
        return true;
    }
}