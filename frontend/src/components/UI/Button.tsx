interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}

export default function Button({
     children,
    onClick,
    type = "button",
    className = "btn",
}: ButtonProps) {
    return (
        <button type={type} className={className} onClick={onClick}>
            {children}
        </button>
    );
}