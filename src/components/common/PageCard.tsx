import { PageData } from "../../api";
import ComponentPill from "./ComponentPill";

type PageCardProps = {
    page: PageData;
    removeComponent: (pageNumber: number, component: string) => void;
};

export default function PageCard({ page, removeComponent }: PageCardProps) {
    const componentNames = page.components.map((obj) => obj.component_name);

    return (
        <li className="mb-3 flex max-w-md items-center rounded border bg-gray-50 p-3 text-lg">
            <p className="mr-4">Page {page.page_number} |</p>
            <ul className="flex items-center">
                {componentNames.map((component) => (
                    <ComponentPill
                        key={component}
                        name={component}
                        page_number={page.page_number}
                        removeComponent={removeComponent}
                    />
                ))}
            </ul>
        </li>
    );
}
