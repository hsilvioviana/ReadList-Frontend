import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignupForm } from '../interfaces/ISignupForm';
import { ISignupResponse } from '../interfaces/ISignupResponse';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(body: ISignupForm) {
    return this.http.post<ISignupResponse>("https://localhost:7220/api/users/signup", body)
  }
}
