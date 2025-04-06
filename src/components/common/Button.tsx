import { MouseEventHandler } from "../../types";

type ButtonPropTypes = {
    label: string;
    onClick: MouseEventHandler;
};

export default function Button({ label, onClick }: ButtonPropTypes) {
    return (
        <button
            onClick={onClick}
            className="mr-4 cursor-pointer border p-2 hover:bg-gray-100"
        >
            {label}
        </button>
    );
}
