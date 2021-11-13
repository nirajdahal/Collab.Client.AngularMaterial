import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Pagination } from '../../models/common/pagination';
import { PaginatedStatusTicket, TicketDto, TicketPriorityDto, TicketSpecParam, TicketStatusDto, TicketTypeDto } from '../../models/ticket/ticketDto';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {


  constructor(private _http: HttpClient) {


  }

  selectedSearchValue!: string;


  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  ngOnInit(): void {
    this.getStatusTicketList();


    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }




  statusTicketList: PaginatedStatusTicket[] = []

  showMore(statusTicket: PaginatedStatusTicket) {
    let specParam: TicketSpecParam = {
      statusId: statusTicket.status.id,
      pageIndex: statusTicket.tickets.pageIndex,
      pageSize: statusTicket.tickets.pageSize + 1,
      search: this.selectedSearchValue
    }
    this.getPaginatedTicketsResults(specParam).subscribe(
      sl => {


        this.modifyStatusTicketList(statusTicket, sl);

      }
    )
  }
  searchVal(statusTicket: PaginatedStatusTicket, value: any) {
    if (value != "") {
      let specParam: TicketSpecParam = {
        statusId: statusTicket.status.id,
        pageIndex: statusTicket.tickets.pageIndex,
        pageSize: statusTicket.tickets.pageSize,
        search: value
      }
      this.getPaginatedTicketsResults(specParam).subscribe(
        sl => {


          this.modifyStatusTicketList(statusTicket, sl);

        }
      )
    }
  }


  drop(event: CdkDragDrop<TicketDto[]>, id: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);


      console.log(event.container.id);
      console.log(id);
    }
  }

  currentItem(i: any) {
    console.log(i)
  }


  //update ticket start
  ticketUpdateName!: string
  ticketUpdateDescription!: string
  ticketToUpdatePriority!: TicketPriorityDto
  ticketToUpdateType!: TicketTypeDto
  ticketToUpdateStatus!: TicketStatusDto

  ticketToModify?: TicketDto
  openModalToUpdate(ticket: TicketDto) {
    this.ticketToModify = ticket;
    this.ticketUpdateName =this.ticketToModify.name;
    this.ticketUpdateDescription = this.ticketToModify.description;
   
    this.getAllPriorites()
    this.getAllTypes()
    this.getAllStatus();

  }


  selectedTicketToUpdateType(e?:any) {
  
    let typeValue = this.typeList.find(x => x.name==e.target.value);
    if(typeValue !==undefined){
      this.ticketToUpdateType = typeValue;
    }

  }
  selectedTicketToUpdatePriority(e?:any){
    let priorityValue = this.priorityList.find(x => x.name==e.target.value);
    if(priorityValue !==undefined){
      this.ticketToUpdatePriority = priorityValue;
    }
  }
  selectedTicketToUpdateStatus(e?:any){
    let statusValue = this.statusList.find(x => x.name==e.target.value);
    if(statusValue !==undefined){
      this.ticketToUpdateStatus = statusValue;
    }
  }
  //update ticket end



  modifyStatusTicketList(statusTicket: PaginatedStatusTicket, sl: Pagination<TicketDto>) {
    let myId = this.statusTicketList.findIndex(x => x.status === statusTicket.status);


    this.statusTicketList.splice(myId, 1, {
      tickets: sl,
      status: statusTicket.status,
      count: sl.count
    });
  }

  getStatusTicketList() {
    let params = new HttpParams()
    params = params.append('pageIndex', "1")
    params = params.append('pageSize', "1");
    this._http.get<PaginatedStatusTicket[]>("https://localhost:44385/api/ticket/statusticket", { params: params }).subscribe(
      sl => {
        this.statusTicketList = sl;

      }
    )
  }

  getPaginatedTicketsResults(param: TicketSpecParam) {
    let params = new HttpParams()
    if (param.priotiyId) {
      params = params.append('priorityId', param.priotiyId.toString())
    }

    if (param.typeId) {
      params = params.append('typeId', param.typeId.toString())
    }
    if (param.sort) {
      params = params.append('sort', param.sort.toString())
    }
    if (param.search) {
      params = params.append('search', param.search.toString())
    }
    params = params.append('statusId', param.statusId?.toString())
    params = params.append('pageIndex', param.pageIndex)
    params = params.append('pageSize', param.pageSize);

    return this._http.get<Pagination<TicketDto>>("https://localhost:44385/api/ticket", { params: params })
  }

  priorityList!: TicketPriorityDto[];
  getAllPriorites() {
    let priorities = localStorage.getItem("TicketPriority");
    if (priorities !== undefined) {
      this.priorityList = JSON.parse(priorities!);
    }
    if (priorities == undefined) {
      this._http.get<TicketPriorityDto[]>("https://localhost:44385/api/ticket/priority").subscribe(
        p => {
          this.priorityList = p;
          localStorage.setItem("TicketPriority", JSON.stringify(this.priorityList))
        }
      )
    }

  }
  typeList!: TicketTypeDto[];
  getAllTypes() {
    let types = localStorage.getItem("TicketType");
    if (types !== undefined) {
      this.typeList = JSON.parse(types!);
    }
    if (types == undefined) {
      this._http.get<TicketTypeDto[]>("https://localhost:44385/api/ticket/type").subscribe(
        p => {
          this.typeList = p;
          localStorage.setItem("TicketType", JSON.stringify(this.typeList))
        }
      )
    }

  }

  statusList!: TicketTypeDto[];
  getAllStatus() {
    let status = localStorage.getItem("TicketStatus");
    if (status !== undefined) {
      this.statusList = JSON.parse(status!);
    }
    if (status == undefined) {
      this._http.get<TicketStatusDto[]>("https://localhost:44385/api/ticket/status").subscribe(
        p => {
          this.statusList = p;
          localStorage.setItem("TicketStatus", JSON.stringify(this.statusList))
        }
      )
    }

  }
}

