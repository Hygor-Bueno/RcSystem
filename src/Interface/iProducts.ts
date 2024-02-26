export interface iRegisterClass {
    id?:number;
    description: string;
}
export interface iClassification {
    id:string;
    description: string;
}

export interface iProduct {
    classification: string;
    description: string;
    price: number;
    observation?: string;
    units?: number;
};

export interface iCommands{
    id?:string;
    commands:number;
    status:boolean;
}

export interface iConfigFormProduct {
    element: string;
    type?: string;
    label: string;
    options?: Array<{ id: string; description: string }>;
    name:string;
    required:boolean;
  }