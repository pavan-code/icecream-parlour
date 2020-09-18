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

  ngOnInit(): void {
  }
  openDialog() {  
    let dialogConfig = new MatDialogConfig()
    // dialogConfig.disableClose = true;
    dialogConfig.width = '440px'
    dialogConfig.height = 'auto'
    this.dialog.open(LoginDialogComponent, dialogConfig);
  }

}
