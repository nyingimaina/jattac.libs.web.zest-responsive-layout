interface Position {
    x: number;
    y: number;
}
export declare const useDraggable: (active?: boolean) => {
    position: Position;
    isDragging: boolean;
    dragHandleProps: {
        onMouseDown: (e: React.MouseEvent) => void;
        style: {
            cursor: string;
        };
    };
    resetPosition: () => void;
};
export {};
