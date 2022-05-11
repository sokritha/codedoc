import { FileContainer } from "components/code-doc";

export const SIDEBAR_ITEMS: ISidebar[] = [
  {
    id: 1,
    label: "Code",
    icon: "fas fa-code",
    renderComponent: () => {
      return (
        <>
          <FileContainer />
          <FileContainer />
          <FileContainer />
          <FileContainer />
          <FileContainer />
          <FileContainer />
        </>
      );
    },
  },
  {
    id: 2,
    label: "Search",
    icon: "fas fa-search",
    renderComponent: () => {
      return <h1>i am search component</h1>;
    },
  },
  {
    id: 3,
    label: "Settings",
    icon: "fas fa-sliders-h",
    renderComponent: () => {
      return <h1>i am settings component</h1>;
    },
  },
  {
    id: 4,
    label: "GitHub",
    icon: "fab fa-github",
    renderComponent: () => {
      return <h1>i am github component</h1>;
    },
  },
  {
    id: 5,
    label: "Live Demo",
    icon: "fas fa-desktop",
    renderComponent: () => {
      return <h1>i am live demo component</h1>;
    },
  },
  {
    id: 6,
    label: "Chat",
    icon: "fas fa-comments",
    renderComponent: () => {
      return <h1>i am chat component</h1>;
    },
  },
];

const emptyObject: ISidebarItem = {};
export const reduceSidebarItems = (): ISidebarItem => {
  return SIDEBAR_ITEMS.reduce((acc, item, index) => {
    acc[item.id] = item;

    return acc;
  }, emptyObject);
};

export interface ISidebar {
  id: number;
  label: string;
  icon: string;
  renderComponent: () => JSX.Element;
}

export interface ISidebarItem {
  [id: number]: ISidebar | any;
}
