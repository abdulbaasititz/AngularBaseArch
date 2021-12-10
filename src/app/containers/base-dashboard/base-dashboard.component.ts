import { Component,ViewChild, ElementRef, OnInit, Input, AfterViewInit ,Output, EventEmitter, ChangeDetectorRef, OnChanges } from '@angular/core';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  selector: 'app-base-dashboard',
  templateUrl: './base-dashboard.component.html',
  styleUrls: ['./base-dashboard.component.scss']
})
export class BaseDashboardComponent implements OnInit {

  @Input() DbData: any = [];
  @Input() DbValue: any = [];
  @Input() type: string = '';
  @Output() onclickEvent = new EventEmitter<string>();

  public lineOptions: any = {tooltips: {enabled: false,custom: CustomTooltips}, maintainAspectRatio: false, scales: { xAxes: [{ gridLines: { color: 'transparent', zeroLineColor: 'transparent' }, ticks: { fontSize: 2, fontColor: 'transparent', }  }], yAxes: [{ display: false, ticks: { display: false, min: 40 - 5, max: 84 + 5, } }], }, elements: { line: { borderWidth: 1 }, point: { radius: 4, hitRadius: 10, hoverRadius: 4, }, }, legend: { display: false } };
  public barOptions: any = { tooltips: { enabled: false, custom: CustomTooltips }, maintainAspectRatio: false, scales: { xAxes: [{ display: false, barPercentage: 0.6, }], yAxes: [{ display: false }] }, legend: { display: false } };
  public flatLineOptions: any = { tooltips: { enabled: false, custom: CustomTooltips }, maintainAspectRatio: false, scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] }, elements: { line: { borderWidth: 2 }, point: { radius: 0, hitRadius: 10, hoverRadius: 4, }, }, legend: { display: false } };

  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    },
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


  constructor( ) {
  }

  ngOnInit(): void {
    console.log(this.DbData)
  }

  returnChatLegend(e:any){
    return e.Legend;
  }

  returnChatType(e:any){
    if(e.type == 'flatline'){
      return 'line'
    }
    return e.type;
  }

  returnChatColor(e:any){
    return e.chatColor;
  }

  returnOption(e:any){
    if(e.type == 'line'){
      return this.lineOptions;
    }
    else if(e.type == 'bar'){
      return this.barOptions
    }
    else if(e.type == 'flatline'){
      return this.flatLineOptions;
    }
  }

  returnGradient(e:any){
    return 'linear-gradient(45deg, '+e.priColor+' 0%,  '+e.secColor+' 100%)';
  }

}
