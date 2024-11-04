import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DessertsModule } from './components/DessertsPage/DessertsPage.component.module';
import { CartModule } from './components/Cart/Cart.component.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DessertsModule, CartModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-list-with-cart';
}
