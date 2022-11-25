import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-not-found',
  templateUrl: './error-not-found.component.html',
  styleUrls: ['./error-not-found.component.css']
})
export class ErrorNotFoundComponent implements OnInit {

  imageSrc = 'assets/404-error.svg';
  imageAlt = 'Not Found';

  constructor() { }

  ngOnInit(): void {
  }

}
