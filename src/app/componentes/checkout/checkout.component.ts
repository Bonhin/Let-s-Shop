import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

constructor(private authenticationService: AuthService){}

  onSubmit(){
    console.log("Muito obrigado pelas aulas Ricardo!")
    this.authenticationService.logout();
  }
}
