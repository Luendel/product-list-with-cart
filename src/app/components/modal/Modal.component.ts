import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { GetProducts } from "../../services/GetProducts/GetProducts.service";
import { Subscription } from "rxjs";

@Component({
    selector:"app-modal",
    templateUrl:"./Modal.component.html",
    styleUrl:"./Modal.component.css"
})
export class Modal implements OnInit, OnDestroy{
    @Input() tab:any;

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

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
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

    ifEnter(event:any){
        if(event.key == "Enter"){
            event.target.dispatchEvent(new Event("click"))
        }
        else{
            
        }
    }

    handleTab(){
        if(this.tab == -1){
            return 0
        }
        
        return (-1)
    }

}