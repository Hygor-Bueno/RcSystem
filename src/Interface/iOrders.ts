export interface iOrders{
    id?:string;
    commands:number;
    date:string;
    list:iListOrder[];
    status:boolean;
}

export interface iListOrder{
    id:string;
    quantity:number;
    description:string;
    value: number
}