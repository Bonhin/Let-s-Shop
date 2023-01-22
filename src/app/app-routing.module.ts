import { RouteGuard } from './defender/route.guard';
import { CheckoutComponent } from './componentes/checkout/checkout.component';

import { LoginComponent } from './componentes/login/login.component';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './componentes/header/header.component';
import { PageNotFoundComponent } from './paginas/page-not-found/page-not-found.component';
import { ListaDeProdutosComponent } from './componentes/lista-de-produtos/lista-de-produtos.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';


const routes: Routes = [
  {
    path: 'home',
    component: HeaderComponent,
    children: [
      {
        path: 'lista',
        component: ListaDeProdutosComponent
      },
      {
        path: 'carrinho',
        component: CarrinhoComponent,


      },
    ]
  },

  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate : [RouteGuard]
  },
  
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'registrar',
    component: RegistrarComponent
  },

  {
    path: '', redirectTo: '/home/lista', pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
