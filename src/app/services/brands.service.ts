import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brands } from '../interfaces/brands.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private endpoint: string;
  private api: string;
  constructor(private http: HttpClient) { 
    this.endpoint = environment.endpoint;
    this.api = 'api/marcas/';
  }

  getBrands(): Observable<Brands[]> {
    return this.http.get<Brands[]>(`${this.endpoint}${this.api}`);
  }

  deleteBrand(id: number): Observable<void>{
    return this.http.delete<void>(`${this.endpoint}${this.api}${id}`);
  }

  saveBrand(brand: Brands): Observable<Brands> {
    return this.http.post<Brands>(`${this.endpoint}${this.api}`, brand);
  }

  getBrand(id: number): Observable<Brands>{
    return this.http.get<Brands>(`${this.endpoint}${this.api}${id}`);
  }

  updateBrand(id: number, brand: Brands): Observable<void> {
    return this.http.put<void>(`${this.endpoint}${this.api}${id}`, brand);
  }
}
