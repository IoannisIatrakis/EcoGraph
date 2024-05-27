import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontendComponent } from './components/frontend/frontend.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { FormComponent } from './components/form/form.component';


const routes: Routes = [
  {path:"form-bar-chart-component", component: BarChartComponent},
 
  {path:"line-chart-component", component: LineChartComponent},
  {path:"", component: FrontendComponent},
  {path:"form", component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
