import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomers } from 'src/interfaces/customers';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private base_URL = environment.URI_API;
  
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomers[]> {
    return this.http.get<ICustomers[]>(`${this.base_URL}customers`);
  }

  getCustomerbyId(id: number): Observable<ICustomers> {
    return this.http.get<ICustomers>(`${this.base_URL}customers/${id}`);
  }

  createCustomer(customer: any): Observable<ICustomers> {
    return this.http.post<ICustomers>(`${this.base_URL}customers`, customer);
  }

  updateCustomer(id: number, customer: any): Observable<ICustomers> {
    return this.http.put<ICustomers>(`${this.base_URL}customers/${id}`, customer)
  }

  deleteCustomer(id: number): Observable<ICustomers> {
    return this.http.delete<ICustomers>(`${this.base_URL}customers/${id}`)
  }
}
