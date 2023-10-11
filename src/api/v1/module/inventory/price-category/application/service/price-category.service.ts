import { Injectable, Inject } from "@nestjs/common";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { MeasureUnit, PriceCategory, Product, ProductPrice } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { Op } from "sequelize";
import { PriceCategoryDto } from "src/api/v1/datasource/remas/shared/domain/dto/price-category.dto";


@Injectable()
export class PriceCategoryService {
    constructor(
        @Inject('PRICE_CATEGORY_REPOSITORY')
        private priceCategoryService: typeof PriceCategory,
    ) { }

    findAll(data?: Partial<PriceCategoryDto>) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        const productPrices = StructureHelper.searchProperty(data, 'productPrices', true)[0];
        const products = StructureHelper.searchProperty(data, 'products', true)[0];

        const include = [];
        if (productPrices) include.push({
            model: ProductPrice,
            where: productPrices
        });

        if (products) include.push({
            model: Product,
            where: products,
        });

        return this.priceCategoryService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }
}