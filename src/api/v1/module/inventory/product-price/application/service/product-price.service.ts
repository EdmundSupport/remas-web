import { Injectable, Inject } from "@nestjs/common";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { MeasureUnit, ProductPrice, Product } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { Op } from "sequelize";
import { ProductPriceDto } from "src/api/v1/datasource/remas/shared/domain/dto/product-price.dto";


@Injectable()
export class ProductPriceService {
    constructor(
        @Inject('PRODUCT_PRICE_REPOSITORY')
        private productPriceService: typeof ProductPrice,
    ) { }

    findAll(data?: Partial<ProductPriceDto>) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        const measureUnit = StructureHelper.searchProperty(data, 'measureUnit', true)[0];
        if (measureUnit?.name) Object.assign(measureUnit, { name: { [Op.like]: `%${measureUnit.name}%` } });
        const product = StructureHelper.searchProperty(data, 'product', true)[0];
        if (product?.name) Object.assign(product, { name: { [Op.like]: `%${product.name}%` } });

        const include = [];
        if (measureUnit) include.push({
            model: MeasureUnit,
            where: measureUnit
        });

        if (product) include.push({
            model: Product,
            where: product,
        });

        return this.productPriceService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }
}