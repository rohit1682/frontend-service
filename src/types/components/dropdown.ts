export default interface DropdownProps {
    id: string;
    legendText: string;
    htmlFor: string;
    value?: string;
    onChange: (value: string) => void;
    children: string[];
    className?: string;
    bottomText?: string;
    hasError?: boolean;
    errorMessage?: string;
}

