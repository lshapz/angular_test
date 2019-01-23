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
    options: {
      'title': 'Tasks',
      'width': 750,
      'height': 400,
},
  };

  randomNumber() {
    return Math.floor(Math.random() * 11)
  }


  changeData() {
    this.data.dataTable = [
      ['Task', 'Hours Per Day'],
      ['Work',     this.randomNumber()],
      ['Eat',      this.randomNumber()],
      ['Commute',  this.randomNumber()],
      ['Watch TV', this.randomNumber()],
      ['Sleep',    this.randomNumber()]
    ]
    console.log(this.data);
  }
}
