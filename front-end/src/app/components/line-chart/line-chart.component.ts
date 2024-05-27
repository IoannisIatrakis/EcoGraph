import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit,OnChanges {
  lineChartData: any[] = [];
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
  yAxisLabel = 'Population';
  

  @Input() countries: string[] = [];
  @Input() fields: any;
  @Input() years: number[] = [];

  @Input() interval: number = 1;
  @Input( ) startYear: number = 1980;
  @Input( ) endYear: number = 2022;
  constructor(private apiService: ApiService) {
   



  }

  ngOnInit(): void {
    const yearsArray: number[] = [];
    for (let year = this.startYear; year <= this.endYear; year=year+this.interval) {
      yearsArray.push(year);
    }
    let fieldsArray: string[] = ["Grassland"];
    
    
    
    
    // let table="land"
    
    // if(fieldsArray.includes("ALL")){
                
    //   this.apiService.getTablesFields(table).subscribe(
    //     (response ) => {
    
    //       fieldsArray=response.map((item: { COLUMN_NAME: any; }) => item.COLUMN_NAME);
    //       console.log(fieldsArray,"fields")
    //     },
    //     (error) => {
    //       //debugger
    //       alert(error.error);
    //     }
    
    //   )
    
    // }
    
    let tables =  this.fields;
    
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
          item.fields.forEach((field: string) => {
            const seriesName = `${item.ISO3} ${field}`;
            if (!groupedData[seriesName]) {
              groupedData[seriesName] = [];
            }
    
            groupedData[seriesName].push({
              name: item.MeasureYear,
              value: item[field]
            });
          });
        });
    
        
        const transformedData = Object.keys(groupedData).map(seriesName => ({
          name: seriesName,
          series: groupedData[seriesName]
        }));
    
        return transformedData;
      })
    ).subscribe((transformedData: any) => {
      this.lineChartData = transformedData;
    });
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }
}
