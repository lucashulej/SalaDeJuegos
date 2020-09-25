import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina'
import { ResultadosService } from '../../servicios/resultados.service';

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
 
  constructor(private resultadoService : ResultadosService) { 
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
      this.mensaje = "ganaste";  
      setTimeout(() => this.jugadorGano(), 4000);
    } else {
      if(this.contador > 7) {
        this.mensaje = "perdiste";
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
    this.cargarVictoria();
  }

  jugadorPerdio() {
    this.mostrarMensaje = false;
    this.nuevoJuego.numeroSecreto = 0;
    this.comenzar = false;
    this.cargarPerdida();
  }

  ocultar() {
    this.mostrarMensaje = false;
  }
  
  cargarVictoria() {
    this.resultadoService.gano("adivinaElNumero");
  }

  cargarPerdida() {
    this.resultadoService.perdio("adivinaElNumero");
  }

  ngOnInit() {}
}
