import React from "react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function Modal({ open, onClose, children, className }: ModalProps) {
  return (
    <div
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-50 !m-0 flex items-center justify-center transition-colors",
        open ? "visible bg-black/20" : "invisible",
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "rounded-xl bg-white p-6 shadow transition-all",
          open ? "scale-100 opacity-100" : "scale-125 opacity-0",
          className,
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-1 top-1 rounded-lg bg-white p-1 text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-600"
        >
          <XIcon className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
