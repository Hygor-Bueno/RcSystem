export interface iClassification {
    description: string;
}

export interface iProduct {
    classification: string;
    description: string;
    price: number;
    observation?: string;
    units?: number;
};

export interface iConfigFormProduct {
    element: string;
    type?: string;
    label: string;
    options?: Array<{ value: string; label: string }>;
    name:string;
  }