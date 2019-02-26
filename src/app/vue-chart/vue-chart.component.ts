import { Component, OnInit, Input } from '@angular/core';

import 'jscatalyst/dist/jscatalyst.min.css';
import Vue from 'vue';
import Vuex from 'vuex';
import wrap from '@vue/web-component-wrapper';
// import vueCustomElement from 'vue-custom-element';
import {D3PieChart, ThemePlugin} from 'jscatalyst';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {}
});
Vue.use(ThemePlugin, {store, custom: false});
// Vue.use(vueCustomElement);

const VueComponent =  {
  // store: store,
  // props: ['data'],
  // components: {D3PieChart},
  // computed: {
  //   pieData() {
  //     return this.data.map(item => {
  //       return {label: item.name, value: item.value};
  //     });
  //   }
  // },
  render(createElement) {
    return createElement(
      'div', {
        attrs: {
          'style': 'height: 500px; width: 500px; margin: 0 auto;'
        }
      }, [
        createElement('h1', 'your mom'
          // D3PieChart, {
          //   props: {
          //     dataModel: this.pieData
          //   },
          // }
        )
      ]
    );
  }

};

const CustomElement = wrap(Vue, VueComponent);

window.customElements.define('vue-chart-vue', CustomElement);

@Component({
  selector: 'app-vue-chart',
  templateUrl: './vue-chart.component.html',
  styleUrls: ['./vue-chart.component.css']
})


export class VueChartComponent implements OnInit {

  @Input() data: [{name: string, value: number}];

  constructor() { }

  ngOnInit() {
  }

}
