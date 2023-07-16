import { Component, OnInit, ViewChild } from "@angular/core";
import { BreadcrumbService } from "../../../layout/breadcrumb/breadcrumb.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CleinteService } from "src/app/shared/services/cliente.service";
import { ICidade, ICliente, IEndereco } from "src/app/shared/interfaces/core/ICliente";
import { HttpHandler } from "@angular/common/http";
import { Paginator } from "primeng/paginator";

@Component({
  selector: "app-clients",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.scss"],
  providers: [ConfirmationService, MessageService]
})

export class ClientesComponent implements OnInit {

  @ViewChild('pp') paginator?: Paginator;
  totalElements = 0;
  paginationFirstValue = 0;
  viewCliente!: boolean;
  clienteList: ICliente[] = [];
  searchform!: FormGroup;
  cadastroform!: FormGroup;
  cidade!: ICidade[];
  constructor(
    private breadcrumbSrv: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private clienteSrv: CleinteService,
    private messageSrv: MessageService
  ) {
    this.breadcrumbSrv.setItems([
      { label: 'Clientes', routerLink: ['clients'] }
    ]);
    this.cadastroform = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      contato: ['', Validators.required],
    });
    this.searchform = this.formBuilder.group({
      nome: ['']
    })
  }

  ngOnInit(): void {
    this.cidade = [
      { id: 1, nome: 'Cuiabá - MT' },
      { id: 2, nome: 'Várzea Grande - MT' }
    ];
    this.listarClientes();
  }

  cadastroCliente() {
    const cidade: ICidade = {
      id: this.cadastroform.value.cidade.id,
      nome: this.cadastroform.value.cidade.nome,
    }
    const endereco: IEndereco = {
      rua: this.cadastroform.value.logradouro,
      numero: this.cadastroform.value.numero,
      bairro: this.cadastroform.value.bairro,
      cidade: cidade,
    }
    const cliente: ICliente = {
      nome: this.cadastroform.value.nome,
      cpf: this.cadastroform.value.cpf,
      endereco: endereco,
      contato: this.cadastroform.value.contato,
    }
    if (this.cadastroform.invalid) {
      this.messageSrv.add({ severity: 'error', detail: 'Preencha os campos obrigatórios!' })
    } else {
      this.clienteSrv.cadastroCliente(cliente).then(success => {
        this.messageSrv.add({ severity: 'success', detail: 'Cliente cadastrado com sucesso!' });
        setTimeout(() => {
          this.viewCliente = false;
          this.clearImput();
        }, 2000);
      });
    }
  }

  async listarClientes() {
    const result = await this.clienteSrv.listarClientes('', 0, 5);
    if (result) {
      this.clienteList = result?.content;
      this.totalElements = result.totalElements;
    }
  }

  async filterClientes($event?: any) {
    let result = null;
    if (!$event) {
      result = await this.clienteSrv.listarClientes(this.searchform.value.nome, 0, 5);
    } else {
      result = await this.clienteSrv.listarClientes(this.searchform.value.nome, $event.page, $event.rows);
    }
    if (result) {
      this.clienteList = result.content;
      this.totalElements = result.totalElements;
    }
  }

  clearImput() {
    this.searchform.controls['nome'].setValue('');
    this.listarClientes();
  }

  openLocation() {
    this.viewCliente = true;
    this.cadastroform.controls['estado'].setValue('Mato Grosso - MT');
  }

  confirm(clienteid: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir essa localização?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        const result = this.clienteSrv.deleteClienteById(clienteid);
        this.messageSrv.add({ severity: 'success', detail: 'Cliente excluido com sucesso!' })
        setTimeout(() => {
          this.listarClientes();
        }, 1000);
      },
    })
  }
}
