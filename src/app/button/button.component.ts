import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Output() changeData = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.changeData.emit();
  }

}
