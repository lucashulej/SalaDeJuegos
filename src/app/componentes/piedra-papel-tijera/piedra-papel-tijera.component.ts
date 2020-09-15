import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  comenzar:boolean = false;
  jugadaActiva:boolean = false;
  mensaje:string;
  mostrarMensaje:boolean = false;
  jugadaElegida:string;
  jugadaCpu:string;
  piedra: boolean = false;
  papel: boolean = false;
  tijera: boolean = false;

  constructor() { }

  comenzarJuego() {
    this.comenzar = true;
  }

  jugar(jugada:string) {
    this.jugadaActiva = true;
    this.jugadaElegida = jugada;
    this.jugarCpu();
  }

  jugarCpu() {
    switch(Math.floor(Math.random() * 3 + 1)) {
      case 1:
        this.jugadaCpu = "piedra";
        break;
      case 2:
        this.jugadaCpu = "papel";
        break;
      case 3:
        this.jugadaCpu = "tijera";
        break;
    }
    this.verificarGanador();
  }

  verificarGanador() {
    if(this.jugadaElegida == this.jugadaCpu) {
      this.jugarCpu();
    } else {
      if(this.jugadaElegida == "piedra") {
        if(this.jugadaCpu == "papel") {
          this.jugadorPerdio();
        } else { 
          this.jugadorGano();
        }
      } else if (this.jugadaElegida == "papel") {
        if(this.jugadaCpu == "tijera") {
          this.jugadorPerdio();
        } else { 
          this.jugadorGano();
        }
      } else {
        if(this.jugadaCpu == "piedra") {
          this.jugadorPerdio();
        } else { 
          this.jugadorGano();
        }
      }
    }
  }

  jugadorGano() {
    this.mostrarMensaje = true;
    this.mensaje = "gano!";
    setTimeout(() => this.reiniciar(), 4000);
  }

  jugadorPerdio() {
    this.mostrarMensaje = true;
    this.mensaje = "perdio";
    setTimeout(() => this.reiniciar(), 4000);
  }

  reiniciar() {
    this.mostrarMensaje = false;
    this.jugadaActiva = false;
    this.comenzar = false;
  }

  ngOnInit() {}
}
