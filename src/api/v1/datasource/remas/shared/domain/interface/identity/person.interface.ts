import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface PersonInterface{
	uuid: string;

	number: string;

	nameFirst: string;

	nameSecond: string;

	nameOther: string;

	surnameFirst: string;

	surnameSecond: string;

	surnameOther: string;

	birthday: Date;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	pagination: PaginationInterface;
}