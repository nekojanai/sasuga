import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: '[sasuga-btn]',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {

  btnSnd = new Audio('./assets/btn_snd_v3.wav');

  constructor() { }

  ngOnInit(): void {}

  @HostListener('click')
  onClickNotDisabled() {
    this.btnSnd.play();
  }

}
