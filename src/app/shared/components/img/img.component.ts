import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  @Input() imgInput: string = "";
  public imgDefault: string = "./assets/images/default.png";

  constructor() { }

  ngOnInit(): void {
  }

  public eventFailed() {
    this.imgInput = this.imgDefault;
  }

}
