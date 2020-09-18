import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completa-la-palabra',
  templateUrl: './completa-la-palabra.component.html',
  styleUrls: ['./completa-la-palabra.component.css']
})
export class CompletaLaPalabraComponent implements OnInit {

  listaPalabras = ["bicicleta","botella","caminar","camioneta","correr","estacionar","estudiar","programar","jirafa","limpiar"];
  letraIngresada:string;
  letra:string;
  palabraSinLetra:string = "";
  mensaje:string = "Mensaje Default";
  mostrarMensaje:boolean = false;
  intentos:number = 5;
  comenzar:boolean = false;
  indexDePalabra:number;
  indexDeLetra:number;
  constructor() { }

  comenzarJuego() {
    this.letraIngresada = "";
    this.comenzar = true;
    this.intentos = 5;
    this.indexDePalabra = Math.floor(Math.random() * (9 - 0)) + 0;
    this.palabraSinLetra = this.listaPalabras[this.indexDePalabra];
    this.indexDeLetra = Math.floor(Math.random() * (this.palabraSinLetra.length - 0)) + 0;
    this.palabraSinLetra = this.palabraSinLetra.substring(0,this.indexDeLetra) + "-" + this.palabraSinLetra.substring(this.indexDeLetra+1);
  }

  verificar() {
    let auxString = this.palabraSinLetra.substring(0,this.indexDeLetra) + this.letraIngresada + this.palabraSinLetra.substring(this.indexDeLetra+1);
    if(auxString.toLowerCase() == this.listaPalabras[this.indexDePalabra]) {
      this.jugadorGano();
    } else {
      this.intentos--;
      if(this.intentos < 0) {
        this.jugadorPerdio();
      }
    }
  }  

  jugadorGano() {
    this.mostrarMensaje = true;
    this.mensaje = "ganaste";
    setTimeout(() => this.reiniciar(), 4000);
  }

  jugadorPerdio() {
    this.mostrarMensaje = true;
    this.mensaje = "perdiste";
    setTimeout(() => this.reiniciar(), 4000);
  }

  reiniciar() {
    this.mostrarMensaje = false;
    this.comenzar = false;
  }

  ngOnInit() {}
}
