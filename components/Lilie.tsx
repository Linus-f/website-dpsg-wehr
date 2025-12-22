export default function Lilie({ color } : { color?: string}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={color || "currentColor"}
            viewBox="0 0 182.004 186.404"
            className="w-full h-full"
            width="1em"
            height="1em"
            aria-hidden="true"
        >
            <use href="#icon-lilie" />
        </svg>
    );
}