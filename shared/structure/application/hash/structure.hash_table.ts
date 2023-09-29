import { Injectable } from "@nestjs/common";

@Injectable()
export class StructureHashTable{
    private table: any[];
    private size: number;
    constructor() {
        this.table = new Array();
        this.size = 0;
    }

    _hash(key: string) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length;
    }

    set(key: string, value: any) {
        const index: number = this._hash(key);
        this.table[index] = [key, value];
        this.size++;
    }

    get(key: string) {
        const target = this._hash(key);
        return this.table[target];
    }

    remove(key: string) {
        const index = this._hash(key);

        if (this.table[index] && this.table[index].length) {
            this.table[index] = [];
            this.size--;
            return true;
        } else {
            return false;
        }
    }
}