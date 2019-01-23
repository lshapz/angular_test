import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data =  {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours Per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    options: {'title': 'Tasks'},
  };


  changeData() {
    this.data.dataTable = [
      ['Task', 'Hours Per Day'],
      ['Work',     8],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 5],
      ['Sleep',    7]
    ]
    console.log(this.data);
  }
}
