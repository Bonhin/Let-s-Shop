
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './componentes/header/header.component';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { PageNotFoundComponent } from './paginas/page-not-found/page-not-found.component';
import { ListaDeProdutosComponent } from './componentes/lista-de-produtos/lista-de-produtos.component';
import { LoginComponent } from './componentes/login/login.component';


import { BuscarPipe } from './pipes/buscar.pipe';
import { UsuarioService } from './services/usuario.service';
import { AuthService } from './services/auth.service';
import { MensagemService } from './services/mensagem.service';

import { RouteGuard } from './defender/route.guard';

import { JwtInterceptor } from './utilidades/jwt.interceptor';
import { LocalBackendInterceptor } from './utilidades/local-backend';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { CheckoutComponent } from './componentes/checkout/checkout.component';
import { MensagemComponent } from './mensagem/mensagem.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarrinhoComponent,
    PageNotFoundComponent,
    ListaDeProdutosComponent,
    LoginComponent,
    BuscarPipe,
    RegistrarComponent,
    CheckoutComponent,
    MensagemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,    
    FormsModule
  ],
  providers: [
    RouteGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LocalBackendInterceptor, multi: true },
    MensagemService,
    AuthService,
    UsuarioService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
