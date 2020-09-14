import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  @Output() enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  tiempo: number;
  repetidor:any;
  comenzar:boolean = false;
  numeroA:number;
  numeroB:number;
  operador:any;
  resultado:number;
  mensaje:string;
  mostrarMensaje:boolean = false;
  private subscription: Subscription;

  constructor() {
    this.tiempo=10; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");  
  }
  
  comenzarJuego() {
    this.comenzar=true;
    this.generarOperacion();
    this.repetidor = setInterval(()=>{   
      this.tiempo--;
      if(this.tiempo == 0) {
        this.jugadorPerdio();
      }
    }, 1000);  
  }

  generarOperacion() {
    this.numeroA = Math.floor(Math.random() * (10 - 1)) + 1;
    this.numeroB = Math.floor(Math.random() * (10 - 1)) + 1;
    this.operador = Math.floor(Math.random() * (4 - 1)) + 1;
    switch(this.operador) {
      case 1:
        this.operador = "+";
        this.resultado = this.numeroA + this.numeroB;
        break;
      case 2:
        this.operador = "-";
        this.resultado = this.numeroA - this.numeroB;
        break;
      case 3:
        this.operador = "*";
        this.resultado = this.numeroA * this.numeroB;
        break;
      case 4:
        this.operador = "/";
        this.resultado = this.numeroA / this.numeroB;
        break;
    }
    console.log(`Resultado de la operacion = ${this.resultado}`);
  }

  verificar() {
    if(this.nuevoJuego.numeroIngresado == this.resultado) {
      this.jugadorGano();
    } else {
      this.jugadorPerdio();
    }
  }  

  jugadorGano() {
    this.comenzar = false;
    this.mensaje = "gano!";
    this.mostrarMensaje = true;
    this.reiniciarContador();
    setTimeout(() => this.ocultarMensaje(), 4000);
  }

  jugadorPerdio() {
    this.comenzar = false;
    this.mensaje = "perdio";
    this.mostrarMensaje = true;
    this.reiniciarContador();
    setTimeout(() => this.ocultarMensaje(), 4000);
  }

  ocultarMensaje() {
    this.mostrarMensaje = false;
  }

  reiniciarContador() {
    this.nuevoJuego.numeroIngresado = "";
    this.tiempo = 10;
    clearInterval(this.repetidor);
  }

  ngOnInit() {}
}
