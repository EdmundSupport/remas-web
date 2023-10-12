import { Injectable, Inject } from "@nestjs/common";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { MeasureUnit, PriceCategory, Product, ProductPrice } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { Includeable, Op } from "sequelize";
import { PriceCategoryDto } from "src/api/v1/datasource/remas/shared/domain/dto/price-category.dto";


@Injectable()
export class PriceCategoryService {
    constructor(
        @Inject('PRICE_CATEGORY_REPOSITORY')
        private priceCategoryService: typeof PriceCategory,
    ) { }

    findAll(data?: Partial<PriceCategoryDto>) {
        data = JSON.parse(JSON.stringify(data));
        console.log("🚀 ~ file: price-category.service.ts:17 ~ PriceCategoryService ~ findAll ~ data:", data)
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        const productPrices = StructureHelper.searchProperty(data, 'productPrices', true)[0];
        console.log("🚀 ~ file: price-category.service.ts:20 ~ PriceCategoryService ~ findAll ~ productPrices:", productPrices)
        const products = StructureHelper.searchProperty(data, 'products', true)[0];
        if (data?.name) Object.assign(data, { name: { [Op.like]: `%${data.name}%` } });

        const include: Includeable | Includeable[] = [];
        if (productPrices && productPrices[0]) include.push({
            model: ProductPrice,
            where: productPrices[0],
            required: true,
        });

        if (products && products[0]) include.push({
            model: Product,
            where: products[0],
            as: 'products',
            required: true,
        });

        return this.priceCategoryService.findAll({
            // where: data,
            include: include,
            ...pagination,
        })
    }
}