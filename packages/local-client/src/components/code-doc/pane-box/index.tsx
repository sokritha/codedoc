import "./index.css";

const PaneBox: React.FC<PaneBoxProps> = ({ title, children }) => {
  return (
    <section className="pane-box">
      <div className="pane-title">{title}</div>
      <div className="pane-content">{children}</div>
    </section>
  );
};

export default PaneBox;

interface PaneBoxProps {
  title: string;
  children: React.ReactNode;
}
