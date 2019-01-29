import { Component } from '@angular/core';

import 'jscatalyst/dist/jscatalyst.min.css';
import Vue from 'vue';
import Vuex from 'vuex';
import vueCustomElement from 'vue-custom-element';
import {D3PieChart, ThemePlugin} from 'jscatalyst';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {}
});
Vue.use(ThemePlugin, {store, custom: false});
Vue.use(vueCustomElement);

Vue.customElement('vue-chart', {
  store: store,
  props: ['pieData'],
  components: {D3PieChart},
  computed: {
    reformPieData() {
      return this.pieData.map(item => {
        return {label: item.name, value: item.value};
      });
    }
  },
  render(createElement) {
    return createElement(
      'div', {
        attrs: {
          'style': 'height: 500px; width: 500px; margin-left: 150px;'
        }
      }, [
        createElement(
          D3PieChart, {
            props: {
              dataModel: this.reformPieData
            },
          }
        )
      ]
    );
  }

});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
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
  foobar = 'baz';

  randomNumber() {
    return Math.floor(Math.random() * 50000);
  }


  changeData() {
    const newData = this.data.map(item => {
       item.value = this.randomNumber();
       return item;
    });

    this.foobar = 'bing';

    this.data = [...newData];

    console.log(this.data);
  }
}
