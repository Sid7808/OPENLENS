// file:///c:/Users/ansuj/OpenLens/frontend/src/pages/DatasetTables.tsx

import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { 
  Typography, 
  Card, 
  CardContent, 
  Table as MuiTable, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import { TableChart, ArrowForward, HelpOutlined, Dns, Update } from "@mui/icons-material";
import { datasets } from "../data/mockDatasets";

// === ADD: Import separate SCSS file ===
import "./DatasetTables.scss";

export default function DatasetTables() {
  const { datasetId, tableId } = useParams<{ datasetId: string; tableId?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "preview";

  const dataset = datasets.find((d) => d.id === Number(datasetId));
  if (!dataset) {
    return (
      <div className="error-panel">
        <Typography variant="h6" color="error">Dataset not found</Typography>
      </div>
    );
  }

  const tables = dataset.tables || [];

  // ==========================================
  // === RENDER MODE 1: Show List of Tables ===
  // ==========================================
  if (!tableId) {
    return (
      <div className="tables-workspace">
        <div className="workspace-header">
          <h2 className="title">Tables</h2>
          <span className="subtitle">
            Manage and explore tables inside <strong>{dataset.name}</strong>.
          </span>
        </div>

        {tables.length === 0 ? (
          <div className="no-tables-panel">
            <TableChart className="icon" />
            <div className="msg-title">No tables found</div>
            <div className="msg-desc">This dataset doesn't have any tables loaded yet.</div>
          </div>
        ) : (
          <div className="table-grid">
            {tables.map((table) => (
              <Card 
                key={table.id}
                onClick={() => navigate(`/datasets/${datasetId}/tables/${table.id}`)}
                className="table-card"
                variant="outlined"
              >
                <CardContent>
                  <div className="card-header-row">
                    <div className="icon-wrapper">
                      <TableChart />
                    </div>
                    <span className="table-name">{table.name}</span>
                  </div>
                  <p className="table-description">
                    Schema includes: {table.columns.slice(0, 3).map(c => c.name).join(', ')}
                    {table.columns.length > 3 && '...'}
                  </p>
                  <div className="card-footer-row">
                    <Chip label={`${table.rowCount} rows`} size="small" variant="outlined" />
                    <Button size="small" endIcon={<ArrowForward />} className="explore-btn">
                      Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // === RENDER MODE 2: Show Table Detail  ===
  // ==========================================
  const selectedTable = tables.find((t) => t.id === tableId);
  if (!selectedTable) {
    return (
      <div className="error-panel">
        <Typography variant="h6" color="error">Table "{tableId}" not found in this dataset.</Typography>
        <Button variant="outlined" onClick={() => navigate(`/datasets/${datasetId}/tables`)} className="back-btn">
          Back to Tables
        </Button>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "schema":
        return (
          <TableContainer component={Paper} className="content-table-container" variant="outlined">
            <MuiTable>
              <TableHead className="table-head-row">
                <TableRow>
                  <TableCell>Column Name</TableCell>
                  <TableCell>Data Type</TableCell>
                  <TableCell>Key/Index</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedTable.columns.map((col) => (
                  <TableRow key={col.name} className="table-row-item">
                    <TableCell className="code-cell">{col.name}</TableCell>
                    <TableCell>
                      <Chip 
                        label={col.type.toUpperCase()} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        className="type-chip"
                      />
                    </TableCell>
                    <TableCell>{col.name === 'id' ? 'Primary Key' : '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
        );
      
      case "activity":
        return (
          <List className="activity-list">
            <ListItem className="activity-item">
              <ListItemIcon><Update color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Table structure synced" 
                secondary="by Anuj • 2 hours ago" 
              />
            </ListItem>
            <ListItem className="activity-item">
              <ListItemIcon><Dns color="success" /></ListItemIcon>
              <ListItemText 
                primary="Added 3 record entries" 
                secondary="via manual upload • Yesterday" 
              />
            </ListItem>
            <ListItem className="activity-item">
              <ListItemIcon><HelpOutlined color="action" /></ListItemIcon>
              <ListItemText 
                primary="Table created" 
                secondary="by Anuj • 2 days ago" 
              />
            </ListItem>
          </List>
        );

      case "preview":
      default:
        return (
          <TableContainer component={Paper} className="content-table-container" variant="outlined">
            <MuiTable>
              <TableHead className="table-head-row">
                <TableRow>
                  {selectedTable.columns.map((col) => (
                    <TableCell key={col.name}>{col.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedTable.data.map((row, idx) => (
                  <TableRow key={idx} className="table-row-item">
                    {selectedTable.columns.map((col) => (
                      <TableCell key={col.name}>{String(row[col.name])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
        );
    }
  };

  return (
    <div className="tables-workspace">
      {/* Table Header Section */}
      <div className="detail-header-row">
        <div className="title-area">
          <h2 className="table-title">{selectedTable.name}</h2>
          <span className="table-meta">
            Dataset: <strong>{dataset.name}</strong> • Row Count: <strong>{selectedTable.rowCount}</strong>
          </span>
        </div>
        <div className="badge-area">
          <Chip label="ACTIVE TABLE" color="success" size="small" />
          <Chip label={`${selectedTable.columns.length} Columns`} color="info" variant="outlined" size="small" />
        </div>
      </div>

      {/* Render selected tab content */}
      <div className="workspace-tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}
