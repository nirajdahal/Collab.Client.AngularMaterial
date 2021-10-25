import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './feature/components/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isUserAuthenticated!: boolean;
  constructor(private _authService: AccountService) {

  }
  ngOnInit(): void {
    if(this._authService.isUserAuthenticated()){
      this._authService.sendAuthStateChangeNotification(true);
      this.isUserAuthenticated = true;
    }

  }

  
}
