import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnChanges, OnInit {

  @Input() data: [{name: string, value: number}];
  @Input() foobar: string;
  view: any[] = [500, 500];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {

  }
  ngOnInit() {
  }

}
