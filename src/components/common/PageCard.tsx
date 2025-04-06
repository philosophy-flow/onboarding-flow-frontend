import { PageData } from "../../api";
import ComponentPill from "./ComponentPill";

type PageCardProps = {
    page: PageData;
};

export default function PageCard({ page }: PageCardProps) {
    const componentNames = page.components.map((obj) => {
        const first = obj.component_name.charAt(0).toUpperCase();
        const remaining = obj.component_name.substring(1).toLowerCase();
        return first + remaining;
    });

    const removeComponent = () => {
        console.log("removing component ..");

        // remove component from page, send updated page to db (this auto updates component)
        // fetch latest list of unused components, this will update UI
    };

    return (
        <li className="mb-3 flex max-w-md items-center rounded border bg-gray-50 p-3 text-lg">
            <p className="mr-4">Page {page.page_number} |</p>
            <ul className="flex items-center">
                {componentNames.map((component) => (
                    <ComponentPill
                        key={component}
                        name={component}
                        onClick={removeComponent}
                    />
                ))}
            </ul>
        </li>
    );
}
