'use client';

import React, { useEffect } from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in border-4 border-green-600">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 text-center">
          {title}
        </h2>

        <div className="mb-6">{children}</div>

        {showCloseButton && (
          <div className="flex justify-center">
            <Button onClick={onClose} variant="primary">
              Tutup
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
