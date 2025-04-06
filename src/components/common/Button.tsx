import { MouseEventHandler } from "../../types";

type ButtonPropTypes = {
    label: string;
    disabled?: boolean;
    onClick: MouseEventHandler;
};

export default function Button({
    label,
    disabled = false,
    onClick,
}: ButtonPropTypes) {
    return (
        <button
            onClick={onClick}
            className="strike mr-4 cursor-pointer border p-2 hover:bg-gray-100 disabled:cursor-default disabled:bg-red-200 disabled:line-through"
            disabled={disabled}
        >
            {label}
        </button>
    );
}
