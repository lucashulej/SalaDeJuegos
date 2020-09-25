import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Observable, Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { PrincipalComponent } from '../principal/principal.component';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  clave= '';
  mensajeError="";
  mostrarError:boolean = false;
  usuarios: Observable<any[]>;

  constructor(
    private router: Router,
    private authService : AuthService,
    private db : AngularFireDatabase
  ) {
    this.usuarios = db.list('usaurios').valueChanges(); 
  }

  ngOnInit() {}

  Entrar() {
    this.authService.signIn(this.email, this.clave).then((response: any) => {
      this.router.navigate(['/Principal']);
    },
    (error: any) => {
      this.mensajeError = error;
      this.mostrarError = true;
      setTimeout(() => this.esconderMensaje(), 2000);
    });
  }
  
  esconderMensaje() {
    this.mostrarError = false;
  }

  Cargar() {
    this.email = "admin@admin.com";
    this.clave = "123456";
  }
  
  Registrarse() {
    this.router.navigate(['/Registro']);
  }
}
