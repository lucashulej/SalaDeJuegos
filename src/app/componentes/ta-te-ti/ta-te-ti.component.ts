import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styleUrls: ['./ta-te-ti.component.css']
})
export class TaTeTiComponent implements OnInit {

  comenzar:boolean = false;
  cuadrados = [];
  mensaje:string;
  mostrarMensaje:boolean = false;

  constructor() {
    this.cuadrados = new Array(9);
  }

  comenzarJuego() {
    this.comenzar = true;
  }

  jugar(casillero:number) {
    this.cuadrados[casillero] = "x";
    if(this.verificarGanador("x")) { 
      this.mostrarResultado("gano!");
    } else { 
      if(this.verificarEmpate()) {
        this.mostrarResultado("empate");
      } else {
        this.jugarCpu();
        if(this.verificarGanador("o")) {
          this.mostrarResultado("perdio");
        } else {
          if(this.verificarEmpate()) {
            this.mostrarResultado("empate");
          }
        }
      }
    }
  }

  jugarCpu() {
    let casillaHabilitada = false;
    let casilla;
    do {
      casilla = Math.floor(Math.random() * (9 - 0)) + 0;
      if(this.cuadrados[casilla] == null) {
        casillaHabilitada = true;
      }
    } while(!casillaHabilitada);
    this.cuadrados[casilla] = "o";
  }

  verificarGanador(jugador:string) {
    //FILAS
    if(this.cuadrados[0] == jugador && this.cuadrados[1] == jugador && this.cuadrados[2] == jugador) {
      return true;
    }
    if(this.cuadrados[3] == jugador && this.cuadrados[4] == jugador && this.cuadrados[5] == jugador) {
      return true;
    }
    if(this.cuadrados[6] == jugador && this.cuadrados[7] == jugador && this.cuadrados[8] == jugador) {
      return true;
    }
    //COLUMNAS
    if(this.cuadrados[0] == jugador && this.cuadrados[3] == jugador && this.cuadrados[6] == jugador) {
      return true;
    }
    if(this.cuadrados[1] == jugador && this.cuadrados[4] == jugador && this.cuadrados[7] == jugador) {
      return true;
    }
    if(this.cuadrados[2] == jugador && this.cuadrados[5] == jugador && this.cuadrados[8] == jugador) {
      return true;
    }
    //DIAGONALES
    if(this.cuadrados[0] == jugador && this.cuadrados[4] == jugador && this.cuadrados[8] == jugador) {
      return true;
    }
    if(this.cuadrados[2] == jugador && this.cuadrados[4] == jugador && this.cuadrados[6] == jugador) {
      return true;
    }
    return false;
  }

  verificarEmpate() {
    let contador = 0;
    this.cuadrados.forEach(casillero => {
      if(casillero != null) contador++;
    });
    if(contador == 9) {
      return true;
    } else {
      return false;
    }
  }

  mostrarResultado(mensaje:string) {
    this.mensaje = mensaje;
    this.mostrarMensaje = true;
    setTimeout(() => this.reiniciar(), 4000);
  }

  
  reiniciar() {
    this.mostrarMensaje = false;
    this.cuadrados = new Array(9);
    this.comenzar = false;
  }

  ngOnInit() {}
}
