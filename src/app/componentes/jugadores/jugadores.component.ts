import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  usuarios: Observable<any[]>;
  lista: any[];

  constructor(private db : AngularFireDatabase) {
    this.usuarios = db.list('usuarios').valueChanges(); 
    this.usuarios.subscribe(usuarios => this.lista = usuarios, error => console.log(error));
  }
  
  ngOnInit(): void {}
}
