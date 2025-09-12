import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M9.5 2.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z" />
            <path d="M12 12a5 5 0 0 0-5 5h10a5 5 0 0 0-5-5Z" />
            <path d="M12 2.5c-2.76 0-5 2.24-5 5v1.5c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5V7.5c0-2.76-2.24-5-5-5Z" />
            <path d="M12 12c-3.13 0-5.8 1.9-6.73 4.5" />
            <path d="M18.73 16.5c-.93-2.6-3.6-4.5-6.73-4.5" />
            <path d="M15.5 21.5a2.5 2.5 0 1 0-7.06-.06" />
        </svg>
    );
}
