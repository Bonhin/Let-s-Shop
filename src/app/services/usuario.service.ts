import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario.module';


@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) { }

    registrar(userName: Usuario) { 
        return this.http.post(`http://localhost:4200/users/register`, userName);
    }

}