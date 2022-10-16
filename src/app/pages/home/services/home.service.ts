import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBookCreate } from '../interfaces/IBookCreate';
import { IBookDividedByYear } from '../interfaces/IBookDividedByYear';
import { IBookEdit } from '../interfaces/IBookEdit';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl

  getBooksDividedByYear() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.get<IBookDividedByYear[]>(`${this.baseUrl}/books/search`, { headers })
  }

  createBook(payload: IBookCreate) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.post(`${this.baseUrl}/books/create`, payload, { headers })
  }

  editBook(payload: IBookEdit) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.put(`${this.baseUrl}/books/update/${payload.id}`, payload, { headers })
  }

  deleteBook(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.delete(`${this.baseUrl}/books/delete/${id}`, { headers })
  }
}
