import { useParams, Navigate } from "react-router-dom";
import { ReactNode } from "react";

import { usePagesStore, useUserStore } from "../store";
import componentMap from "../components/modules";

export default function FlowModularPage() {
    const { pageNumber } = useParams();
    const { pages } = usePagesStore();
    const { updateUser, userData } = useUserStore();

    const currentPage = pages[parseInt(pageNumber!) - 2];
    const pageComponentIDs = currentPage?.components.map(
        (c) => c.component_name,
    );

    const numPages = pages.length + 1;
    const overflow = numPages > 1 && numPages < parseInt(pageNumber!);

    const handleInputChange = async (
        inputName: string,
        inputValue: string | number,
    ) => {
        await updateUser(userData!.username, { [inputName]: inputValue });
    };

    const generateComponent = (componentID: string): ReactNode => {
        const Component =
            componentMap[componentID as keyof typeof componentMap];
        return Component ? (
            <Component handleInputChange={handleInputChange} />
        ) : null;
    };

    return overflow ? (
        <Navigate to="/flow/1" />
    ) : (
        <section>
            <h2 className="text-2xl underline">{currentPage?.title}</h2>
            {pageComponentIDs.map((id, index) => (
                <div key={index}>{generateComponent(id)}</div>
            ))}
        </section>
    );
}
