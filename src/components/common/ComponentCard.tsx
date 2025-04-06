import { PageData } from "../../api";

type ComponentCardProps = {
    name: string;
    pages: PageData[];
    addComponent: (pageNumber: number, component: string) => void;
};

export default function ComponentCard({
    name,
    pages,
    addComponent,
}: ComponentCardProps) {
    const first = name.charAt(0).toUpperCase();
    const remaining = name.substring(1).toLowerCase();
    const formattedName = first + remaining;

    return (
        <li className="mb-4 w-50 rounded border bg-gray-300 px-4 py-2 text-center">
            <p>{formattedName}</p>
            <select
                onChange={(e) => addComponent(parseInt(e.target.value), name)}
                className="m-1 cursor-pointer border p-1"
            >
                <option value="">Select Page</option>
                {pages.map((page) => (
                    <option value={page.page_number} key={page.page_number}>
                        Page {page.page_number}
                    </option>
                ))}
            </select>
        </li>
    );
}
