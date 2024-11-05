import { Component, OnInit,Input } from "@angular/core";
import { SessionStorage } from "../../services/SessionStorage/SessionStorage.service"; 
import { Subscription, fromEvent} from "rxjs"

@Component({
    selector:"app-cart",
    templateUrl:"./Cart.component.html",
    styleUrl:"./Cart.component.css"
})
export class Cart implements OnInit {

    @Input() total:any

    items:any;

    cartSubscription!: Subscription

    constructor(private storage: SessionStorage){}

    ngOnInit(): void {
        this.items = this.storage.getItem("cart")
    }

}