import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  usuarios: Observable<any[]>;
  listaUsuarios: any[];
  juegos: Observable<any[]>;

  constructor(private authService : AuthService,private db : AngularFireDatabase) { 
    this.usuarios = this.db.list('usuarios').valueChanges(); 
    this.usuarios.subscribe(usuarios => this.listaUsuarios = usuarios, error => console.log(error));
    this.juegos = this.db.list('juegos').valueChanges(); 
  }

  gano(juego) {
    console.log("gano de resultado service");
    let keyJuego;
    let puntaje;
    this.authService.getUser().then((response:any) => {
      console.log(response.uid);
      for (const usuario of this.listaUsuarios) {
        if(usuario.id == response.uid) {
          keyJuego=usuario.id+juego;
          puntaje = usuario.gano +1 ;
          this.db.list('usuarios').set(usuario.id,{email:usuario.email,password:usuario.password,gano:puntaje,perdio:usuario.perdio,id:usuario.id});
          this.db.list('juegos').set(keyJuego,{email:usuario.email,juego:juego,gano:puntaje,perdio:usuario.perdio,id:keyJuego});
          break;
        }
      }
    });
  }

  perdio(juego) {
    console.log("perdio de resultado service");
    let keyJuego;
    let puntaje;
    this.authService.getUser().then((response:any) => {
      console.log(response.uid);
      for (const usuario of this.listaUsuarios) {
        if(usuario.id == response.uid) {
          keyJuego=usuario.id+juego;
          puntaje = usuario.perdio + 1;
          this.db.list('usuarios').set(usuario.id,{email:usuario.email,password:usuario.password,gano:usuario.gano,perdio:puntaje,id:usuario.id});
          this.db.list('juegos').set(keyJuego,{email:usuario.email,juego:juego,gano:usuario.gano,perdio:puntaje,id:keyJuego});
          break;
        }
      }
    });
  }
}
