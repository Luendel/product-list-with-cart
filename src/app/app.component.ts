import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DessertsModule } from './components/DessertsPage/DessertsPage.component.module';
import { CartModule } from './components/Cart/Cart.component.module';
import { SessionStorage } from './services/SessionStorage/SessionStorage.service';
import { Desserts } from './components/DessertsPage/DessertsPage.component';
import { ModalModule } from './components/modal/Modal.component.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DessertsModule, CartModule, ModalModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(Desserts) desserts!:Desserts; 

  title = 'product-list-with-cart';

  items:any

  total = 0

  total_price:any = 0

  constructor(private storage:SessionStorage){}

  updateTotal(num:number) {
    this.total = num

    let temp:any = this.storage.getItem("cart")

    this.items = temp.items

    let temp_total = 0

    this.items.forEach(function (item:any):void{
      temp_total+= (item.price*item.quantity)
    })

    this.total_price = temp_total;
  }

  removeItem(itemName:string){
    this.desserts.removeAllFromCart(itemName)
  }
}
