import { AuthService } from './../../services/auth.service';
import { debounceTime } from 'rxjs';


import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from '../../services/api.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private carrinhoService: CarrinhoService, private api: ApiServiceService, private loginStatus: AuthService ){}

  public totalDeItensNoCarrinho : number = 0;

  public produtoProcurado : string = "";

  public loginCheck:any
  public logoutCheck:any
 

  ngOnInit(){
    this.carrinhoService.buscarProdutos().subscribe(resultado => {
      this.totalDeItensNoCarrinho = resultado.length;
      this.loginCheck = this.loginStatus.loginStatus;
      this.logoutCheck = this.loginStatus.logoutStatus;
    });     
  } 

  procurarProduto(event:any){
    this.produtoProcurado = (event.target as HTMLInputElement).value;
    this.api.produtoProcurado.next(this.produtoProcurado);
  }

  logout(){
    this.loginStatus.logout();
  }
}
