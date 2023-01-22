
import { Component, OnInit } from '@angular/core';

import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public produtos: any = []
  public precoTotal: number = 0;
  public produtosAdicionados: any = []
  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit() {

      this.carrinhoService.buscarProdutos().subscribe(resultado => {
        this.produtos = resultado;
        this.precoTotal = this.carrinhoService.precoTotal();
      })
  }

  removerItem(produto: any) {
    this.carrinhoService.removerDoCarrinho(produto)
  }

  limparCarrinho() {
    this.carrinhoService.limparCarrinho();
  }

  checkout() {
    this.carrinhoService.limparCarrinho();
  }

}
