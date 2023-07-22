import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';
import { ICor } from 'src/app/shared/interfaces/ICor';
import { IProduto } from 'src/app/shared/interfaces/IProduto';
import { ICategoria } from 'src/app/shared/interfaces/core/ICategoria';
import { ISelect } from 'src/app/shared/interfaces/core/ISelect';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit{

  formSearchProduto!: FormGroup;
  @ViewChild('pp') paginator?: Paginator;
  totalElements = 0;
  paginationFirstValue = 0;
  viewProduto: boolean = false;
  cadastroProdutoForm!: FormGroup;
  categoriaList: ICategoria[] = [];
  corList: ISelect[] = [];
  tamanhoList: ISelect[] = [];
  produtoList: IProduto[] = [];
  constructor(
    private breadcrumbSrv: BreadcrumbService,
    private formBuilder: FormBuilder,
    private produtoSrv: ProdutoService,
    private confirmationService: ConfirmationService,
    private messageSrv: MessageService
  ) {
    this.breadcrumbSrv.setItems([
      { label: 'Produtos', routerLink: ['clients'] }
    ]);
    this.cadastroProdutoForm = this.formBuilder.group({
      produto: [''],
      categoria: [''],
      cor: [''],
      preco: [''],
      tamanho: [''],
      sexo: ['']
    });
    this.formSearchProduto = this.formBuilder.group({
      descricao: [''],
      categoria: [''],
      cor: [''],
      tamanho: [''],
      sexo: ['']
    })
  }
  ngOnInit(): void {
    this.getAllProduct();
    this.categoriaList = [
      {id: 1, descricao: 'Tipo1'},
      {id: 2, descricao: 'tIPO2'},
    ];
    this.corList = [
      {value: 'Azul'},
      {value: 'Amarelo'},
      {value: 'Verde'},
      {value: 'Vermelha'},
    ];
    this.tamanhoList = [
      {value: 'PP'},
      {value: 'P'},
      {value: 'M'},
      {value: 'G'},
      {value: 'GG'},
    ];
  }

  async getAllProduct() {
    const data = await this.produtoSrv.getAllProductsWithFilter('','','','','',0,5);
    if(data) {
      this.produtoList = data?.content;
      this.totalElements = data.totalElements;    
    }
  }

 async getAllProductWithFilter($event?: any) {
    console.log(this.formSearchProduto.value.descricao, this.formSearchProduto.value.categoria,
      this.formSearchProduto.value.cor, this.formSearchProduto.value.tamanho, this.formSearchProduto.value.sexo);
    let result = null;
    if (!$event) {
      result = await this.produtoSrv.getAllProductsWithFilter(this.formSearchProduto.value.descricao, this.formSearchProduto.value.categoria,
         this.formSearchProduto.value.cor, this.formSearchProduto.value.tamanho, this.formSearchProduto.value.sexo, 0, 5);
    } else {
      result = await this.produtoSrv.getAllProductsWithFilter(this.formSearchProduto.value.descricao, this.formSearchProduto.value.categoria,
        this.formSearchProduto.value.cor, this.formSearchProduto.value.tamanho, this.formSearchProduto.value.sexo, $event.page, $event.rows);
    }
    if (result) {
      this.produtoList = result.content;
      this.totalElements = result.totalElements;
    }
  }

  clearImput() {
    this.formSearchProduto.controls['descricao'].setValue(''),
    this.formSearchProduto.controls['categoria'].setValue(''),
    this.formSearchProduto.controls['cor'].setValue(''),
    this.formSearchProduto.controls['tamanho'].setValue(''),
    this.formSearchProduto.controls['sexo'].setValue(''),
    this.getAllProduct();
  }

  confirm(produto: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esse produto?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        const result = this.produtoSrv.deleteProduct(produto);
        this.messageSrv.add({ severity: 'success', detail: 'Produto excluido com sucesso!' })
        setTimeout(() => {
          this.getAllProduct();
        }, 1000);
      },
    })
  }

  cadastroProduto() {

  }

}
