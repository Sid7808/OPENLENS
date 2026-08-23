// file:///c:/Users/ansuj/OpenLens/frontend/src/components/datasets/DatasetFileUploadDrawer.tsx

import React from "react";
import { Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import "./DatasetFileUploadDrawer.scss";

interface DatasetFileUploadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatasetFileUploadDrawer = React.forwardRef<HTMLDivElement, DatasetFileUploadDrawerProps>(
  ({ isOpen, onClose }, ref) => {
    return (
      <div ref={ref}>
        {/* Backdrop Overlay */}
        {isOpen && (
          <div 
            className="add-file-backdrop" 
            onClick={onClose} 
          />
        )}

        {/* Right-Side Add File Drawer */}
        <div className={`add-file-drawer ${isOpen ? "open" : ""}`}>
          <div className="drawer-header">
            <h3 className="drawer-title">Add File</h3>
            <IconButton 
              onClick={onClose} 
              size="small" 
              className="close-btn"
              title="Close drawer"
            >
              <Close fontSize="small" />
            </IconButton>
          </div>
          <div className="drawer-content">
            <div className="form-group">
              <label htmlFor="file-name-input">File Name</label>
              <input 
                id="file-name-input" 
                type="text" 
                placeholder="Enter file name..." 
              />
            </div>
            <div className="upload-zone">
              <p>Drag and drop your file here, or click to browse</p>
            </div>
          </div>
          <div className="drawer-footer">
            <Button 
              variant="outlined" 
              onClick={onClose}
              size="small"
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={onClose}
              size="small"
              sx={{ ml: 1.5 }}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

DatasetFileUploadDrawer.displayName = "DatasetFileUploadDrawer";
