import { Component, OnInit } from '@angular/core';
import { strict } from 'assert';
import { stringify } from 'querystring';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  comenzar:boolean = false;
  listaPalabras = ["bicicleta","botella","caminar","camioneta","correr","estacionar","estudiar","programar","jirafa","limpiar"];
  palabraSecreta:string;
  palabraSecretaDesordenada:string;
  palabraIngresada:string;
  mensaje:string;
  mostrarMensaje:boolean = false;
  intentos:number = 5;

  constructor() {}

  comenzarJuego() {
    this.intentos = 5;
    this.comenzar = true;
    this.palabraIngresada = "";
    this.palabraSecreta = this.listaPalabras[Math.floor(Math.random() * (9 - 0)) + 0];
    this.desordenarPalabra();
    console.log(`La palabra a ordenar es = ${this.palabraSecreta}`);
  }

  desordenarPalabra() {
    do {
      this.palabraSecretaDesordenada  = this.shuffle(this.palabraSecreta);
    }while(this.palabraSecretaDesordenada == this.palabraSecreta);
  }

  shuffle (palabra:string) {
    var a = palabra.split(''), n = a.length;

    for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }

    return a.join('');
  }

  verificar() {
    if(this.palabraSecreta == this.palabraIngresada) {
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
