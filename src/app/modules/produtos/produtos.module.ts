import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos.routing';
import { ProdutosComponent } from './produtos/produtos.component';
import { CoreModule } from 'src/app/core/core.module';
import { ProdutoComponent } from './produto/produto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProdutosComponent,
    ProdutoComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    CoreModule,
  ]
})
export class ProdutosModule { }
