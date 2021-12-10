import { Component, OnInit } from '@angular/core';
import {RootService} from '../../_helpers/root.service';
import {Location} from '@angular/common';

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(public RootService: RootService, private _location: Location) { }

  ngOnInit(): void {
    if(this.RootService.insurenceData.length  == 0){
      this._location.back();
    }
    console.log(this.RootService.insurenceData)
  }

  download(){
    html2canvas(document.querySelector("#parentdiv")).then(canvas => {

        var pdf = new jspdf('p', 'mm', [canvas.width, canvas.height]);

        var imgData  = canvas.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData,0,0,canvas.width, canvas.height);
        pdf.save('insurence.pdf');

    });

  }

}
