import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoComponent } from './produto/produto.component';

const routes: Routes = [
  {
    path: '', component: ProdutosComponent
  },
  {
    path: 'produto', component: ProdutoComponent
  },
  {
    path: 'produto/:id', component: ProdutoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
