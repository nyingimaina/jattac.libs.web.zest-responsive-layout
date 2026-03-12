import { useState, useCallback, useRef, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export const useDraggable = (active: boolean = true) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef<Position>({ x: 0, y: 0 });
  const currentPos = useRef<Position>({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;

    const newPos = {
      x: currentPos.current.x + dx,
      y: currentPos.current.y + dy,
    };

    setPosition(newPos);
  }, [isDragging]);

  const onMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    currentPos.current = position;
    
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [isDragging, position, onMouseMove]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!active) return;
    
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [active, onMouseMove, onMouseUp]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const resetPosition = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    currentPos.current = { x: 0, y: 0 };
  }, []);

  return {
    position,
    isDragging,
    dragHandleProps: {
      onMouseDown,
      style: { cursor: active ? (isDragging ? "grabbing" : "grab") : "default" }
    },
    resetPosition
  };
};
