import { MouseEventHandler } from "react";

type ComponentPillProps = {
    name: string;
    onClick: MouseEventHandler;
};

export default function ComponentPill({ name, onClick }: ComponentPillProps) {
    return (
        <li
            key={name}
            onClick={onClick}
            className="mx-1 cursor-pointer rounded-full bg-gray-300 px-3 py-2 text-center text-sm first-of-type:ml-0 hover:bg-gray-400"
        >
            {name}
        </li>
    );
}
