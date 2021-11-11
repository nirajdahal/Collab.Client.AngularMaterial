import { Pagination } from "../common/pagination";

export interface TicketDto {
    name: string
    description: string
    ticketType: TicketTypeDto
    ticketPriority: TicketPriorityDto
    ticketStatus: TicketStatusDto
    assignedDevelopers: UserDto[]
    createdAt: Date

    updatedAt: Date
}


export interface UserDto {
    name: string
    email: string
}

export interface StatusTicketDto {
    tickets: TicketDto[]
    status: TicketStatusDto
}

export interface TicketStatusDto {
    id: number
    name: string
    themeColor: string
}

export interface TicketPriorityDto {
    id: number
    name: string
    themeColor: string
}

export interface TicketTypeDto {
    id: number
    name: string
    themeColor: string
}

export interface PaginatedStatusTicket {
    tickets: Pagination<TicketDto>
    status: TicketStatusDto
    count: number
}

export interface TicketSpecParam {

    pageIndex: number
    pageSize: number
    priotiyId?: number
    typeId?: number
    statusId: number
    sort?: string
    search?: string
}