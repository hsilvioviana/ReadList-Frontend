import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUpdateUserForm } from '../interfaces/IUpdateUserForm';
import { IUpdateUserResponse } from '../interfaces/IUpdateUserResponse';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl

  updateUser(body: IUpdateUserForm) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.put<IUpdateUserResponse>(`${this.baseUrl}/users/update`, body, { headers })
  }
}
