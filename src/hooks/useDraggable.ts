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

    let newX = currentPos.current.x + dx;
    let newY = currentPos.current.y + dy;

    // --- Boundary Logic ---
    // We prevent it from going too far left (off-screen) or too far right
    // Simple constraint: keep it within a reasonable range of its origin
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Limit horizontal: Can't drag more than 90% of screen width to the left
    newX = Math.max(newX, -viewportWidth * 0.9);
    newX = Math.min(newX, 100); // Small buffer to the right
    
    // Limit vertical: Keep it within the screen
    newY = Math.max(newY, -viewportHeight * 0.5);
    newY = Math.min(newY, viewportHeight * 0.5);

    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const onMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);

    // --- Magnetic Snapping ---
    // If we are close to the original right edge, snap back to 0
    let finalX = position.x;
    let finalY = position.y;

    if (Math.abs(position.x) < 60) {
      finalX = 0;
    }
    if (Math.abs(position.y) < 60) {
      finalY = 0;
    }

    const snappedPos = { x: finalX, y: finalY };
    setPosition(snappedPos);
    currentPos.current = snappedPos;
    
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
