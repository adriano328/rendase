import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { BreadcrumbModule } from "primeng/breadcrumb";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {MegaMenuModule} from "primeng/megamenu";
import {MenuComponent} from "./menu/menu.component";
import {CoreModule} from "../core/core.module";



@NgModule({
  declarations: [
    MenuComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MegaMenuModule,
    CoreModule
  ],
  exports: [
    MenuComponent,
    BreadcrumbComponent
  ]
})
export class LayoutModule { }
