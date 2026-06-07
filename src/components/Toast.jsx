import { useEffect } from "react";
import { Trash2, X } from "lucide-react";

function Toast({ message, onUndo, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-wrapper">
      <div className="toast">
        <div className="toast-icon">
          <Trash2 size={16} />
        </div>
        <div className="toast-text">
          <strong>Задача удалена</strong>
          <span>{message}</span>
        </div>
        <button className="toast-undo" onClick={onUndo}>Отменить</button>
        <button className="toast-close" onClick={onClose} aria-label="Закрыть">
          <X size={16} />
        </button>
      </div>
      <div className="toast-progress">
        <div className="toast-progress-fill" />
      </div>
    </div>
  );
}

export default Toast;