import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = [
      {
        'name': 'Germany',
        'value': 40632
      },
      {
        'name': 'United States',
        'value': 49737
      },
      {
        'name': 'France',
        'value': 36745
      },
      {
        'name': 'United Kingdom',
        'value': 36240
      },
      {
        'name': 'Spain',
        'value': 33000
      },
      {
        'name': 'Italy',
        'value': 35800
      }
    ];

  randomNumber() {
    return Math.floor(Math.random() * 40000) + 10000;
  }

  changeData() {
    const newData = this.data.map(item => {
       item.value = this.randomNumber();
       return item;
    });

    this.data = [...newData];

    console.log(this.data);
  }
}
