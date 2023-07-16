import { Injectable } from '@angular/core';
import {StorageKeys} from "../constants/storage-key";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isLogged() {
    return true;
    return localStorage.getItem(StorageKeys.ACCESS_TOKEN) === 'MOCK-JWT-TOKEN';
  }

  signIn() {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, 'MOCK-JWT-TOKEN');
    location.reload();
  }

  signOut() {
    this.clearTokens();
    location.reload();
  }

  clearTokens() {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
  }

}
