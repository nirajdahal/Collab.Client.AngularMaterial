import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'my-app';

  openClassName: string = "bx-menu-alt-right";
  closeClass: string = "bx-menu";
  defaultClassName = "bx-menu-alt-right"



  btnVal = false;

  btnToggle() {
    this.btnVal = !this.btnVal;
  }

  searchToggle() {
    this.btnVal = true;
  }



 
}


