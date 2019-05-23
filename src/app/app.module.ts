import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { ChartComponent } from './chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VueChartComponent } from './vue-chart/vue-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ViewContainerComponent } from './view-container/view-container.component';
import { LinePlotComponent } from './line-plot/line-plot.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ChartComponent,
    VueChartComponent,
    BarChartComponent,
    ViewContainerComponent,
    LinePlotComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
