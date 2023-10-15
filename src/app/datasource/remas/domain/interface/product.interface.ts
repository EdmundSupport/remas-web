import { MeasureInterface } from "./measure.interface";
import { PaginationInterface } from "./pagination.interface";
import { PriceCategoryInterface } from "./price-category.interface";
import { ProductMaintenanceStepDetailInterface } from "./product-maintenance-step-detail.interface";
import { ProductMaintenanceStepInterface } from "./product-maintenance-step.interface";
import { ProductPriceInterface } from "./product-price.interface";
import { ProductTypeInterface } from "./product-type.interface";

export interface ProductInterface {
        
        uuid: string;
        sku: string;
        name: string;
        description: string;
        parentUuid: string;
        measureUuid: string;
        productTypeUuid: string;
        condition: boolean;
        createdAt: Date;
        updatedAt: Date;
        products: ProductInterface[];
        product: ProductInterface;
        measure: MeasureInterface;
        productType: ProductTypeInterface;
        productPrices: ProductPriceInterface[];
        priceCategories: PriceCategoryInterface[];
        productMaintenanceSteps: ProductMaintenanceStepInterface[];
        productMaintenanceStepDetails: ProductMaintenanceStepDetailInterface[];
        pagination: PaginationInterface;
}