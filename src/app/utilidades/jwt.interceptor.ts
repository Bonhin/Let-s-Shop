import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual') || "[]");
        if (usuarioAtual && usuarioAtual.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuarioAtual.token}`
                }
            });
        }
        return next.handle(request);
    }
}