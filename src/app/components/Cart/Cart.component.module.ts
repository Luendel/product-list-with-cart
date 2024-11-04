import { NgModule } from "@angular/core"
import { Cart } from "./Cart.component";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations:[Cart],
    imports:[CommonModule],
    exports:[Cart]
})
export class CartModule {

}