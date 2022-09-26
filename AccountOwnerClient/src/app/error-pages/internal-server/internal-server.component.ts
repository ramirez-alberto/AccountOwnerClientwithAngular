import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.css']
})
export class InternalServerComponent implements OnInit {
  errorMessage: string = `500 SERVER ERROR, PLEASE CONTACT WITH THE ADMINISTRATOR.`;

  constructor() { }

  ngOnInit(): void {
  }

}
