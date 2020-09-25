import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email = '';
  clave= '';
  claveRepetida= '';
  mensajeError="";
  mostrarError:boolean = false;
  usuarios: Observable<any[]>;
  lista: any[];
  
  constructor(private router : Router, private db : AngularFireDatabase, private authService : AuthService) {
    this.email = '';
    this.clave= '';
    this.claveRepetida= '';
    this.usuarios = db.list('usuarios').valueChanges(); 
    this.usuarios.subscribe(usuarios => this.lista = usuarios, error => console.log(error));
  }

  ngOnInit() {}


  Registrarse() {
    if(this.clave == this.claveRepetida) {
      if(this.existeUsuario()) {
        this.mostrarError = true;
        this.mensajeError = "ya existe ese usuario";
        setTimeout(() => this.esconderMensaje(), 2000);
      } else {
        this.authService.singUp(this.email, this.clave).then((response: any) => {
          this.authService.getUser().then((response:any) => {
            this.db.list('usuarios').set(response.uid,{email:this.email,password:this.clave,gano:0,perdio:0,id:response.uid});
            this.router.navigate(['/Login']);
          });
        },(error: any) => {
          this.mensajeError = error;
          this.mostrarError = true;
          setTimeout(() => this.esconderMensaje(), 2000);
        });
      }
    } else {
      this.mostrarError = true;
      this.mensajeError = "claves no coinciden"
      setTimeout(() => this.esconderMensaje(), 2000);
    }
  }

  existeUsuario() {
    let retorno = false;
    for (const usuario of this.lista) {
      if(usuario.email == this.email) {
        retorno = true;
        break;
      }
    }
    return retorno;
  }

  esconderMensaje() {
    this.mostrarError = false;
  }
}
