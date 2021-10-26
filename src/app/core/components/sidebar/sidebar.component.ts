import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/feature/components/account/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private _accountService: AccountService, private _router: Router, private _toastr: ToastrService) { }

  userName : string = ""; 
  userEmail: string = "";
  isUserAuthenticated : boolean = false;
  ngOnInit(): void {
   this.checkAuthenticatedUserDetail();   
  }
  
  private checkAuthenticatedUserDetail(){
    this._accountService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
      if(res === true){
        this.userName= this._accountService.getCurrentUserName();
        this.userEmail = this._accountService.getCurrentUserEmail();
      }
      else{

        console.log("no user")
        
      }
    })
  }

  btnVal = false;

  btnToggle() {
    this.btnVal = !this.btnVal;
  }

  searchToggle() {
    this.btnVal = true;
  }

  logOut(){
    this._accountService.logout();
    this._toastr.success("Goodbye! See you again")
    this._router.navigateByUrl('/account/login');
  } 
}


