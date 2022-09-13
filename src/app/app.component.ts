import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateWindowComponent } from './shared/components/create-window/create-window.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    event?.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateWindowComponent, {
      width: '30%'
    });
  }
}
