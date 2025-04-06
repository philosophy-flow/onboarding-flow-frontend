import { useNavigate } from "react-router-dom";

import { MouseEvent } from "../types";
import { usePagesStore } from "../store";
import PageCard from "../components/common/PageCard";
import Button from "../components/common/Button";

export default function AdminPage() {
    const navigate = useNavigate();
    const { pages, updatePage } = usePagesStore();

    const handleNavigate = (e: MouseEvent) => {
        e.preventDefault();
        navigate("/flow/1");
    };

    const removeComponent = async (page_number: number, component: string) => {
        const removalPage = pages.find(
            (page) => page.page_number === page_number,
        );

        if (removalPage) {
            if (removalPage.components.length <= 1) {
                return;
            }

            removalPage!.components = removalPage?.components.filter(
                (comp) => comp.component_name !== component,
            );

            await updatePage(removalPage);
        }
    };

    return (
        <div>
            <h2 className="text-2xl underline">Admin</h2>
            <div className="mt-8 flex pb-6">
                <div className="sidebar border-r-2 pr-8">
                    <h3 className="text-xl">Components</h3>
                    <ul className="mt-4">
                        <li className="mb-4 w-50 rounded border bg-gray-300 px-4 py-2 text-center">
                            <p>Component 1</p>
                            <select className="m-1 cursor-pointer border p-1">
                                <option value="">Select Page</option>
                                <option value="">Page 2</option>
                                <option value="">Page 3</option>
                            </select>
                        </li>
                        <li className="mb-4 w-50 rounded border bg-gray-300 px-4 py-2 text-center">
                            <p>Component 2</p>
                            <select className="m-1 cursor-pointer border p-1">
                                <option value="">Select Page</option>
                                <option value="">Page 2</option>
                                <option value="">Page 3</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div className="w-full pl-8">
                    <h3 className="text-xl">Pages</h3>
                    <ul className="mt-4">
                        {pages.map((page) => (
                            <PageCard
                                page={page}
                                removeComponent={removeComponent}
                                key={page.page_number}
                            />
                        ))}
                    </ul>
                    <p className="text-sm">
                        Click a component to remove it from a page.
                    </p>
                    <p className="text-sm">
                        Note — each page must have at least one component.
                    </p>
                </div>
            </div>
            <Button label="Back to Flow" onClick={handleNavigate} />
        </div>
    );
}
