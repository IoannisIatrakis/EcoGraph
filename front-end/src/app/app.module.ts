import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapsModule,LegendService,DataLabelService, MapsTooltipService, SelectionService } from '@syncfusion/ej2-angular-maps';

import { FormComponent } from './components/form/form.component';
import { AsyncPipe } from '@angular/common';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { CheckBoxSelectionService, DropDownListModule, DropDownTreeModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

import { FrontendComponent } from './components/frontend/frontend.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';



@NgModule({
  declarations: [
    AppComponent,
    
    FormComponent,
    ScatterChartComponent,
    BarChartComponent,
    LineChartComponent,
    
    FrontendComponent

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MapsModule,
    AsyncPipe,
    NgxChartsModule,
    BrowserAnimationsModule ,
    FormsModule,
    DropDownTreeModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DateRangePickerModule,
    DropDownListModule
    
    

    
  ],
  providers: [LegendService,DataLabelService,MapsTooltipService,SelectionService,CheckBoxSelectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
