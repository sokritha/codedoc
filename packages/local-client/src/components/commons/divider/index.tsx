interface DividerProps {
  size: string;
}

const Divider: React.FC<DividerProps> = ({ size }) => {
  if (size === "small") return <div style={{ margin: "5px" }} />;
  if (size === "medium") return <div style={{ margin: "10px" }} />;
  if (size === "large") return <div style={{ margin: "15px" }} />;
  return <div style={{ margin: "10px;" }} />;
};

export default Divider;
