import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnChanges {

  @Input() data: [{name: string, value: number}];
  @Input() foobar: string;
  view: any[] = [700, 400];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.foobar);
    // if (!changes.data.firstChange ) {
    //   this.chartVar = false;
    //   setTimeout(function() {
    //     console.log('time');
    //     this.chartVar = true;
    //   }, 1000);
    // }
  }

}
