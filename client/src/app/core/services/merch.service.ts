import { IMerch } from './../models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchService {
  private readonly baseUrl = 'http://localhost:5000/merch';

  constructor(private http: HttpClient) { }

  createMerch(body: IMerch): Observable<IMerch> {
    return this.http.post<IMerch>(`${this.baseUrl}/create`, body);
  }

  getAllMerch(): Observable<IMerch[]> {
    return this.http.get<IMerch[]>(`${this.baseUrl}/all`);
  }

  getDetailsOfMerch(nameOfMerch: string): Observable<IMerch> {
    return this.http.get<IMerch>(`${this.baseUrl}/details/${nameOfMerch}`);
  }

  deleteMerch(nameOfMerch: string): Observable<object> {
    return this.http.delete(`${this.baseUrl}/delete/${nameOfMerch}`);
  }

  editMerch(nameOfMerch: string, body: IMerch): Observable<object> {
    return this.http.put<IMerch>(`${this.baseUrl}/edit/${nameOfMerch}`, body);
  }
}
