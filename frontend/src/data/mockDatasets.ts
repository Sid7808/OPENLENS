import type {Dataset} from "../types/dataset"

export const datasets: Dataset[] = [
    {
        id: 1,
        name: "Customer Analytics",
        description: "Customer purchase behavior",
        status: "Active",
        updatedAt: "2 days ago",
        updatedBy: "Anuj",
        size: "100MB",
    },
    {
        id: 2,
        name: "Employee Records",
        description: "Internal HR dataset",
        status: "Archived",
        updatedAt: "Yesterday",
        updatedBy: "Anuj",
        size: "100MB",
    },
]