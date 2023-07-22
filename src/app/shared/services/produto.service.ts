import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPage } from '../interfaces/core/IPage';
import { IProduto } from '../interfaces/IProduto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  async getAllProductsWithFilter(descricao?: string, categoria?: string, cor?: string, tamanho?: string, sexo?: string, page?: number, size?: number) {
    return this.http.get<IPage<IProduto>>(`${environment.apiUrl}/produto/getAllProdutoWithFilter`, {
      params: new HttpParams()
        .set('descricao', descricao!)
        .set('categoria', categoria!)
        .set('cor', cor!)
        .set('tamanho', tamanho!)
        .set('sexo', sexo!)
        .set('page', page!)
        .set('size', size!)
    }).toPromise();
  }

  registerProduct(produto: IProduto) {
    return this.http.post(`${environment.apiUrl}/produto`, produto).toPromise();
  }

  async viewProduct(productid: number) {
    const result = await this.http.get<IProduto>(`${environment.apiUrl}/produto/${productid}`).toPromise();
    return result;
  }

  updateProduct(produto: IProduto) {
    const result = this.http.put<IProduto>(`${environment.apiUrl}/produto`, produto).toPromise();
    return result;
  }

  deleteProduct(productid: number) {
    const result = this.http.delete<IProduto>(`${environment.apiUrl}/produto/${productid}`).toPromise();
    return result;
  }
}
