export default interface TextProps {
    id: string;
    legendText : string;
    placeholder? : string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    bottomText? : string;
    hasError?: boolean;
    errorMessage?: string;
    className?: string;
    isTextarea?: boolean;
    customInput?: React.ReactNode;
}