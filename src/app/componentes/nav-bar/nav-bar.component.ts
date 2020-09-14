import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() ruta : string = null;
  @Input() presentacion : boolean = false;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  volver() {
    this.ruta == "/Login" ? this.ruta = "" : this.ruta;
    this.router.navigate([`${this.ruta}`]);
  }

  quienSoy() {
    this.router.navigate(['/QuienSoy']);
  }
}
