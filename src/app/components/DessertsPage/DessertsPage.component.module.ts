import { NgModule } from "@angular/core";
import { Desserts } from "./DessertsPage.component";
import { CommonModule } from "@angular/common"

@NgModule({
    declarations:[Desserts],
    imports:[CommonModule],
    exports:[Desserts]
})
export class DessertsModule {
    
}