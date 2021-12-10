import { Component, OnInit, Renderer2, OnChanges, ViewChild,ChangeDetectorRef, Input,Injector, ChangeDetectionStrategy, AfterViewInit, Output, EventEmitter  } from '@angular/core';
import autoTable from 'jspdf-autotable';
import * as FileSaver from "file-saver";
import { LazyLoadEvent } from 'primeng/api';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-datatable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  providers: []
})
export class DatatableComponent implements OnInit, OnChanges  {

  @Input() public tableData:any;
  @Input() public tableSchema:any;
  private lastTableLazyLoadEvent: LazyLoadEvent;
  public lastEvent:any;

  @ViewChild('dt1', {static: false}) dt1:any;

  @Output() onclickEvent = new EventEmitter<string>();

  public mainSchema:any = [];
  public mainSchemae:any = [];
  public filters:any = [];
  public buttonSchema:any = [];
  public roleMasterPrm:any = [];
  public OtherOptions:any = {};
  statuses: any[];
  _selectedColumns: any[];

  rowGroupMetadata: any = {};
  totalRecords: number;
  lengthdata: number = 0;
  service: any;
  loading: boolean = true;
  selectedProducts: any;
  exportColumns: any =[];


  constructor(private injector:Injector,public cd: ChangeDetectorRef,private renderer: Renderer2) { }
  onSort() {
      this.updateRowGroupMetaData();
  }

  ngOnChanges() {
    console.log(this.tableSchema);
  }

  updateRowGroupMetaData() {

    if(this.tableSchema['group'] == true){
      this.rowGroupMetadata = {};

      if (this.tableData) {
          for (let i = 0; i < this.tableData.length; i++) {
              let rowData = this.tableData[i];
              let representativeName = rowData[this.tableSchema['groupID']];

              if (i == 0) {
                  this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
              }
              else {
                  let previousRowData = this.tableData[i - 1];
                  let previousRowGroup = previousRowData[this.tableSchema['groupID']];
                  if (representativeName === previousRowGroup)
                      this.rowGroupMetadata[representativeName].size++;
                  else
                      this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
              }
          }
      }
    }

}

  ngOnInit(): void {
    this.loading = true;
    this.mainSchema = this.tableSchema?.mainschema;
    this.buttonSchema = this.tableSchema?.buttonSchema;
    this.roleMasterPrm = this.tableSchema?.roleMasterPrm;
    this.OtherOptions = this.tableSchema?.OtherOptions;
    this.service = this.injector.get(<any>this.tableSchema?.serviceName);
    this._selectedColumns = [];

    this.mainSchemae = JSON.parse(JSON.stringify(this.mainSchema));

    this.mainSchemae.forEach((element:any) => {
      if(element.isActive == true){  //-- need to check with abdul
        this._selectedColumns.push(element);
      }
    });

    this.statuses = [
      {label: 'Active', value: true},
      {label: 'Inactive', value: false},
    ]
  }

  ngAfterViewInit():void{
    this.loading = false;

    this.mainSchema.forEach((element:any) => {
      this.filters.push(element.field);
    });

    this.lengthdata = this.mainSchema.length;

    //setTimeout(()=>{this.updateRowGroupMetaData();}, 1000);

  }

  clear(table: any) {
    table.clear();
  }

  returnvalue(e:any){
    return e.target.value;
  }

  onClickEvent(e: any, a:any) {
    var data :any = {
      'data': e,
      'action': a,
    }
    this.onclickEvent.next(data);
  }

  exportPdf() {
    this.exportColumns = [];
    var datast:any = [];
    this.mainSchema.forEach((e:any) => {
      datast.push( e.header);
    });

    this.exportColumns.push(datast);

    var dataset:any = [];
    this.tableData.forEach((e:any) => {
      dataset.push(this.json2array(e));
    });

    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default('p');
            autoTable(doc, {
                head: this.exportColumns,
                body: dataset,
                didDrawPage: (dataArg) => {
                doc.text('PAGE', dataArg.settings.margin.left, 10);
                }
            });
            doc.save('table.pdf');
        })
    })
  }

json2array(json:any){
    var result:any = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.tableData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  //import("file-saver").then(FileSaver => {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  //});
}

refreshTable(){
  this.loadCustomers(this.lastEvent);
}

loadCustomers(event: LazyLoadEvent) {
  this.lastEvent = event;
  this.loading = true;
  var searchKey = '';
  //setTimeout(() => {
    if(event.globalFilter != null){
      searchKey = "&searchKey="+ (event.globalFilter)
    }

    var params =  "start="+ ((event.first*1) + 1) +"&limit="+ (event.first+event.rows) +"&isPagination=true"+searchKey
    this.service.getAll(params).subscribe(
      data => {
        this.loading = false;
        this.tableData = data['results'];
        this.totalRecords = data['totalCount'];
        this.selectedProducts = [];
        this.cd.detectChanges();
      },
      error => { this.loading = false; }
    );
  //}, 1000);
}

deleteSelected(){
  this.onClickEvent(this.selectedProducts, 'deleteSelected')
}

checkDisableDelete(){
  return this.selectedProducts && this.selectedProducts.length <= 0;
}


}
