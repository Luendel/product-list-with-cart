import { Component, OnInit } from "@angular/core";
import { GetProducts } from "../../services/GetProducts/GetProducts.service";
import { Observable } from "rxjs"

@Component({
    selector:"app-desserts",
    templateUrl:"./DessertsPage.component.html",
    styleUrl:"./DessertsPage.component.css"
})
export class Desserts implements OnInit {


    products!:Observable<any[]>;

    constructor(private get_products: GetProducts){}

    ngOnInit(): void {
        this.products = this.get_products.getProducts()
    }
}