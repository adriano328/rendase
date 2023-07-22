import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';
import { ISelect } from 'src/app/shared/interfaces/core/ISelect';
import { BasicRegisterService } from 'src/app/shared/services/basic-register.service';

@Component({
  selector: 'app-register-basic',
  templateUrl: './register-basic.component.html',
  styleUrls: ['./register-basic.component.scss']
})
export class RegisterBasicComponent implements OnInit {

  cadastroBasicList: ISelect[] = [];
  tipoCadastro: ISelect[] = [];
  formSearch!: FormGroup;
  pesquisa!: ISelect;
  viewRegistre!: boolean;
  cadastroform!: FormGroup;
  descricao!: string;
  pesquisadialog!: ISelect;
  saveCategoria = false;
  savesCor = false;
  savesTamanho = false;
  formCadastroBasico!: FormGroup;

  constructor(
    private breadcrumbSrv: BreadcrumbService,
    private formBuilder: FormBuilder,
    private basicService: BasicRegisterService,
    private messageService: MessageService
  ) {
    this.breadcrumbSrv.setItems([
      { label: 'Cadastros Básicos', routerLink: ['produtos'] }
    ]);
    this.formCadastroBasico = this.formBuilder.group({
      tipo: [''],
      descricao: ['']
    })
  }

  ngOnInit(): void {
    this.tipoCadastro = [
      { descricao: 'Categoria' },
      { descricao: 'Cor' },
      { descricao: 'Tamanho' },
    ]
  }

  viewFilterRegister() {
    const fonte = this.pesquisa.descricao;
    switch (fonte) {
      case 'Categoria':
        this.loadGetAllCategory();
        break;
      case 'Cor':
        this.loadGetAllCor();
        break;
      case 'Tamanho':
        this.loadGetAllTamanho();
        break;
    }
  }

  async loadGetAllCategory() {
    const data = await this.basicService.loadGeAllCategory();
    if (data) {
      this.cadastroBasicList = data;
    }
  }

  async loadGetAllCor() {
    const data = await this.basicService.loadGeAllCor();
    if (data) {
      this.cadastroBasicList = data;
    }
  }

  async loadGetAllTamanho() {
    const data = await this.basicService.loadGeAllTamanho();
    if (data) {
      this.cadastroBasicList = data;
    }
  }

  openRegister() {
    this.viewRegistre = true;
  }

  selectRegister() {
    const fonte = this.formCadastroBasico.value.tipo.descricao;
    console.log(fonte);
    
    if (fonte == 'Categoria' ? this.saveCategoria = true : this.saveCategoria = false) { }
    if (fonte == 'Cor' ? this.savesCor = true : this.savesCor = false) { }
    if (fonte == 'Tamanho' ? this.savesTamanho = true : this.savesTamanho = false) { }
  }

  saveCategory() {
    const data: ISelect = {
      descricao: this.formCadastroBasico.value.descricao
    }
    this.basicService.saveCategory(data).then(success => {
      this.messageService.add({severity: 'success', detail: 'Categoria cadastrada com sucesso!'});
      setTimeout(() => {
        this.viewRegistre = false;
        this.formCadastroBasico.controls['tipo'].setValue('');
        this.formCadastroBasico.controls['descricao'].setValue('');
      }, 1500);
    });
  }

  saveCor() {
    const data: ISelect = {
      descricao: this.formCadastroBasico.value.descricao
    }
    this.basicService.saveCor(data).then(success => {
      this.messageService.add({severity: 'success', detail: 'Cor cadastrada com sucesso!'});
      setTimeout(() => {
        this.viewRegistre = false; 
        this.formCadastroBasico.controls['tipo'].setValue('');
        this.formCadastroBasico.controls['descricao'].setValue('');
     }, 1500);
    });
  }

  saveTamanho() {
    const data: ISelect = {
      descricao: this.formCadastroBasico.value.descricao
    }
    this.basicService.saveTamanho(data).then(success => {
      this.messageService.add({severity: 'success', detail: 'Tamanho cadastrado com sucesso!'});
      setTimeout(() => {
        this.viewRegistre = false; 
        this.formCadastroBasico.controls['tipo'].setValue('');
        this.formCadastroBasico.controls['descricao'].setValue('');
     }, 1500);
    });
  }
}
