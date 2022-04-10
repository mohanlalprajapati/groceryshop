export interface IGroceryItem {
    item_name : string;
    brand_name?: string;
    quantity: number;
    unit_type:number;
    is_purchased:boolean;
    remark?: string;
}
