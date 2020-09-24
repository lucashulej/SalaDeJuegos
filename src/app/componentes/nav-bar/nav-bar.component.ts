import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() ruta : string = null;
  @Input() presentacion : boolean = false;

  constructor(private router : Router, private authService : AuthService,) { }

  ngOnInit(): void {
  }

  volver() {
    if(this.ruta == "/Login") {
      this.authService.signOut();
      this.ruta = "";
    } 
    this.router.navigate([`${this.ruta}`]);
  }

  quienSoy() {
    this.router.navigate(['/QuienSoy']);
  }
}
