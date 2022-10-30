import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginForm } from '../interfaces/ILoginForm';
import { ILoginResponse } from '../interfaces/ILoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl

  login(body: ILoginForm) {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/users/login`, body)
  }
}
