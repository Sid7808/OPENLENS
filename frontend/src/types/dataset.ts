export interface Dataset {
    id: number;
    name: string;
    description: string;
    status: "Active"| "Archived";
    updatedAt: string; // ISO String or relative data representation
    updatedBy: string;
    size: string;
    
}
