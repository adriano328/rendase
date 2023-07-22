import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterBasicComponent } from './register-basic/register-basic.component';

const routes: Routes = [
  {
    path: '', component: RegisterBasicComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterBasicRoutingModule { }
