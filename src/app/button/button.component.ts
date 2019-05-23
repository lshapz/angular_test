import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() buttonText = "Randomize Data";
  @Output() changeData = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.changeData.emit();
  }

}
