export interface iInputField {
    type: string;
    label: string;
    keyDB: string;
    mandatory:boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export interface iSelectField { 
    label: string; 
    options?: Array<{ id: string; description: string }>; 
    keyDB: string;
    mandatory:boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface iTextAreaField {
    label: string;
    keyDB: string;
    mandatory:boolean;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

