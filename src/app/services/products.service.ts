import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endpoint: string;
  private api: string;

  constructor(private http: HttpClient) { 
    this.endpoint = environment.endpoint;
    this.api = 'api/productos/'
  }

  getListProducts(): Observable<Products[]> {
   return this.http.get<Products[]>(`${this.endpoint}${this.api}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}${this.api}${id}`)
  }

  saveProduct(product: Products): Observable<void> {
    return this.http.post<void>(`${this.endpoint}${this.api}`,product)
  }

  getProduct(id: number): Observable<Products> {
    return this.http.get<Products>(`${this.endpoint}${this.api}${id}`)
  }

  updateProduct(id: number, product: Products): Observable<void> {
    return this.http.put<void>(`${this.endpoint}${this.api}${id}`, product);
  }
}