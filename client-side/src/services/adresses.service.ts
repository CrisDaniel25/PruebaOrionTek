import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdresses } from 'src/interfaces/adresses';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdressesService {

  private base_URL = environment.URI_API; 

  constructor(private http: HttpClient) { }

  getAdresses(): Observable<IAdresses[]> {
    return this.http.get<IAdresses[]>(`${this.base_URL}addresses`);
  }

  getAdressbyId(id: number): Observable<IAdresses> {
    return this.http.get<IAdresses>(`${this.base_URL}addresses/${id}`)
  }

  createAdress(adress: any): Observable<IAdresses> {
    return this.http.post<IAdresses>(`${this.base_URL}addresses`, adress);
  }

  updateAdress(id: number, adress: any): Observable<IAdresses> {
    return this.http.put<IAdresses>(`${this.base_URL}addresses/${id}`, adress);
  }

  deleteAdress(id: number): Observable<IAdresses> {
    return this.http.delete<IAdresses>(`${this.base_URL}addresses/${id}`);
  }
}
