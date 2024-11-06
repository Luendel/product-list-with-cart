import { NgModule } from "@angular/core";
import { Modal } from "./Modal.component";
import { CommonModule } from "@angular/common"

@NgModule({
    declarations:[Modal],
    imports:[CommonModule],
    exports:[Modal]
})
export class ModalModule {

}