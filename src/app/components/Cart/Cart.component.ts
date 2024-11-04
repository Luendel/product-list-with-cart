import { Component } from "@angular/core";

@Component({
    selector:"app-cart",
    templateUrl:"./Cart.component.html",
    styleUrl:"./Cart.component.css"
})
export class Cart {

    items = 0;
    isEmpty = true
}