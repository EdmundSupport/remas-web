import { Injectable, Inject } from "@nestjs/common";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { ProductType } from "src/api/v1/datasource/remas/shared/domain/model/inventory";
import { Op } from "sequelize";
import { ProductTypeDto } from "src/api/v1/datasource/remas/shared/domain/dto/product-type.dto";


@Injectable()
export class ProductTypeService {
    constructor(
        @Inject('PRODUCT_TYPE_REPOSITORY')
        private productTypeService: typeof ProductType,
    ) { }

    findAll(data?: Partial<ProductTypeDto>) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        if (data?.name) Object.assign(data, { name: { [Op.like]: `%${data.name}%` } });

        const include = [];

        return this.productTypeService.findAll({
            where: data,
            include: include,
            ...pagination,
        })
    }
}