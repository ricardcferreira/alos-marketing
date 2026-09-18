'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function UnsavedChangesModal({ isOpen, onCancel, onConfirm }: UnsavedChangesModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] bg-gray-900/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
        
        <div className="p-6 border-b border-gray-100 py-4">
          <p className="text-xl tracking-tighter font-semibold text-gray-900 mb-2">Unsaved changes</p>
          <span><p className="text-sm text-gray-500 leading-relaxed">
            You have unsaved clinical data. If you leave this page now, your current progress will be lost. Are you sure you want to leave?
          </p></span>
        </div>

        <div className="p-6 flex items-center justify-end gap-3">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 text-sm bg-alos-green-light text-alos-green hover:bg-alos-green hover:text-white disabled:bg-alos-green-light disabled:text-alos-green disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-[5px] transition-colors"
          >
            Stay on page
          </button>
          <button 
            onClick={onConfirm} 
            className="px-5 py-2 bg-alos-yellow text-alos-brown hover:bg-alos-brown hover:text-white text-sm font-medium rounded-[5px] transition-colors"
          >
            Leave without saving
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}