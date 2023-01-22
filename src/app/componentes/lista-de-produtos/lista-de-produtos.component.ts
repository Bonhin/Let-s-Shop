import { debounceTime } from 'rxjs';


import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from '../../services/api.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-lista-de-produtos',
  templateUrl: './lista-de-produtos.component.html',
  styleUrls: ['./lista-de-produtos.component.css']
})
export class ListaDeProdutosComponent implements OnInit {

  public listaProdutos: any;

  constructor(private api: ApiServiceService, private carrinhoService: CarrinhoService) {}

  buscarCampo: any = [];
  produtoEncontrado :string = "";
  public filtroCategoria: any;


  ngOnInit(): void {
    this.api.pegarProdutos().subscribe(resultado => {
      this.listaProdutos = resultado;
      this.filtroCategoria = resultado;    

      this.listaProdutos.forEach((produto: any) => {
        if(produto.category ===  "women's clothing" || produto.category ===  "men's clothing"){
          produto.category = "fashion"
        }
        Object.assign(produto, { quantity: 1, total: produto.price });
      });
    })

    this.api.produtoProcurado.asObservable().pipe((debounceTime(400))).subscribe(valor =>{
      this.produtoEncontrado = valor
    })

    this.carrinhoService.buscarProdutos();
    
    

  }

  adicionarAoCarrinho(produto: any) {
    this.carrinhoService.adicionarNoCarrinho(produto);
  }

  filtro(categoria:string){
    this.filtroCategoria = this.listaProdutos
    .filter((a:any)=>{
      if(a.category == categoria || categoria ==''){
        return a;
      }
    })
  }


}
