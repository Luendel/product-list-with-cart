import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:"app-cart",
    templateUrl:"./Cart.component.html",
    styleUrl:"./Cart.component.css"
})
export class Cart {

    @Input() total:any;

    @Input() items:any;

    @Input() total_price:any;

    @Output() removeItem:EventEmitter<string> = new EventEmitter()

    @Output() displayModal: EventEmitter<any> = new EventEmitter()

    removeItemHandler(itemName:string){
        this.removeItem.emit(itemName)
    }

    handleClick(){
        this.displayModal.emit()
    }

}