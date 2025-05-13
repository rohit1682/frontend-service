
type ButtonVariant = "primary" | "secondary";

export default interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}