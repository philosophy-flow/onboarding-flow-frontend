import { useNavigate } from "react-router-dom";

import { MouseEvent } from "../types";
import { usePagesStore } from "../store";
import PageCard from "../components/common/PageCard";
import Button from "../components/common/Button";
import ComponentCard from "../components/common/ComponentCard";

export default function AdminPage() {
    const navigate = useNavigate();
    const { pages, updatePage, unusedComponents, getUnusedComponents } =
        usePagesStore();

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
            await getUnusedComponents();
        }
    };

    const addComponent = async (page_number: number, component: string) => {
        const additionPage = pages.find(
            (page) => page.page_number === page_number,
        );

        if (additionPage) {
            additionPage.components.push({ component_name: component });

            await updatePage(additionPage);
            await getUnusedComponents();
        }
    };

    return (
        <div>
            <h2 className="text-2xl underline">Admin</h2>
            <div className="mt-8 flex pb-6">
                <div className="sidebar border-r-2 pr-8">
                    <h3 className="text-xl">Components</h3>
                    <ul className="mt-4">
                        {unusedComponents.map((component) => (
                            <ComponentCard
                                key={component.component_name}
                                name={component.component_name}
                                pages={pages}
                                addComponent={addComponent}
                            />
                        ))}
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
