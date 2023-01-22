import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MensagemService {
    private subject = new Subject<any>();
    private aposNavegacao = false;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.aposNavegacao) {
                    this.aposNavegacao = false;
                } else {
                   this.subject.next('');
                }
            }
        });
    }

    sucesso(mensagem: string, aposNavegacao = false) {
        this.aposNavegacao = aposNavegacao;
        this.subject.next({ type: 'success', text: mensagem });
    }

    erro(mensagem: string, aposNavegacao = false) {
        this.aposNavegacao = aposNavegacao;
        this.subject.next({ type: 'error', text: mensagem});
    }

    pegarMenssagem(): Observable<any> {
        return this.subject.asObservable();
    }
}