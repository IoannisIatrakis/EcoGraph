import { Component, Input, NgModule, OnChanges, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiService } from '../../services/api.service';
import { interval, map } from 'rxjs';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit,OnChanges {

  @Input() countries: string[] = [];
  @Input() fields: any;
  @Input() years: number[] = [];
  @Input() interval: number = 1;
  @Input( ) startYear: number = 1980;
  @Input( ) endYear: number = 2022;

  ngOnInit(): void {

    const yearsArray: number[] = [];
    for (let year = this.startYear; year <= this.endYear; year=year+this.interval) {
      yearsArray.push(year);
    }
    let fieldsArray: string[] = ["Storm","Wildfire","Grassland"];


    let tables = this.fields;

    // if (fieldsArray.includes("ALL")) {

    //   this.apiService.getTablesFields(tables).subscribe(
    //     (response) => {

    //       fieldsArray = response.map((item: { COLUMN_NAME: any; }) => item.COLUMN_NAME);
    //       console.log(fieldsArray, "fields")
    //     },
    //     (error) => {
    //       //debugger
    //       alert(error.error);
    //     }

    //   )

    // }

    this.apiService.getMeasurements(tables, this.countries, yearsArray).pipe(
      map((response: any) => {
        
        const flatData: any[] = [];
    
        for (const table of tables) {
          const tableName = table.table;
          const fields = table.fields;
          const tableData = response[tableName];
    
          tableData.forEach((item: any) => {
            flatData.push({
              ...item,
              table: tableName,
              fields: fields
            });
          });
        }
    
        
        const groupedData: any = {};
        flatData.forEach((item: any) => {
          const measureYear = item.MeasureYear;
          if (!groupedData[measureYear]) {
            groupedData[measureYear] = [];
          }
    
          
          item.fields.forEach((field: string) => {
            if (item[field] !== undefined) {
              groupedData[measureYear].push({
                name: `${item.ISO3} ${field}`,
                value: item[field]
              });
            }
          });
        });
    
       
        const transformedData = Object.keys(groupedData).map(measureYear => ({
          name: measureYear,
          series: groupedData[measureYear]
        }));
    
        return transformedData;
      })
    ).subscribe((transformedData: any) => {
      this.barChartData = transformedData;
    });
    
    
    console.log(this.barChartData, "mydata")
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }
  
  barChartData: any[] = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] as any[]
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  constructor(private apiService: ApiService) {
    
  }
}
