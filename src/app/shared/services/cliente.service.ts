import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../interfaces/core/ICliente';
import { environment } from 'src/environments/environment';
import { IPagination } from '../interfaces/core/IPagination';
import { IPage } from '../interfaces/core/IPage';

@Injectable({
  providedIn: 'root'
})
export class CleinteService {

  constructor(
    private http: HttpClient
  ) { }

  cadastroCliente(cliente: ICliente) {
    const result =  this.http.post(`${environment.apiUrl}/cliente`, cliente).toPromise();
    return result;
  }

  updateCliente(cliente: ICliente) {
    const result =  this.http.patch(`${environment.apiUrl}/cliente`, cliente).toPromise();
    return result;
  }

  async listarClientes(nome?: string, page?: number, size?: number) {
    const result = await this.http.get<IPage<ICliente>>(`${environment.apiUrl}/cliente/getAllWithName`, {
      params: new HttpParams()
      .set('nome', nome!)
      .set('page', page!)
      .set('size', size!)
    }).toPromise();
    return result;
  }

  async getClienteById(clienteid: number) {
    const result = await this.http.get<ICliente>(`${environment.apiUrl}/cliente/${clienteid}`).toPromise();
    return result;
  }

  async deleteClienteById(clienteid: number) {
    const result = await this.http.delete<ICliente>(`${environment.apiUrl}/cliente/${clienteid}`).toPromise();
    return result;
  }

}
