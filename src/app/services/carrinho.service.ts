import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor() { }

  public itensCarrinho: any = [];
  public listaProdutos = new BehaviorSubject<any>([])


  buscarProdutos() {
    return this.listaProdutos.asObservable();
  }


  adicionarNoCarrinho(produtos: any) {
    this.itensCarrinho.push(produtos);
    this.listaProdutos.next(this.itensCarrinho);
    this.precoTotal();   
  }

  precoTotal():number {
    let total = 0;
    this.itensCarrinho.map((preco: any) => {
      total += preco.total;
    })
    return total;
  }

  removerDoCarrinho(produto:any){
    this.itensCarrinho.map((item:any, index:any)=> {
      if(produto.id === item.id){
        this.itensCarrinho.splice(index,1);
      }
    })
    this.listaProdutos.next(this.itensCarrinho)    
  }

  limparCarrinho(){
    this.itensCarrinho = [];
    this.listaProdutos.next(this.itensCarrinho);
  }
}
