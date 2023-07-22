import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISelect } from '../interfaces/core/ISelect';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicRegisterService {

  constructor(
    private http: HttpClient
  ) { }

  async loadGeAllCategory() {
    return await this.http.get<ISelect[]>(`${environment.apiUrl}/categoria/getAllCategorias`).toPromise();
  }

  async saveCategory(categoria: ISelect) {
    return await this.http.post(`${environment.apiUrl}/categoria`, categoria).toPromise();
  }

  async loadGeAllTamanho() {
    return await this.http.get<ISelect[]>(`${environment.apiUrl}/tamanho/getAllTamanho`).toPromise();
  }

  async saveTamanho(categoria: ISelect) {
    return await this.http.post(`${environment.apiUrl}/tamanho`, categoria).toPromise();
  }

  async loadGeAllCor() {
    return await this.http.get<ISelect[]>(`${environment.apiUrl}/cor/getAllCor`).toPromise();
  }

  async saveCor(categoria: ISelect) {
    return await this.http.post(`${environment.apiUrl}/cor`, categoria).toPromise();
  }

}
