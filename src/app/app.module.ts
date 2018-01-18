import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Store } from 'store';

import { CreditCardDirective } from './components/credit-card.directive';
import { AppComponent } from './containers/app/app.component';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';

export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    StockInventoryModule
  ],
  declarations: [AppComponent, CreditCardDirective],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}
