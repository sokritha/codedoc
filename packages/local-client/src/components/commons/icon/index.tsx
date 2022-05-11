const SIZES: IconSize = {
  small: "is-small",
  normal: "is-medium",
  large: "is-large",
};

const Icon: React.FC<IconProps> = ({ icon, size = "small", isActive }) => {
  return (
    <span
      className={`icon ${SIZES[size]} ${
        isActive ? "has-text-primary" : "has-text-grey-light"
      }`}
    >
      <i className={`${icon}`}></i>
    </span>
  );
};

export default Icon;

interface IconProps {
  icon: string;
  size?: string;
  isActive?: boolean;
}

interface IconSize {
  [key: string]: string;
}
