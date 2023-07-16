import { Component } from '@angular/core';
import { BreadcrumbService } from "./breadcrumb.service";
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  items: MenuItem[] = [];
  home: MenuItem;
  constructor(
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.itemsHandler.subscribe((items: MenuItem[]) => {
      this.items = items;
    });

    this.home = { icon: 'pi pi-home', routerLink: 'clients' };
  }

}
