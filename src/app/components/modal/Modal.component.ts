import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { GetProducts } from "../../services/GetProducts/GetProducts.service";
import { Subscription } from "rxjs";

@Component({
    selector:"app-modal",
    templateUrl:"./Modal.component.html",
    styleUrl:"./Modal.component.css"
})
export class Modal implements OnInit{
    @Input() totalPrice:any;
    @Input() items:any;
    @Input() class:any;
    @Output() clearCart:EventEmitter<any> = new EventEmitter()

    products:any;

    subscription!: Subscription;

    constructor(private get_products:GetProducts){}

    ngOnInit(): void {
        let temp:any;

        this.subscription = this.get_products.getProducts().subscribe(function(item:any):void{
            temp = item
        })

        this.products = temp
    }

    handleClick(){
        this.clearCart.emit()
    }

    handleSrc(name:string){
        let temp = this.products
        let i = 0

        while(temp[i].name !== name){
            i++

            if(i > temp.length){
                break
            }
        }

        return temp[i].image.thumbnail
    }

}