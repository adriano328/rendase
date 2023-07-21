import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Paginator } from 'primeng/paginator';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';
import { ICor } from 'src/app/shared/interfaces/ICor';
import { ICategoria } from 'src/app/shared/interfaces/core/ICategoria';
import { ISelect } from 'src/app/shared/interfaces/core/ISelect';

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

  constructor(
    private breadcrumbSrv: BreadcrumbService,
    private formBuilder: FormBuilder
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
      categoria: ['']
    })
  }
  ngOnInit(): void {
    this.categoriaList = [
      {id: 1, descricao: 'Tipo1'},
      {id: 2, descricao: 'tIPO2'},
    ];
    this.corList = [
      {value: 'Azul'},
      {value: 'Amarelo'},
      {value: 'Verde'},
      {value: 'Vermelho'},
    ];
    this.tamanhoList = [
      {value: 'PP'},
      {value: 'P'},
      {value: 'M'},
      {value: 'G'},
      {value: 'GG'},
    ]

  }

  clearImput() {

  }

  filterProdutos($event?: any) {

  }

  openDialog() {

  }

  confirm(clienteid: number) {
    // this.confirmationService.confirm({
    //   message: 'Tem certeza que deseja excluir essa localização?',
    //   acceptLabel: 'Sim',
    //   rejectLabel: 'Não',
    //   accept: () => {
    //     const result = this.clienteSrv.deleteClienteById(clienteid);
    //     this.messageSrv.add({ severity: 'success', detail: 'Cliente excluido com sucesso!' })
    //     setTimeout(() => {
    //       this.listarClientes();
    //     }, 1000);
    //   },
    // })
  }

  cadastroProduto() {

  }

}
