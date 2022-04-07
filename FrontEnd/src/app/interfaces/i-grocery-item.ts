export interface IGroceryItem {
  grocery_list : number;
  item_name : string;
  brand_name?: string;
  quantity: number;
  unittype: number;
  is_purchased: boolean;
  remark:string;
}
