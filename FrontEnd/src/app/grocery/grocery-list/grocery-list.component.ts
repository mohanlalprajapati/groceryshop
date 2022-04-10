import { Component, OnInit } from '@angular/core';
import { IGroceryList } from '../../interfaces/i-grocery-list';
import { GroceryService } from '../../services/grocery.service';
// import {NgbdSortableHeader, SortEvent} from './sortable.directive';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  lstGroceryList?: IGroceryList[] ;
  constructor(private groceryService:GroceryService) { }

  ngOnInit(): void {
    this.groceryService.getAllGroceryList().subscribe({next: (result) => {
        this.lstGroceryList = result;
    },error: (error) => {
      console.log("No list")
    }});
  }

  deleteGroceryList(id : number) : void {
     const response = confirm("Do you really want to delete list?");
     if(response) {
        this.groceryService.deleteGroceryList(id).subscribe(next => {
            this.lstGroceryList = this.lstGroceryList?.filter(item => item.id !== id);
        });
     }
  }

}
