import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLocationComponent } from './view-clients/view-clients.component';
import { ClientesComponent } from './clients/clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
  },
  {
    path:'view-client',
    component: ViewLocationComponent
  },
  {
    path:'view-client/:id',
    component: ViewLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouting { }
