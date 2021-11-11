import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../models/common/pagination';
import { PaginatedStatusTicket,TicketDto,TicketSpecParam } from '../../models/ticket/ticketDto';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {


  constructor(private _http: HttpClient) {
    

  }

  selectedSearchValue!: string;
  ngOnInit(): void {
    this.getStatusTicketList();  
  }

  
  statusTicketList: PaginatedStatusTicket[] = []
 

  showMore(statusTicket: PaginatedStatusTicket){
    let specParam: TicketSpecParam = {
      statusId: statusTicket.status.id,
      pageIndex: statusTicket.tickets.pageIndex,
      pageSize:statusTicket.tickets.pageSize+1,
      search:this.selectedSearchValue
    }
    this.getPaginatedTicketsResults(specParam).subscribe(
    sl => {
      
     
      this.modifyStatusTicketList(statusTicket, sl);

    }
  )
  }
  searchVal(statusTicket: PaginatedStatusTicket, value:any){
    if(value!=""){
      let specParam: TicketSpecParam = {
        statusId: statusTicket.status.id,
        pageIndex: statusTicket.tickets.pageIndex,
        pageSize:statusTicket.tickets.pageSize,
        search:value
      }
      this.getPaginatedTicketsResults(specParam).subscribe(
      sl => {
        
       
        this.modifyStatusTicketList(statusTicket, sl);
  
      }
      )}
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


  modifyStatusTicketList(statusTicket: PaginatedStatusTicket,sl: Pagination<TicketDto> ){
    let myId = this.statusTicketList.findIndex(x => x.status=== statusTicket.status);


    this.statusTicketList.splice(myId,1, {
            tickets: sl,
            status: statusTicket.status,
            count : sl.count
          });
  }

  getStatusTicketList(){
    let params = new HttpParams()
    params = params.append('pageIndex', "1")
    params = params.append('pageSize', "1");
    this._http.get<PaginatedStatusTicket[]>("https://localhost:44385/api/ticket/statusticket",{ params: params }).subscribe(
      sl => {
        this.statusTicketList = sl;
        
      }
    )
  }

  getPaginatedTicketsResults(param:TicketSpecParam){
    let params = new HttpParams()
    if(param.priotiyId){
      params = params.append('priorityId',param.priotiyId.toString())
    }

    if(param.typeId ){
      params = params.append('typeId',param.typeId.toString())
    }
    if(param.sort){
      params = params.append('sort',param.sort.toString())
    }
    if(param.search ){
      params = params.append('search',param.search.toString())
    }
    params = params.append('statusId',param.statusId?.toString())
    params = params.append('pageIndex', param.pageIndex )
    params = params.append('pageSize', param.pageSize);
    
   return this._http.get<Pagination<TicketDto>>("https://localhost:44385/api/ticket",{ params: params })
  }
}

