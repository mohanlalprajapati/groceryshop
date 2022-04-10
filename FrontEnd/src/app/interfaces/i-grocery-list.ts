import { IGroceryItem } from "./i-grocery-item";

export interface IGroceryList {
  name: string;
  id:number;
  created_date : Date;
  owner: number;
  shared_with : string[];
  items?: IGroceryItem[];
}
