import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginForm } from '../interfaces/ILoginForm';
import { ILoginResponse } from '../interfaces/ILoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(body: ILoginForm) {
    return this.http.post<ILoginResponse>("https://localhost:7220/api/users/login", body)
  }
}
