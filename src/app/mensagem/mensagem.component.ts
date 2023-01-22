import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { MensagemService } from '../services/mensagem.service';


@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;
  mensagem: any;

  constructor(private alertService: MensagemService) { }

  ngOnInit() {
      this.subscription = this.alertService.pegarMenssagem().subscribe(mensagem => { 
          this.mensagem = mensagem; 
      });
  }

  ngOnDestroy() {
      this.subscription?.unsubscribe();
  }

}