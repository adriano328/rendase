import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';
import { ICategoria, IProduto } from 'src/app/shared/interfaces/IProduto';
import { ISelect } from 'src/app/shared/interfaces/core/ISelect';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  formProduto!: FormGroup;
  categoriaList: ICategoria[] = [];
  corList: ISelect[] = [];
  tamanhoList: ISelect[] = [];
  produtoList: IProduto[] = [];
  produtoid!: number;
  
  constructor(
    private breadcrumbSrv: BreadcrumbService,
    private formBuilder: FormBuilder,
    private produtoSrv: ProdutoService,
    private messageSrv: MessageService,
    private activeRoute: ActivatedRoute
  ) {
    this.breadcrumbSrv.setItems([
      { label: 'Produto', routerLink: ['produtos'] }
    ]);
    this.formProduto = this.formBuilder.group({
      produto: ['', Validators.required],
      categoria: ['', Validators.required],
      cor: ['', Validators.required],
      preco: ['', Validators.required],
      tamanho: ['',Validators.required],
      sexo: ['', Validators.required]
    });
    this.produtoid = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
    if(this.produtoid) {
      this.viewProduct()
    }
  }

  ngOnInit(): void {
    this.categoriaList = [
      { id: 1, descricao: 'Tipo1' },
      { id: 2, descricao: 'tIPO2' },
    ];
    this.corList = [
      { value: 'Azul' },
      { value: 'Amarelo' },
      { value: 'Verde' },
      { value: 'Vermelha' },
    ];
    this.tamanhoList = [
      { value: 'PP' },
      { value: 'P' },
      { value: 'M' },
      { value: 'G' },
      { value: 'GG' },
    ];
  }

  registerProduct() {
    const categoria: ICategoria = {
      id: this.formProduto.value.categoria
    }
    const data: IProduto = {
      id: this.produtoid,
      descricao: this.formProduto.value.produto,
      categoria: categoria,
      cor: this.formProduto.value.cor,
      preco: this.formProduto.value.preco,
      tamanho: this.formProduto.value.tamanho,
      sexo: this.formProduto.value.sexo
    }
    if(!this.produtoid) {
      if(!this.formProduto.valid) {
        this.messageSrv.add({ severity: 'error', detail: 'Preencha todos os campos!'})
      } else {
        this.produtoSrv.registerProduct(data).then(success => {
          this.messageSrv.add({ severity: 'success', detail: 'Produto salvo com sucesso!' })
        })
      }
    } else {
      this.produtoSrv.updateProduct(data).then(success => {
        this.messageSrv.add({ severity: 'success', detail: 'Produto atualizado com sucesso!' })
      })
    }
  }

  async viewProduct() {
   const data = await this.produtoSrv.viewProduct(this.produtoid);
   if(data) {
    this.formProduto.controls['produto'].setValue(data.descricao);
    this.formProduto.controls['categoria'].setValue(data.categoria.id);
    this.formProduto.controls['cor'].setValue(data.cor);
    this.formProduto.controls['preco'].setValue(data.preco);
    this.formProduto.controls['tamanho'].setValue(data.tamanho);
    this.formProduto.controls['sexo'].setValue(data.sexo);
   }
  }

  updateProduct() {

  }

}
