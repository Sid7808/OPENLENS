interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    style?: React.CSSProperties;
}

export default function Button({
     children,
    onClick,
    type = "button",
    className = "btn",
    style,
}: ButtonProps) {
    return (
        <button type={type} className={className} onClick={onClick} style={style}>
            {children}
        </button>
    );
}