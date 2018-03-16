import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { MatInputModule,MatRippleModule,MatMenuModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {LoginModule} from './login/login.module';
import {ProductosModule} from './productos/productos.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import 'hammerjs';
import { SidenavComponent } from './shared/componentes/sidenav/sidenav.component';
import { PrincipalComponent } from './principal/principal.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
    ProductosModule,
    LoginModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatRippleModule,
    ToastrModule.forRoot()

  ],

  exports: [
    MatInputModule,
    MatRippleModule,
    MatMenuModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
