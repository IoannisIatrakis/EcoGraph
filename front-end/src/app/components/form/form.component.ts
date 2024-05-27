import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';


import { Observable } from 'rxjs';
import { DropDownTreeComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  
  
})
export class FormComponent implements OnInit{
  @ViewChild("mydropDown") public myDropDown: DropDownTreeComponent | undefined
  @ViewChild("disasterDropDown") public disasterDropDown: DropDownTreeComponent | undefined
  @ViewChild("landDropDown") public landDropDown: DropDownTreeComponent | undefined
  @ViewChild("temperatureDropDown") public temperatureDropDown: DropDownTreeComponent | undefined
  @ViewChild("forestCarbonDropDown") public forestCarbonDropDown: DropDownTreeComponent | undefined


  public years:  { [key: string]: Object }[] = [ { Id: 1, Game: '1 Year' },
  { Id: 2, Game: '2 Years' }, { Id: 5, Game: '5 Years' }, { Id: 10, Game: '10 Years' }];

  public Intervalfields: Object = { text: 'Game', value: 'Id' };

  selectedYear : any=1;
  startValue: any=1980;
  endValue: any=2020;
  value:any;
  myNg: any;
  selectedChart :any = "nothing"

  selectedData: { [key: string]: Object; }[] | undefined;
  tables= ["disasters", "land", "temperature","forestcarbon"]
  disastersTables: any={
    "table": "disasters",
    "fields": []
  }
  landTables: any={
    "table": "land",
    "fields": []
  }
  temperatureTables: any={
    "table": "temperature",
    "fields": []
  }
  forestcarbonTables: any={
    "table": "forestcarbon",
    "fields": []
  }
  tablesFields:any=[]
  
  
   Countries: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCountryNames().subscribe(
      (response: any) => {
        //console.log(response, "fields");
        // Map the response to the expected structure
        const countries = response.map((country: any, index: number) => ({
          nodeId: `03-${index + 1}`,
          nodeText: country.CountryName.trim() // Remove extra spaces
        }));
        
        //console.log(countries)
        let data= [
          {
            nodeId: '01', nodeText: 'Countries',
            nodeChild: countries
          }
        ];
        this.fields={ dataSource: data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' };
      },
      (error: any) => {
        alert(error.error);
      }
    );

    this.apiService.getTablesFields("land").subscribe(
      (response: any) => {
       // console.log(response, "fields");
        // Map the response to the expected structure
        const fields = response.map((field: any, index: number) => ({
          nodeId: `03-${index + 1}`,
          nodeText: field.COLUMN_NAME.trim() // Remove extra spaces
        }));

        fields.filter((field: any) => {
          if(field.nodeText=="ClimateAlteringCoverIndex" ){
            fields.splice(fields.indexOf(field),1)
          }

        })
        
        //console.log(fields)
        let data= [
          {
            nodeId: '01', nodeText: 'Fields',
            nodeChild: fields
          }
        ];
        this.landFields={ dataSource: data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' };
      },
      (error: any) => {
        alert(error.error);
      }
    );
    this.apiService.getTablesFields("disasters").subscribe(
      (response: any) => {
        //console.log(response, "fields");
        // Map the response to the expected structure
        const fields = response.map((field: any, index: number) => ({
          nodeId: `03-${index + 1}`,
          nodeText: field.COLUMN_NAME.trim() // Remove extra spaces
        }));
        
        //console.log(fields)
        let data= [
          {
            nodeId: '01', nodeText: 'Fields',
            nodeChild: fields
          }
        ];
        this.disastersFields={ dataSource: data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' };
      },
      (error: any) => {
        alert(error.error);
      }
    );
    this.apiService.getTablesFields("temperature").subscribe(
      (response: any) => {
        //console.log(response, "fields");
        // Map the response to the expected structure
        const fields = response.map((field: any, index: number) => ({
          nodeId: `03-${index + 1}`,
          nodeText: field.COLUMN_NAME.trim() // Remove extra spaces
        }));
        
        //console.log(fields)
        let data= [
          {
            nodeId: '01', nodeText: 'Fields', 
            nodeChild: fields
          }
        ];
        this.temperatureFields={ dataSource: data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' };
      },
      (error: any) => {
        alert(error.error);
      }
    );

    this.apiService.getTablesFields("forestcarbon").subscribe(
      (response: any) => {
        //console.log(response, "fields");
        // Map the response to the expected structure
        const fields = response.map((field: any, index: number) => ({
          nodeId: `03-${index + 1}`,
          nodeText: field.COLUMN_NAME.trim() // Remove extra spaces
        }));

        fields.filter((field: any) => {
          if(field.nodeText=="ICarbonStocksForests" ){
            fields.splice(fields.indexOf(field),1)
          }

        })
        
        //console.log(fields)
        let data= [
          {
            nodeId: '01', nodeText: 'Fields',
            nodeChild: fields
          }
        ];
        this.forestCarbonFields={ dataSource: data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' };
      },
      (error: any) => {
        alert(error.error);
      }
    );
    
  }


  data: { [key: string]: Object }[] = [
    {
      nodeId: '01', nodeText: 'Countries',
      nodeChild: []
    }
  ];
    //binding data source through fields property
   public fields: Object = { dataSource: this.data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' };

   public disastersFields: Object = { dataSource: this.data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' };
   public landFields: Object = { dataSource: this.data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' };
   public forestCarbonFields: Object = { dataSource: this.data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' };
   public temperatureFields: Object = { dataSource: this.data, value: 'nodeId', text: 'nodeText', child: 'nodeChild' };


   public getData(dropdown:DropDownTreeComponent |undefined,table :any):void{
   let selectedData:any= (dropdown as DropDownTreeComponent) ?.getData();
   let Countries: any[] = [];
   //console.log(selectedData[0]["nodeChild"], "selectedData")
   try{
   selectedData[0]["nodeChild"].forEach((item: { [x: string]: any; }) => {
      if(item["selected"]){
       Countries.push(item["nodeText"])
      }
   })
  }catch(e){
  }
   //console.log(Countries, "Countries")

   table.fields=Countries
   //console.log(table, "disastersTables")

   



    
  
   


   }

   public getCountriesData(){
    let selectedData:any= (this.myDropDown as DropDownTreeComponent) ?.getData();
    let Countries: string[] = [];
    //console.log(selectedData[0]["nodeChild"], "selectedData")
    try{
    selectedData[0]["nodeChild"].forEach((item: { [x: string]: any; }) => {
       if(item["selected"]){
        Countries.push(item["nodeText"])
        
       }
    })
    this.Countries=Countries
    console.log(Countries, "Countries")
  }catch{

  }
    //console.log(Countries, "Countries")
    

   }

   public addTablesFields():void{
    this.tablesFields=[]
    if(this.disastersTables.fields.length>0){
      console.log(this.disastersTables.fields.length)
      this.tablesFields.push(this.disastersTables)
    }
    if(this.landTables.fields.length>0){
      this.tablesFields.push(this.landTables)
    }
    if(this.temperatureTables.fields.length>0){
      this.tablesFields.push(this.temperatureTables)
    }
    if(this.forestcarbonTables.fields.length>0){

      console.log(this.forestcarbonTables.fields,"herewashard")
      this.tablesFields.push(this.forestcarbonTables)
    }
    console.log(this.tablesFields, "tables")
    
   


   }
   selectChart(chart: string){
    
    
    console.log(this.tablesFields, "tablefields here")
    console.log(this.Countries,"COUNTRIES HERE")
    this.addTablesFields()
      this.selectedChart=chart

      
    }

   
logValue(){
  this.startValue=this.value[0].getFullYear()
  this.endValue=this.value[1].getFullYear()
}



   
}


    


 