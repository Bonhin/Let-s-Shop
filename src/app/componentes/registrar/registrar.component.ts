
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { MensagemService } from '../../services/mensagem.service';
import { UsuarioService } from './../../services/usuario.service';


@Component({
    templateUrl: 'registrar.component.html',
    styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
    registerForm!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UsuarioService,
        private alertService: MensagemService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this!.registerForm!.controls; }

    onSubmit() {
      console.log("testando onsubmit registrar");
      
        this.submitted = true;

        if (this.registerForm?.invalid) {
            return;
        }

        this.loading = true;
        this.userService.registrar(this.registerForm?.value)
            .pipe(first())
            .subscribe({
                next:(v) => {
                    this.alertService.sucesso('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error: (e)=> {
                    console.log(e)
                    this.alertService.erro("Username is already taken");
                    this.loading = false;
                }});
    }
}