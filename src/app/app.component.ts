import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DessertsModule } from './components/DessertsPage/DessertsPage.component.module';
import { CartModule } from './components/Cart/Cart.component.module';
import { SessionStorage } from './services/SessionStorage/SessionStorage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DessertsModule, CartModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-list-with-cart';

  items:any

  total = 0

  constructor(private storage:SessionStorage){}

  updateTotal(num:number) {
    this.total = num
  }
}
