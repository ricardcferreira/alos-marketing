'use client'

import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  // 👇 ADD THESE NEW PROPS
  title?: string;
  description?: string;
}

export default function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isDeleting,
  // 👇 Default values (Backwards compatible with your Screening tool)
  title = "Delete Screening Record",
  description = "Are you sure you want to delete this record? This action cannot be undone and will permanently remove the data from the patient's history."
}: Props) {
  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else setTimeout(() => setVisible(false), 200);
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      
      {/* 1. Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={!isDeleting ? onClose : undefined} 
      />

      {/* 2. The Modal Box */}
      <div className={`relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-2xl transition-all duration-200 scale-100 ${isOpen ? "scale-100" : "scale-95"}`}>
        
        {!isDeleting && (
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                <X size={20} />
            </button>
        )}

        <div className="flex flex-col items-center text-center sm:items-start sm:text-left sm:flex-row sm:gap-4">
          
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <div className="mt-3 sm:mt-0">
            {/* 👇 USE THE DYNAMIC TITLE */}
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
              {title}
            </h2>
            <div className="mt-2">
              {/* 👇 USE THE DYNAMIC DESCRIPTION */}
              <p className="text-sm text-gray-500">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex w-full justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70 sm:w-auto items-center gap-2"
          >
            {isDeleting ? (
                <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Deleting...
                </>
            ) : (
                "Delete Record"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}