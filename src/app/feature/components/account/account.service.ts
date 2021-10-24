import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserForRegistrationDto } from 'src/app/shared/models/user/userForRegistrationDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  urlAddress = environment.apiUrl;
  constructor(private _http: HttpClient) { }


  registerUser(user: UserForRegistrationDto){
    return this._http.post(this.urlAddress+"accounts/registration", user);
  }

}
