import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrl: './scatter-chart.component.css'
})
export class ScatterChartComponent implements OnInit {
  scatterChartData: any[] = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Flood';
  showYAxisLabel = true;
  yAxisLabel = 'Storm';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const yearsArray: number[] = [];
    for (let year = 1980; year <= 2020; year++) {
      yearsArray.push(year);
    }

    let fieldsArray: string[] = ["Storm","Flood"];

    this.apiService.getMeasurements("disasters", ["Greece"], yearsArray).pipe(
      map((data: any[]) => {
        
        const aggregatedData: { [country: string]: { [field: string]: { [year: string]: number } } } = {};
    
        
        data.forEach((item: any) => {
          const country = item.ISO3;
          if (!aggregatedData[country]) {
            aggregatedData[country] = {};
            fieldsArray.forEach(field => {
              aggregatedData[country][field] = {};
            });
          }
    
          fieldsArray.forEach(field => {
            const year = item.MeasureYear.toString();
            if (aggregatedData[country][field][year]) {
              aggregatedData[country][field][year] += item[field];
            } else {
              aggregatedData[country][field][year] = item[field];
            }
          });
        });
    
        
        const transformedData: any[] = [];
        for (const country in aggregatedData) {
          fieldsArray.forEach(field => {
            transformedData.push({
              name: `${country} ${field}`,
              series: Object.keys(aggregatedData[country][field]).map(year => {
                return {
                  name: year,
                  x: aggregatedData[country]["Flood"] ? aggregatedData[country]["Flood"][year] : 0,
                  y: aggregatedData[country]["Storm"] ? aggregatedData[country]["Storm"][year] : 0,
                  r: 1 
                };
              })
            });
          });
        }
    
        return transformedData;
      })
    ).subscribe((transformedData: any[]) => {
      this.scatterChartData = transformedData;
      console.log(this.scatterChartData, "scatterdata");
    });
    
    
    
  }
}