import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private _http: HttpClient,) { }

  ngOnInit(): void {

    var ticket = this._http.get("https://localhost:44385/api/ticket").subscribe(
      x => console.log(x)
    );
  }

}
