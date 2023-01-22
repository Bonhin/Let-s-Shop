import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class LocalBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         
        let usuarios: any[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
        
        return of(null).pipe(mergeMap(() => {

            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                let usuarioFiltrado = usuarios.filter(usuario => {
                    return usuario.username === request.body.username && usuario.password === request.body.password;
                });

                if (usuarioFiltrado.length) {
                    let user = usuarioFiltrado[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } 
            }

            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                let novoUsuario = request.body;

                let usuarioDuplicado = usuarios.filter(usuario => { return usuario.username === novoUsuario.username; }).length;
                if (usuarioDuplicado) {
                    return throwError(()=>{});
                }

                novoUsuario.id = usuarios.length + 1;
                usuarios.push(novoUsuario);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));

                return of(new HttpResponse({ status: 200 }));
            }

           return next.handle(request);
            
        }))

        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

