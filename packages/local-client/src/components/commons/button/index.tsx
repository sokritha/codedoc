const VARIANTS: VariantObjectKeys = {
  primary: "is-primary",
  secondary: "is-light",
  success: "is-success",
  danger: "is-danger",
  dark: "is-dark",
};

const SIZES: SizeObjectKeys = {
  small: "is-small",
  normal: "is-normal",
  meduim: "is-medium",
  large: "is-large",
};

const Button: React.FC<ButtonProps> = ({
  size = "small",
  variant = "primary",
  isActive,
  handleOnAction,
  children,
}) => {
  return (
    <button
      className={`button ${SIZES[size]} ${VARIANTS[variant]} ${
        isActive && "is-active"
      }`}
      onClick={handleOnAction}
    >
      {children}
    </button>
  );
};

export default Button;

interface VariantObjectKeys {
  [key: string]: string;
}

interface SizeObjectKeys {
  [key: string]: string;
}

interface ButtonProps {
  size?: string;
  variant?: string;
  isActive?: boolean;
  handleOnAction: () => void;
  children: React.ReactNode;
}
