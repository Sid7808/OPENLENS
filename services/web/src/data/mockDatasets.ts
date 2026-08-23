// file:///c:/Users/ansuj/OpenLens/frontend/src/data/mockDatasets.ts

import type { Dataset } from "../types/dataset"

export const datasets: Dataset[] = [
  {
    id: 1,
    name: "Customer Analytics",
    description: "Customer purchase behavior",
    status: "Active",
    updatedAt: "2 days ago",
    updatedBy: "Anuj",
    size: "100MB",
    tables: [
      {
        id: "customers",
        name: "Customers",
        rowCount: 3,
        columns: [
          { name: "id", type: "integer" },
          { name: "name", type: "varchar" },
          { name: "email", type: "varchar" },
          { name: "signup_date", type: "date" }
        ],
        data: [
          { id: 1, name: "Alice Smith", email: "alice@example.com", signup_date: "2026-01-15" },
          { id: 2, name: "Bob Johnson", email: "bob@example.com", signup_date: "2026-02-10" },
          { id: 3, name: "Charlie Brown", email: "charlie@example.com", signup_date: "2026-03-05" }
        ]
      },
      {
        id: "orders",
        name: "Orders",
        rowCount: 3,
        columns: [
          { name: "id", type: "integer" },
          { name: "customer_id", type: "integer" },
          { name: "amount", type: "numeric" },
          { name: "order_date", type: "date" }
        ],
        data: [
          { id: 101, customer_id: 1, amount: 99.99, order_date: "2026-05-12" },
          { id: 102, customer_id: 2, amount: 49.50, order_date: "2026-05-14" },
          { id: 103, customer_id: 1, amount: 150.00, order_date: "2026-05-15" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Employee Records",
    description: "Internal HR dataset",
    status: "Archived",
    updatedAt: "Yesterday",
    updatedBy: "Anuj",
    size: "100MB",
    tables: [
      {
        id: "employees",
        name: "Employees",
        rowCount: 3,
        columns: [
          { name: "id", type: "integer" },
          { name: "name", type: "varchar" },
          { name: "role", type: "varchar" },
          { name: "department_id", type: "integer" }
        ],
        data: [
          { id: 1, name: "David Miller", role: "Software Engineer", department_id: 10 },
          { id: 2, name: "Elena Rostova", role: "Product Manager", department_id: 10 },
          { id: 3, name: "Frank Sinatra", role: "HR Lead", department_id: 20 }
        ]
      },
      {
        id: "departments",
        name: "Departments",
        rowCount: 2,
        columns: [
          { name: "id", type: "integer" },
          { name: "name", type: "varchar" },
          { name: "budget", type: "numeric" }
        ],
        data: [
          { id: 10, name: "Engineering", budget: 500000 },
          { id: 20, name: "Human Resources", budget: 120000 }
        ]
      }
    ]
  },
]
