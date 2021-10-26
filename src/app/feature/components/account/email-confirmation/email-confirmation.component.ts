import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  public showSuccess!: boolean;
  
  constructor(private _authService: AccountService, private _route: ActivatedRoute, private _router: Router) { }
  ngOnInit(): void {
    this.confirmEmail();
  }
  private confirmEmail = () => {
   this.showSuccess = false;
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    console.log(token);
    this._authService.confirmEmail(token, email)
      .subscribe(_ => {
        this.showSuccess = true;

        setTimeout(() => {
          this._router.navigateByUrl("account/login")
        }, 14000);
      },
      err=> {
        this._router.navigateByUrl("/");
      })
  }

}
