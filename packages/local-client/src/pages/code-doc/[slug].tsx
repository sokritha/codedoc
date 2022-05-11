import { useState, useMemo } from "react";
import { CellList, Pane } from "components/code-doc";
import { Sidebar } from "components/commons";
import "./[slug].css";
import { SIDEBAR_ITEMS, reduceSidebarItems } from "./sidebar-items";

const CodeDocPage = () => {
  const [isPaneOpen, setIsPaneOpen] = useState<number>(0); // 0 means no pane is open, otherwise it's the id of the pane
  const [newWidth, setNewWidth] = useState<number>(300);

  const paneElements = useMemo(() => {
    return reduceSidebarItems();
  }, []);

  const isPaneActiveStyle = useMemo(() => {
    return {
      marginLeft: `${newWidth + 20}px`,
    };
  }, [newWidth]);

  return (
    <div className="code-doc-container">
      <aside className="code-doc-sidebar">
        <Sidebar
          handleOnToggle={setIsPaneOpen}
          isPaneOpen={isPaneOpen}
          items={SIDEBAR_ITEMS}
        />
        {isPaneOpen
          ? paneElements[isPaneOpen] && (
              <Pane handleSetWidth={setNewWidth} newWidth={newWidth}>
                {paneElements[isPaneOpen].renderComponent()}
              </Pane>
            )
          : null}
      </aside>
      <div
        className="code-doc-content"
        style={isPaneOpen !== 0 ? isPaneActiveStyle : {}}
      >
        <CellList />
      </div>
    </div>
  );
};

export default CodeDocPage;
