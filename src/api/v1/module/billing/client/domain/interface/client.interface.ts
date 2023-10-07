export class PaginationInterface {
    limit?: number;
    offset?: number;
}

export class FindInterface {
    pagination: PaginationInterface;
 };