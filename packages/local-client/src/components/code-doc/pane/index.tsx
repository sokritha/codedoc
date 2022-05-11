import "./index.css";
import React, { MouseEvent, useRef } from "react";

let isResizing: boolean | null = null;

const Pane: React.FC<Props> = ({ newWidth, handleSetWidth, children }) => {
  const dragbarRef = useRef<HTMLDivElement>(null);
  const cbHandleMouseMove = React.useCallback(handleMouseMove, []);
  const cbHandleMouseUp = React.useCallback(handleMouseUp, []);

  const styleWidth = {
    width: `${!dragbarRef.current && newWidth}px`,
  };

  function handleOnMouseDown(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.preventDefault();
    // @ts-ignore
    document.addEventListener("mousemove", cbHandleMouseMove);
    // @ts-ignore
    document.addEventListener("mouseup", cbHandleMouseUp);
    isResizing = true;
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!isResizing) return;

    let minWidth = 220;
    let maxWidth = 400;

    if (
      dragbarRef.current &&
      event.clientX >= minWidth &&
      event.clientX <= maxWidth
    ) {
      handleSetWidth(event.clientX);
      dragbarRef.current.style.width = `${event.clientX}px`;
    }
  }

  function handleMouseUp(event: MouseEvent<HTMLDivElement>) {
    if (!isResizing) {
      return;
    }
    isResizing = false;
    // @ts-ignore
    document.removeEventListener("mousemove", cbHandleMouseMove);
    // @ts-ignore
    document.removeEventListener("mouseup", cbHandleMouseUp);
  }

  return (
    <div
      className={`pane has-background-dark`}
      style={styleWidth}
      ref={dragbarRef}
    >
      {children}
      <div className="dragbar" onMouseDown={handleOnMouseDown} />
    </div>
  );
};

export default Pane;

interface Props {
  newWidth: number;
  handleSetWidth: (width: number) => void;
  children: React.ReactNode;
}
