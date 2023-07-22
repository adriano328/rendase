import { Component, Input } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() hideSidenav = false;
  items: MenuItem[] | undefined;

  constructor() {
    this.items = [
      {
        label: 'Clientes',
        icon: 'pi pi-user',
        routerLink: 'clients'
      },
      {
        label: 'Produtos',
        icon: 'fa fa-box',
        items: [
          {
            label: 'Produtos',
            icon: 'fa fa-box',
            routerLink: 'produtos'
          },
          {
            label: 'Cadastro de Produtos',
            icon: 'fa fa-box',
            routerLink: 'produtos/produto'
          },
        ]
      },
      {
        label: 'Cadastros Básicos',
        icon: 'pi pi-microsoft',
        routerLink: 'register-basic'
      },
      {
        separator: true
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-power-off',
        routerLink: '/auth'
      }
    ];
  }
}
