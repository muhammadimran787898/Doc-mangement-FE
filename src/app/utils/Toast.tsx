import React, { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

type ToastType = "success" | "error" | "warning";
type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

interface ToastProps {
  title: string;
  description: string;
  type: ToastType;
  position?: ToastPosition;
}

const showToast = (
  type: ToastType,
  message: string,
  title: string,
  position: ToastPosition = "top-right"
): void => {
  toast({
    title: title || getTitle(type),
    description: message,
    type,
    position,
    duration: 5000, // Duration in milliseconds
    style: getToastStyle(type), // Apply background color based on type
    close: true, // Enable close button
  });
};

const getTitle = (type: ToastType): string => {
  switch (type) {
    case "success":
      return "Success";
    case "error":
      return "Error";
    case "warning":
      return "Warning";
    default:
      return "";
  }
};

const getToastStyle = (type: ToastType): React.CSSProperties => {
  switch (type) {
    case "success":
      return { backgroundColor: "#4caf50", color: "#fff" }; // Green
    case "error":
      return { backgroundColor: "#f44336", color: "#fff" }; // Red
    case "warning":
      return { backgroundColor: "#ff9800", color: "#fff" }; // Orange
    default:
      return {};
  }
};

const Toast = {
  success: (
    message: string,
    title: string = "Success",
    position?: ToastPosition
  ) => showToast("success", message, title, position),
  error: (message: string, title: string = "Error", position?: ToastPosition) =>
    showToast("error", message, title, position),
  warning: (
    message: string,
    title: string = "Warning",
    position?: ToastPosition
  ) => showToast("warning", message, title, position),
};

interface ToastProviderWrapperProps {
  children: ReactNode;
}

const ToastProviderWrapper: React.FC<ToastProviderWrapperProps> = ({
  children,
}) => (
  <div>
    <Toaster />
    {children}
  </div>
);

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className="toast-close-button absolute top-2  right-2 cursor-pointer rounded-md"
    onClick={onClick}
  >
    ×
  </button>
);

const toast = ({
  title,
  description,
  type,
  position,
  duration,
  style,
  close,
}: {
  title: string;
  description: string;
  type: ToastType;
  position: ToastPosition;
  duration: number;
  style: React.CSSProperties;
  close?: boolean;
}) => {
  const id = Math.random().toString(36).substr(2, 9);
  const element = (
    <div
      key={id}
      className="relative p-4 border rounded flex justify-center"
      style={style}
    >
      {close && <CloseButton onClick={() => removeToast(id)} />}
      <div className="toast-content">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );

  addToast({ element, id, duration, position });
};

const addToast = ({
  element,
  id,
  duration,
  position,
}: {
  element: JSX.Element;
  id: string;
  duration: number;
  position: ToastPosition;
}) => {
  // Logic to add the toast to your UI with the given duration and position
  // This should also handle the automatic removal after duration
};

const removeToast = (id: string) => {
  // Logic to remove the toast from your UI
};

export { Toast, ToastProviderWrapper };
