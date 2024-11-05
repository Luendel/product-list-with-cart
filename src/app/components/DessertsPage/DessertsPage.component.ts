import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { GetProducts } from "../../services/GetProducts/GetProducts.service";
import { Observable } from "rxjs"
import { SessionStorage } from "../../services/SessionStorage/SessionStorage.service";

@Component({
    selector:"app-desserts",
    templateUrl:"./DessertsPage.component.html",
    styleUrl:"./DessertsPage.component.css"
})
export class Desserts implements OnInit {

    selected = {
        total:0,
        items:<any>[]
    };

    @Output() storageUpdated = new EventEmitter<number>();

    products!:Observable<any[]>;

    constructor(private get_products: GetProducts, private storage:SessionStorage){}

    ngOnInit(): void {
        this.storage.setItem("cart", this.selected)
        this.products = this.get_products.getProducts()
    }

    addToCart(item:any){
        let temp:any = this.storage.getItem("cart")

        if(temp.total === 0 ){
            this.selected.items.push({
                name:item.name,
                quantity:1,
                price:item.price
            })
            this.selected.total++;
            this.storage.setItem("cart",this.selected)
            console.log(this.storage.getItem("cart"))
        }
        else{
            let i = 0
           
            while(this.selected.items[i].name != item.name){
                i++

                if(i== this.selected.items.length){
                    break
                }
            }

            if(i<this.selected.items.length){
                this.selected.items[i].quantity++
                this.selected.total++
                this.storage.setItem("cart",this.selected)
                console.log(this.storage.getItem("cart"))
            }

            else {
                this.selected.items.push({
                    name:item.name,
                    quantity:1,
                    price:item.price
                })
                this.selected.total++
                this.storage.setItem("cart",this.selected)
                console.log(this.storage.getItem("cart"))
            }
        }

        this.storageUpdated.emit(this.selected.total)
    }

    removeFromCart(itemName:string){
        let temp_items = this.selected.items;

        let i = 0;

        while(temp_items[i].name !== itemName){
            i++

            if(i == temp_items.length){
                break
            }
        }

        if(i < temp_items.length) {
            let new_temp_items:any[] = []

            for(let k = 0 ; k < temp_items.length ; k++){
                if(temp_items[k] !== temp_items[i]){
                    new_temp_items.push(temp_items[k])
                }
                else {
                    if(temp_items[k].quantity > 1){
                        new_temp_items.push(temp_items[k])
                        new_temp_items[k].quantity--
                    }
                }
            }

            temp_items = new_temp_items

            this.selected.items = temp_items
            this.selected.total--

            this.storage.setItem("cart", this.selected)

            this.storageUpdated.emit(this.selected.total)
        }
    }

    isSelected(name:string){
        return this.selected.items.some(function(item:any):boolean {
            return item.name === name
        } )
    }

    quantityOfProducts(productName:string):number{
        let i = 0;

        while(this.selected.items[i].name !== productName){
            i++

            if(i == this.selected.items.length){
                return 0
            }
        }

        return this.selected.items[i].quantity
    }


    ifEnter(event:any){
        if(event.key == "Enter"){
            event.target.dispatchEvent(new Event("click"))
        }
        else{
            console.log(event)
        }
    }
}