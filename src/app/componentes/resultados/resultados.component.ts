import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  juegos: Observable<any[]>;
  listaJuegos: any[];

  constructor(private db : AngularFireDatabase) {
    this.juegos = this.db.list('juegos').valueChanges(); 
    this.juegos.subscribe(juegos => {
      this.listaJuegos = juegos;
      for (const juego of this.listaJuegos) {
        switch(juego.juego) {
          case "adivinaElNumero":
            juego.juego = "advina el numero";
            break;
          case "agilidadArimetica":
            juego.juego = "agilidad aritmetica";
            break;
          case "completaLaPalabra":
            juego.juego = "completa la palabra";
            break;
          case "tateti":
            juego.juego = "ta te ti";
            break;
          case "piedraPapelTijera":
            juego.juego = "piedra papel tijera";
            break;
          default:
            break;
        }
      }
    }, error => console.log(error));
  }

  ngOnInit(): void {}
}
