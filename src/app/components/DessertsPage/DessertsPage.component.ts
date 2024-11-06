import { Component, OnInit, EventEmitter, Output, PLATFORM_ID, Inject } from "@angular/core";
import { GetProducts } from "../../services/GetProducts/GetProducts.service";
import { Observable, fromEvent, Subscription } from "rxjs"
import { SessionStorage } from "../../services/SessionStorage/SessionStorage.service";
import { isPlatformBrowser } from "@angular/common";

@Component({
    selector:"app-desserts",
    templateUrl:"./DessertsPage.component.html",
    styleUrl:"./DessertsPage.component.css"
})
export class Desserts implements OnInit {

    image_size:string = "mobile"

    resize_subscription!:Subscription;

    selected = {
        total:0,
        items:<any>[]
    };

    @Output() storageUpdated = new EventEmitter<number>();

    products!:Observable<any[]>;

    constructor(private get_products: GetProducts, private storage:SessionStorage, @Inject(PLATFORM_ID) private platformId:object){}

    ngOnInit(): void {
        this.storage.setItem("cart", this.selected)
        this.products = this.get_products.getProducts()

        if(isPlatformBrowser(this.platformId)){
           this.resize_subscription = fromEvent(window, "resize").subscribe(() => {
            this.handleImageSize(window.innerWidth)
        })
        
        }

        

    }

    handleImageSize(size:number){
        if(size <= 600){
            this.image_size = "mobile"
        } else if(size > 600 && size <= 1000){
            this.image_size = "tablet"
        } else {
            this.image_size = "desktop"
        }
    }

    returnProperImage(item:any){
        if(this.image_size == "mobile"){
            return item.mobile
        }

        if(this.image_size == "tablet"){
            return item.tablet
        }

        if(this.image_size == "desktop"){
            return item.desktop
        }
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

    removeAllFromCart(itemName:string){
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
            let temp_quantity;

            for(let k = 0 ; k < temp_items.length ; k++){
                if(temp_items[k] !== temp_items[i]){
                    new_temp_items.push(temp_items[k])
                }
                else {
                    temp_quantity = temp_items[k].quantity
                }
            }

            temp_items = new_temp_items
            this.selected.items = temp_items
            this.selected.total -= temp_quantity

            this.storage.setItem("cart",this.selected)
            this.storageUpdated.emit(this.selected.total)
        }

    }

    clearCart(){
        this.selected.total = 0;
        this.selected.items = [];

        this.storage.setItem("cart",this.selected)
        this.storageUpdated.emit(this.selected.total)
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