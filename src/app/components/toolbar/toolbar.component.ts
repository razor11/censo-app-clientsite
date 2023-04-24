import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() toggleSidenav = new EventEmitter<void>();


  constructor(private authService: AuthenticationService, ){

  }


  logout(){
      this.authService.logout();
  }



}
