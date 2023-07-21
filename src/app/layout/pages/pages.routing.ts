import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from "./pages.component";
import {AuthGuard} from "../../shared/guards/auth.guard";

const routes: Routes = [

  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'clients',
        canActivate: [AuthGuard],
        loadChildren: () => import('../../modules/client-register/cliente.module').then(m => m.ClientesModule)
      },
      {
        path: 'produtos',
        canActivate: [AuthGuard],
        loadChildren: () => import('../../modules/produtos/produtos.module').then(m => m.ProdutosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
