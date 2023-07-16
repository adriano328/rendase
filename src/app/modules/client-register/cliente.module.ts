import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRouting } from './cliente.routing';
import {CoreModule} from "../../core/core.module";
import { ViewLocationComponent } from './view-clients/view-clients.component';
import { ClientesComponent } from './clients/clientes.component';


@NgModule({
  declarations: [
    ClientesComponent,
    ViewLocationComponent
  ],
    imports: [
        CommonModule,
        DashboardRouting,
        CoreModule,
    ]
})
export class ClientesModule { }