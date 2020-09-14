
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina'

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
 @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  mensaje:string = "Mensaje Default";
  mostrarMensaje:boolean = false;
  contador:number;
  comenzar:boolean = false;
 
  constructor() { 
    this.nuevoJuego = new JuegoAdivina();
    console.info("Inicio adivina"); 
    console.info(`El numero secreto es: ${this.nuevoJuego.numeroSecreto}`);  
  }

  comenzarJuego() {
    this.nuevoJuego.generarnumero();
    this.comenzar=true;
    this.contador=0;
  }

  verificar()
  {
    this.contador++;
    if (this.nuevoJuego.verificar()){
      this.enviarJuego.emit(this.nuevoJuego);
      this.nuevoJuego.numeroSecreto=0;
      this.enviarMensaje(true);
    }else{
      this.enviarMensaje();
    }
  }  

  enviarMensaje(ganador:boolean=false) {
    this.mostrarMensaje = true;
    if(ganador) {
      this.mensaje = `gano!`;  
      setTimeout(() => this.jugadorGano(), 4000);
    } else {
      if(this.contador > 7) {
        this.mensaje = "perdio";
        setTimeout(() => this.jugadorPerdio(), 4000);
      } else {
        if(this.nuevoJuego.numeroIngresado > this.nuevoJuego.numeroSecreto) {
          this.mensaje = `intento n°${this.contador}, es un numero menor`;  
        } else {
          this.mensaje = `intento n°${this.contador}, es un numero mayor`;  
        }
        setTimeout(() => this.ocultar(), 4000);
      }
    }
  } 

  jugadorGano() {
    this.mostrarMensaje = false;
    this.nuevoJuego.numeroSecreto = 0;
    this.comenzar = false;
  }

  jugadorPerdio() {
    this.mostrarMensaje = false;
    this.nuevoJuego.numeroSecreto = 0;
    this.comenzar = false;
  }

  ocultar() {
    this.mostrarMensaje = false;
  }

  ngOnInit() {}
}
