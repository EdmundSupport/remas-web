import { RoleInterface } from "src/app/datasource/remas/domain/interface/role.interface";

export interface FindRoleInterface extends Omit<RoleInterface, 'date'> {
    date: Date | [Date, Date]
}