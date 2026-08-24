import React, { useState, useEffect, useRef } from "react";
import {IconButton}from "@mui/material";
import{ Close } from "@mui/icons-material";
import "./AddDatasetModal.scss";

interface AddDatasetModalProps{
    isOpen: boolean;
    onClose: () => void;
    onAdd: ( name: string, description: string) => void;
    prepDurationMs?: number; //Duration of the preparation screen (default is 2000ms)

}

export default function AddDatasetModal({
    isOpen,
    onClose,
    onAdd,
    prepDurationMs = 2000,

}: AddDatasetModalProps) {
    const [step, setStep] = useState<"preparing" | "form">("preparing");
    const [name , setName ] = useState("");
    const [description, setDescription] = useState("");
    const nameInputRef = useRef<HTMLInputElement>(null);


    //Reset the flow states when the modal is opened
    useEffect(() => {
    if (isOpen) {
      setStep("preparing");
      setName("");
      setDescription("");
      const timer = setTimeout(() => {
        setStep("form");
      }, prepDurationMs);
      return () => clearTimeout(timer);
    }
  }, [isOpen, prepDurationMs]);
  // Auto-focus the Name input once the form renders
  useEffect(() => {
    if (isOpen && step === "form") {
      const focusTimer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 80);
      return () => clearTimeout(focusTimer);
    }
  }, [isOpen, step]);
  if (!isOpen) return null;
  const isNameEmpty = !name.trim();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNameEmpty) {
      onAdd(name, description);
    }
  };
  return (
    <div className="add-dataset-modal-overlay" onClick={onClose}>
      <div 
        className="add-dataset-modal-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header Section */}
        <div className="modal-header">
          <h3 id="modal-title" className="modal-title">Add dataset</h3>
          <IconButton 
            onClick={onClose} 
            size="small" 
            className="close-btn"
            aria-label="Close modal"
          >
            <Close fontSize="small" />
          </IconButton>
        </div>
        {/* Step 1: Preparing/Loading Screen (Screenshot 1) */}
        {step === "preparing" && (
          <div className="modal-body step-preparing">
            <div className="spinner-container">
              <div className="spinner" />
            </div>
            <p className="prep-message">
              We are preparing a secure, isolated environment for you.
            </p>
          </div>
        )}
        {/* Step 2: Input Form Screen (Screenshot 2) */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="modal-body step-form">
              {/* Dataset Name */}
              <div className="form-group">
                <label htmlFor="dataset-name">
                  Name <span className="required-label">(Required)</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="dataset-name"
                    ref={nameInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={200}
                    placeholder=""
                    autoComplete="off"
                  />
                  <span className="char-counter">{name.length}/200</span>
                </div>
              </div>
              {/* Dataset Description */}
              <div className="form-group">
                <label htmlFor="dataset-description">Description</label>
                <div className="textarea-wrapper">
                  <textarea
                    id="dataset-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={800}
                    placeholder="Briefly describe the purpose, source, and any key details of the dataset."
                    rows={4}
                  />
                  <span className="char-counter">{description.length}/800</span>
                </div>
              </div>
            </div>
            {/* Footer with Pill-Shaped Button */}
            <div className="modal-footer">
              <button 
                type="submit" 
                className={`add-btn ${isNameEmpty ? "disabled" : ""}`}
                disabled={isNameEmpty}
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

