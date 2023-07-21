import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos.routing';
import { ProdutosComponent } from './produtos/produtos.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    ProdutosComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    CoreModule
  ]
})
export class ProdutosModule { }
