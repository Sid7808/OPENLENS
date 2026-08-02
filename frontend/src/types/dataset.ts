export interface Dataset {
    id: number;
    name: string;
    description: string;
    status: "Active"| "Archived";
    updatedAt: string;
}
