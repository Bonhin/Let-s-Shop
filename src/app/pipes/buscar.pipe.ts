import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(valor: any[], filtro : string, propNome: string) : any[] {
    const resultado : any = [];
    if(!valor || filtro === "" || propNome === ""){
      return valor;
    }
    valor.filter((a:any)=>{
      if(a[propNome].trim().toLowerCase().includes(filtro.toLocaleLowerCase())){
        resultado.push(a);        
      }
    });
    return resultado;
     
  }
}
