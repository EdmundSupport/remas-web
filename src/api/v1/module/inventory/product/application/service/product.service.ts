import { Injectable, Inject } from "@nestjs/common";
import { Client, Quotation, QuotationDetail } from "src/api/v1/datasource/remas/shared/domain/model/billing";
// import { ProductCreateInterface as CreateInterface } from "../../domain/interface/product-create.interface";
// import { ProductInterface as FindInterface } from "src/api/v1/datasource/remas/shared/domain/interface/product.interface";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { Measure, Product, ProductMaintenanceStep, ProductMaintenanceStepDetail, ProductType } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { ProductDto } from "src/api/v1/datasource/remas/shared/domain/dto/product.dto";
import { Op, WhereOptions } from "sequelize";


@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productService: typeof Product,
    ) { }

    // create(data: CreateInterface) {
    //     return this.quotationService.create(data);
    // }

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

        if(!data?.condition){
            Object.assign(data, {condition: true});
        }

        const productMaintenanceStep = StructureHelper.searchProperty(data, 'productMaintenanceStep', true)[0];

        const include = [];
        if (productMaintenanceStep) {
            const productMaintenanceStepDetail = StructureHelper.searchProperty(productMaintenanceStep, 'productMaintenanceStepDetail', true)[0];
            const productMaintenanceStepDetailInclude = [];
            if (productMaintenanceStepDetail) productMaintenanceStepDetailInclude.push({
                model: ProductMaintenanceStepDetail,
                where: productMaintenanceStepDetail
            });

            include.push({
                model: ProductMaintenanceStep,
                where: productMaintenanceStep,
                include: productMaintenanceStepDetailInclude,
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
        })
    }
}