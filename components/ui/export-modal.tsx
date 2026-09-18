// src/components/ui/export-modal.tsx

'use client'

import { useState, useEffect } from "react"

export type ExportFormat = 'PDF' | 'FHIR JSON' | 'CSV' | 'Markdown';

export interface ExportConfig {
  format: ExportFormat;
  comments: boolean;
  pageFormat: string;
  scalePercent: string;
  anonymize: boolean;
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (config: ExportConfig) => void;
  allowedFormats?: ExportFormat[];
  showAnonymizeToggle?: boolean;
  showCommentsToggle?: boolean;
}

export function ExportModal({ 
  isOpen, 
  onClose, 
  onExport,
  allowedFormats = ['PDF', 'FHIR JSON', 'CSV'],
  showAnonymizeToggle = false,
  showCommentsToggle = true
}: ExportModalProps) {
  
  const [exportFormat, setExportFormat] = useState<ExportFormat>(allowedFormats[0] || 'PDF');
  const [exportComments, setExportComments] = useState(false);
  const [pageFormat, setPageFormat] = useState('Letter');
  const [scalePercent, setScalePercent] = useState('100');
  const [anonymize, setAnonymize] = useState(true);

  // Sync format if allowedFormats changes dynamically
  useEffect(() => {
    if (!allowedFormats.includes(exportFormat)) {
      setExportFormat(allowedFormats[0]);
    }
  }, [allowedFormats, exportFormat]);

  // Reset anonymize toggle to true every time the modal opens for safety
  useEffect(() => {
    if (isOpen) {
      setAnonymize(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 cursor-default" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-[340px] p-6 border border-gray-100 cursor-default" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-4">
          
          {/* Format Selector */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Export format</span>
            <select 
              className="text-sm font-medium bg-transparent border-none outline-none cursor-pointer focus:ring-0 pr-0 text-right"
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
            >
              {allowedFormats.map(fmt => (
                <option key={fmt} value={fmt}>{fmt}</option>
              ))}
            </select>
          </div>

          {/* Anonymize Toggle (Only shown if requested by parent) */}
          {showAnonymizeToggle && (
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Anonymize data</span>
                {!anonymize && <span className="text-[10px] text-alos-green font-medium">Protected Health Information will be visible</span>}
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={anonymize} onChange={(e) => setAnonymize(e.target.checked)} />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-alos-green-light"></div>
              </label>
            </div>
          )}

          {/* Global Comments Toggle */}
          {showCommentsToggle && exportFormat !== 'CSV' && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Export comments</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={exportComments} onChange={(e) => setExportComments(e.target.checked)} />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-alos-green-light"></div>
              </label>
            </div>
          )}

          {/* PDF-Specific Settings */}
          {exportFormat === 'PDF' && (
            <div className="pt-4 mt-2 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Page Format</span>
                <select 
                  className="text-sm font-medium bg-transparent border-none outline-none cursor-pointer focus:ring-0 pr-0"
                  value={pageFormat}
                  onChange={(e) => setPageFormat(e.target.value)}
                >
                  <option value="Letter">Letter</option>
                  <option value="A4">A4</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Scale Percent</span>
                <input 
                  type="number" 
                  className="w-16 text-sm text-right font-medium border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 cursor-text"
                  value={scalePercent}
                  onChange={(e) => setScalePercent(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-2">
            <button 
              onClick={onClose}
              className="border border-gray-200 text-primary-dark hover:bg-cream-light rounded-[5px] px-4 py-1.5 text-sm text-gray-400 hover:text-gray-600 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={() => onExport({ format: exportFormat, comments: exportComments, pageFormat, scalePercent, anonymize })}
              className="bg-alos-green-light text-alos-green hover:text-alos-green-light hover:bg-alos-green text-sm font-medium px-4 py-1.5 rounded-[5px] transition-colors shadow-sm cursor-pointer"
            >
              Export
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}