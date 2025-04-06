type ComponentPillProps = {
    name: string;
    page_number: number;
    removeComponent: (pageNumber: number, component: string) => void;
};

export default function ComponentPill({
    name,
    page_number,
    removeComponent,
}: ComponentPillProps) {
    const first = name.charAt(0).toUpperCase();
    const remaining = name.substring(1).toLowerCase();

    return (
        <li
            key={name}
            onClick={() => removeComponent(page_number, name)}
            className="mx-1 cursor-pointer rounded-full bg-gray-300 px-3 py-2 text-center text-sm first-of-type:ml-0 hover:bg-gray-400"
        >
            {first + remaining}
        </li>
    );
}
