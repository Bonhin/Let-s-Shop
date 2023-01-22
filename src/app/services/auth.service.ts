import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  public loginStatus = true;
  public logoutStatus = false;

  login(username: string, password: string) {
   
    return this.http.post<any>(`http://localhost:4200/users/authenticate`, { username: username, password: password })
        .pipe(map(usuario => {                
            if (usuario && usuario.token) {
                localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
                this.loginStatus = false;
                this.logoutStatus = true;
            }
            return usuario;
        }));
}

logout() {
    localStorage.removeItem('usuarioAtual');
    this.loginStatus=true;
    this.logoutStatus=false;
}
  
}
