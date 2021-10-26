import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './feature/components/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isUserAuthenticated!: boolean;
  constructor(private _authService: AccountService, private _router : Router) {

  }
  ngOnInit(): void {
    this.checkUserIsAuthenticated();
    

  }

  private checkUserIsAuthenticated(){
    if(this._authService.isUserAuthenticated()){
      this._authService.sendAuthStateChangeNotification(true);
      
    }
    else{
      this._authService.sendAuthStateChangeNotification(false);
      // this._router.navigateByUrl("account/login");
    }
  }

  
}
