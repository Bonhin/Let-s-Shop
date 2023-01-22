
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  public produtoProcurado = new BehaviorSubject<string>("");
  public filtroProduto :string =''

  pegarProdutos(){
      return this.http.get<any>("https://fakestoreapi.com/products")
      .pipe(map((resultado:any)=>{
        return resultado;
      }))
  }


}
