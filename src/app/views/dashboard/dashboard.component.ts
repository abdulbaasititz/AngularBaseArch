import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public dData:any [];

  ngOnInit(){
    this.dData = [
      { 
        "size": 3, 
        "title": "DataTest", 
        "baseType":'top-Card', 
        "type": 'line', 
        "Legend": false,
        "cardColor": [{
          "priColor": '#2982cc',
          "secColor": '#39f'
        }],
        "chatColor": [{
          backgroundColor: '#fff0',
          borderColor: 'rgba(255,255,255,.55)'
        }],
      },
      { 
        "size": 3, 
        "title": "DataTest", 
        "baseType":'top-Card', 
        "type": 'flatline', 
        "Legend": false,
        "cardColor": [{
          "priColor": '#1f1498',
          "secColor": '#321fdb'
        }],
        "chatColor": [{
          backgroundColor: '#fff0',
          borderColor: 'rgba(255,255,255,.55)'
        }],
      },
      { 
        "size": 3, 
        "title": "DataTest", 
        "baseType":'top-Card', 
        "type": 'line', 
        "Legend": false,
        "cardColor": [{
          "priColor": '#d93737',
          "secColor": '#e55353'
        }],
        "chatColor": [{
          backgroundColor: '#fff0',
          borderColor: 'rgba(255,255,255,.55)'
        }],
      },

      { 
        "size": 3, 
        "title": "DataTest", 
        "baseType":'top-Card', 
        "type": 'bar', 
        "Legend": false,
        "cardColor": [{
          "priColor": '#f6960b',
          "secColor": '#f9b115'
        }],
        "chatColor": [{
          backgroundColor: 'rgba(255,255,255, 0)',
          borderColor: 'rgba(255,255,255,.55)'
        }],
      }
    ]
  }

  onclickEventForm(e:any){

  }
}
