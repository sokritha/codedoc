import "./index.css";
import { Button, Divider, Icon } from "components/commons";
import React, { useState } from "react";
import { ISidebar } from "pages/code-doc/sidebar-items";

const Sidebar: React.FC<SidebarProps> = ({
  items,
  isPaneOpen,
  handleOnToggle,
}) => {
  const [isButtonOpen, setIsButtonOpen] = useState(0);

  const toggle = (index: number) => {
    // @ts-ignore
    if (isPaneOpen === index) {
      // if the pane already opened, close it
      setIsButtonOpen(0);
      return handleOnToggle(0);
    }

    setIsButtonOpen(index);
    handleOnToggle(index);
  };

  return (
    <nav className="sidebar has-background-dark">
      <div className="sidebar-top">
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <Button
              variant="dark"
              size="normal"
              isActive={isPaneOpen !== 0 && isButtonOpen === item.id}
              handleOnAction={() => {
                toggle(item.id);
              }}
            >
              <Icon
                icon={item.icon}
                size="large"
                isActive={isPaneOpen !== 0 && isButtonOpen === item.id}
              />
            </Button>
            <Divider size="small" />
          </React.Fragment>
        ))}
      </div>
      <div className="sidebar-bottom">
        <figure className="image is-32x32">
          <img
            className="is-rounded"
            src="https://bulma.io/images/placeholders/128x128.png"
          />
        </figure>
      </div>
    </nav>
  );
};

export default Sidebar;

interface SidebarProps {
  items: ISidebar[];
  isPaneOpen: number;
  handleOnToggle: (active: number) => void;
}
