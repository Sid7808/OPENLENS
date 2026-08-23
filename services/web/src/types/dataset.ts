//Table interface definition

export interface Table {
    id:string
    name:string
    rowCount: number;
    columns: { name: string; type: string } [];
    data: Record<string,any>[];
}

export interface Dataset {
    id: number;
    name: string;
    description:string;
    status: "Active" | "Archived";
    updatedAt: string;
    updatedBy: string;
    size: string;
    tables?: Table[];
}