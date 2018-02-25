import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MealsService } from './services/meals/meals.service';

@NgModule({
  imports: [CommonModule, AngularFireDatabaseModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [MealsService]
    };
  }
}
