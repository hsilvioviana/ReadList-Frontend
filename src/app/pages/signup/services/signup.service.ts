import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISignupForm } from '../interfaces/ISignupForm';
import { ISignupResponse } from '../interfaces/ISignupResponse';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl

  signup(body: ISignupForm) {
    return this.http.post<ISignupResponse>(`${this.baseUrl}/users/signup`, body)
  }
}
