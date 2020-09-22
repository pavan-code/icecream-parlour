import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog : MatDialog) { }
  LoggedIn: boolean = false;

  ngOnInit(): void {
    var token = localStorage.getItem('JWT_TOKEN')
    if(token !== null)  this.LoggedIn = true;
    else  this.LoggedIn = false;
  }
  openDialog() {  
    let dialogConfig = new MatDialogConfig()
    // dialogConfig.disableClose = true;
    dialogConfig.width = '440px'
    dialogConfig.height = 'auto'
    dialogConfig.position = {
      top : '100px'
    }
    this.dialog.open(LoginDialogComponent, dialogConfig)
    .afterClosed().subscribe(val => this.LoggedIn = val)
  }

  logout() {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('expiresIn')
    window.location.href = '/home'
    this.ngOnInit();
  }

}
