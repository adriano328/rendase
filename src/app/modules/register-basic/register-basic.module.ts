import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterBasicRoutingModule } from './register-basic.routing';
import { RegisterBasicComponent } from './register-basic/register-basic.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    RegisterBasicComponent
  ],
  imports: [
    CommonModule,
    RegisterBasicRoutingModule,
    CoreModule
  ]
})
export class RegisterBasicModule { }
