import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';
import { ICidade, ICliente, IEndereco } from 'src/app/shared/interfaces/core/ICliente';
import { CleinteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss'],
  providers: [MessageService]
})
export class ViewLocationComponent implements OnInit{

  numberList: any[] = [];
  registreList: any[] = [];
  clienteid!: number;
  clienteSave: ICliente = {} as ICliente;
  clienteForm!: FormGroup;
  cidade!: ICidade[];
  nomeCliente!: string;
  constructor(
    private breadcrumbSrv: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private activeRoute: ActivatedRoute,
    private clienteSrv: CleinteService,
    private formBuilder: FormBuilder,
    private messageSrv: MessageService,
    private router: Router
  ) {
    this.clienteid = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
    if(this.clienteid) {
      this.loadClienteById()
    };
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      contato: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cidade = [
      { id: 1, nome: 'Cuiabá - MT' },
      { id: 2, nome: 'Várzea Grande - MT' }
    ];
  }

  async loadClienteById() {
    const result = await this.clienteSrv.getClienteById(this.clienteid);
    if(result) {
      this.clienteSave = result;
      this.nomeCliente = this.clienteSave.nome;
      this.clienteForm.controls['nome'].setValue(this.clienteSave.nome);
      this.clienteForm.controls['cpf'].setValue(this.clienteSave.cpf);
      this.clienteForm.controls['logradouro'].setValue(this.clienteSave.endereco.rua);
      this.clienteForm.controls['numero'].setValue(this.clienteSave.endereco.numero);
      this.clienteForm.controls['bairro'].setValue(this.clienteSave.endereco.bairro);
      this.clienteForm.controls['cidade'].setValue(this.clienteSave.endereco.cidade?.id);
      this.clienteForm.controls['contato'].setValue(this.clienteSave.contato);
      this.breadcrumbSrv.setItems([
        { label: `Cadastro Cliente: ${this.nomeCliente}`}
      ]);
    }
  }

  updateCliente() {    
    const cidade: ICidade = {
      id: this.clienteForm.value.cidade
    }     
    const endereco: IEndereco = {
      rua: this.clienteForm.value.logradouro,
      numero: this.clienteForm.value.numero,
      bairro: this.clienteForm.value.bairro,
      cidade: cidade,
    }
    const cliente: ICliente = {
      id: this.clienteid,
      nome: this.clienteForm.value.nome,
      cpf: this.clienteForm.value.cpf,
      endereco: endereco,
      contato: this.clienteForm.value.contato,
    }
    if (this.clienteForm.invalid) {
      this.messageSrv.add({ severity: 'error', detail: 'Preencha os campos obrigatórios!' })
    } else {
      this.clienteSrv.updateCliente(cliente).then(success => {
        this.messageSrv.add({ severity: 'success', detail: 'Cliente atualizado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['pages/clients']);
        }, 2000);
      });
    }
  }
}
