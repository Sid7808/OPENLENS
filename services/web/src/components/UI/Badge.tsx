interface BadgeProps {
    status: "Active" | "Archived";
}

export default function Badge({ status }: BadgeProps) {
    return (
        <span className={status === "Active" ? "badge-active" : "badge-archived"}>
            {status}
        </span>
    );
}