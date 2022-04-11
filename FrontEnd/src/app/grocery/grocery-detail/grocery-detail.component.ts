import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUnitType } from 'src/app/interfaces/i-unit-type';
import { UnitTypesService } from '../../services/unit-types.service';
import { IGroceryItem } from '../../interfaces/i-grocery-item';
import { GroceryService } from '../../services/grocery.service';
import { IGroceryList } from 'src/app/interfaces/i-grocery-list';
import { GroceryItemService } from 'src/app/services/groceryitem.service';

@Component({
  selector: 'app-grocery-detail',
  templateUrl: './grocery-detail.component.html',
  styleUrls: ['./grocery-detail.component.css']
})
export class GroceryDetailComponent implements OnInit {
  lstUnitTypes: IUnitType[] = [];
  lstGroceryListItems: IGroceryItem[] = [];
  groceryListId!: number | null;
  groceryDetailForm!: FormGroup;
  groceryListName!: FormControl;
  groceryItems!: FormArray;
  errorMessage: string = "";
  constructor(private groceryService: GroceryService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private unitTYpeService: UnitTypesService,
    private groceryItemService: GroceryItemService) { }

  ngOnInit(): void {
    this.unitTYpeService.getUnitTypes().subscribe({
      next: (result) => {
        this.lstUnitTypes = result || [];
      }, error: (error) => {
        console.log("No unit are available")
      }
    });
    this.groceryListId = this.route.snapshot.params['grocerylist_id'];
    this.groceryListName = new FormControl('', [Validators.required]);
    this.groceryDetailForm = this.fb.group({
      name: this.groceryListName,
      items: this.fb.array([])
    });
    if (this.groceryListId) {
      this.groceryService.getGroceryList(this.groceryListId).subscribe({
        next: (result) => {
          this.groceryDetailForm.patchValue({ name: result.name });
          console.log(result.items);
          if (result.items) {
            for (let groceryItem of result.items) {
              this.GroceryItems.push(this.addGroceryItem(groceryItem));
            }
          }
          this.addGroceryItem()
        }, error: (error) => {
          alert("Particular Grocery list is not avaialble.")
          this.router.navigate(['/']);
        }
      });
    }
  }
  get GroceryListName(): FormControl {
    return this.groceryDetailForm.get('name') as FormControl;
  }
  get GroceryItems(): FormArray {
    return this.groceryDetailForm.get('items') as FormArray;
  }
  addGroceryItem(groceryItem?: IGroceryItem): FormGroup {
    return this.fb.group({
      id: new FormControl(groceryItem?.id || 0),
      item_name: new FormControl({value:groceryItem?.item_name, disabled:groceryItem?.is_purchased || false}, Validators.required),
      brand_name: new FormControl({value:groceryItem?.brand_name, disabled:groceryItem?.is_purchased || false}),
      quantity: new FormControl({value:groceryItem?.quantity,disabled:groceryItem?.is_purchased || false},
        [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)
        ]),
      unit_type: new FormControl({value:groceryItem?.unit_type || "", disabled:groceryItem?.is_purchased || false}, [Validators.required]),
      is_purchased: new FormControl(groceryItem?.is_purchased || false, [Validators.required]),
      remark: new FormControl({value:groceryItem?.remark,disabled:groceryItem?.is_purchased || false}),
    })
  };

  onSubmit() {
    if (this.groceryDetailForm.valid) {
      const groceryList = this.groceryDetailForm.getRawValue();

      if (this.groceryListId) {
        this.groceryService.updateGroceryList(this.groceryListId, groceryList).subscribe({
          next: (result) => {
            this.errorMessage = "";
            this.router.navigateByUrl('/');

          },
          error: this.handleError
        });
      } else {
        this.groceryService.addGroceryList(groceryList).subscribe({
          next: (result) => {

            this.errorMessage = "";
            this.router.navigateByUrl('/');

          },
          error: (error) => {

            switch (error.status) {
              case 401:
                this.errorMessage = error.error.detail;
                break;
              case 0:
                this.errorMessage = 'Not able to connect to grocery service';
                break;
              default:
                this.errorMessage = 'Unknown Error. Please contact to programing team.';
            }
          }
        });
      }
    } else {
       this.errorMessage = "Please enter valid inputs."
    }
  }
  compareUnitType(ut1: number, ut2: number): boolean {
    return ut1 && ut2 ? ut1 === ut2 : false;
  }
  addGrocreyItemControl() {
    this.GroceryItems.push(this.addGroceryItem());
  }
  onMarkPurchasedChange(event: any,index:number)  {
    const values: IGroceryItem[] = this.GroceryItems.getRawValue() as IGroceryItem[];
    const groceryItemId = values[index].id;
    if (groceryItemId && groceryItemId > 0 ) {
      this.groceryItemService.updateGroceryItem(values[index]).subscribe({
        next: () => {
          //this.GroceryItems.removeAt(index);
          if(values[index].is_purchased) {
            this.GroceryItems.at(index).get("item_name")?.disable();
            this.GroceryItems.at(index).get("brand_name")?.disable();
            this.GroceryItems.at(index).get("quantity")?.disable();
            this.GroceryItems.at(index).get("unit_type")?.disable();
            this.GroceryItems.at(index).get("remark")?.disable();
          } else {
            this.GroceryItems.at(index).get("item_name")?.enable();
            this.GroceryItems.at(index).get("brand_name")?.enable();
            this.GroceryItems.at(index).get("quantity")?.enable();
            this.GroceryItems.at(index).get("unit_type")?.enable();
            this.GroceryItems.at(index).get("remark")?.enable();
          }
          
        }, error: this.handleError
      });
    }
  }
  removeGroceryItem(index: number) {

    const values: IGroceryItem[] = this.GroceryItems.getRawValue() as IGroceryItem[];
    const groceryItemId = values[index].id;
    if (groceryItemId && groceryItemId > 0) {
      this.groceryItemService.deleteGroceryItem(groceryItemId).subscribe({
        next: () => {
          this.GroceryItems.removeAt(index);
        }, error: this.handleError
      });
    }
    this.GroceryItems.removeAt(index);
  }
  handleError(error: any): void {

    switch (error.status) {
      case 401:
        this.errorMessage = error.error.detail;
        break;
      case 0:
        this.errorMessage = 'Not able to connect to grocery service';
        break;
      default:
        this.errorMessage = 'Unknown Error. Please contact to programing team.';
    }
  }
}
