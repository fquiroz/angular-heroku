import { Component, OnInit,ViewChild } from '@angular/core';
import {MatSidenav}  from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

}
