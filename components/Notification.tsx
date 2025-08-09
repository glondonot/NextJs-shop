"use client";

import { useEffect } from "react";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

export default function NotificationComponent({ notification, onRemove }: NotificationProps) {
  const { id, type, title, message, duration = 4000 } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
      default:
        return "ℹ";
    }
  };

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        <div className="notification-icon">
          {getIcon()}
        </div>
        <div className="notification-text">
          <div className="notification-title">{title}</div>
          {message && <div className="notification-message">{message}</div>}
        </div>
        <button 
          className="notification-close"
          onClick={() => onRemove(id)}
          aria-label="Cerrar notificación"
        >
          ×
        </button>
      </div>
    </div>
  );
}