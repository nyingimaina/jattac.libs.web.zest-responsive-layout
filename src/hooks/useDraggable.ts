import { useState, useCallback, useRef, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export const useDraggable = (active: boolean = true) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const startPos = useRef<Position>({ x: 0, y: 0 });
  const currentPos = useRef<Position>({ x: 0, y: 0 });
  const latestPos = useRef<Position>({ x: 0, y: 0 });

  // Update latestPos ref whenever position state changes
  useEffect(() => {
    latestPos.current = position;
  }, [position]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;

    let newX = currentPos.current.x + dx;
    let newY = currentPos.current.y + dy;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    newX = Math.max(newX, -viewportWidth + 100); 
    newX = Math.min(newX, 100); 
    
    newY = Math.max(newY, -viewportHeight * 0.1);
    newY = Math.min(newY, viewportHeight * 0.8);

    setPosition({ x: newX, y: newY });
  }, []);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);

    let finalX = latestPos.current.x;
    let finalY = latestPos.current.y;

    const SNAP_THRESHOLD = 60;

    if (Math.abs(finalX) < SNAP_THRESHOLD) {
      finalX = 0;
    } 
    else if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      if (rect.left < SNAP_THRESHOLD) {
        finalX = finalX - rect.left;
      }
    }

    if (Math.abs(finalY) < SNAP_THRESHOLD) {
      finalY = 0;
    }

    const snappedPos = { x: finalX, y: finalY };
    setPosition(snappedPos);
    currentPos.current = snappedPos;
    
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!active) return;
    
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [active, onMouseMove, onMouseUp]);

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
    resetPosition,
    elementRef
  };
};
