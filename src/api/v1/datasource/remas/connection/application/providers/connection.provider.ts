import { SessionType, User, Role, Permission, Privilege, UserPerson, Session, Module, RolePermission } from "../../../shared";
import { Client, QuotationStatus, Quotation, QuotationDetail, Maintenance, MaintenanceStep, MaintenanceStepDetail, MaintenanceStatus } from "../../../shared/domain/model/billing";
import { QuotationCharge } from "../../../shared/domain/model/billing/quotation-charge";
import { QuotationMaintenance } from "../../../shared/domain/model/billing/quotation-maintenance";
import { Country, Province, City, Address } from "../../../shared/domain/model/contact";
import { TributeCodeType, Tribute  as TributeGuatemala } from "../../../shared/domain/model/guatemala";
import { Person, Tribute, Company, Branch } from "../../../shared/domain/model/identity";
import { Product, ProductType, Measure, PriceCategory, MeasureUnit, ProductPrice, ProductMaintenanceStep, ProductMaintenanceStepDetail, ChargeStatus, Charge, ChargeDetailScheduled, ChargeDetail, DischargeStatus, Discharge, DischargeDetailScheduled, DischargeDetail } from "../../../shared/domain/model/inventory";
import { InventoryMovement } from "../../../shared/domain/model/inventory/inventory-movement";

export const models = [
    RolePermission,
    Address,
    Branch,
    City,
    Client,
    Company,
    Country,
    Maintenance,
    MaintenanceStatus,
    MaintenanceStep,
    MaintenanceStepDetail,
    Measure,
    MeasureUnit,
    Module,
    Permission,
    Person,
    PriceCategory,
    Privilege,
    Product,
    ProductMaintenanceStep,
    ProductMaintenanceStepDetail,
    ProductPrice,
    ProductType,
    Province,
    Quotation,
    QuotationDetail,
    QuotationStatus,
    Role,
    Session,
    SessionType,
    Tribute,
    TributeCodeType,
    TributeGuatemala,
    User,
    UserPerson,
    ChargeStatus,
    Charge,
    ChargeDetailScheduled,
    ChargeDetail,
    DischargeStatus,
    Discharge,
    DischargeDetailScheduled,
    DischargeDetail,
    QuotationMaintenance,
    QuotationCharge,
    InventoryMovement
]