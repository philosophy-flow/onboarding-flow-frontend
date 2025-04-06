import { useParams, Navigate, useNavigate } from "react-router-dom";
import { ReactNode } from "react";

import { usePagesStore, useUserStore } from "../store";
import componentMap from "../components/modules";
import { InputChangeHandler, MouseEvent } from "../types";

export default function FlowModularPage() {
    const { pageNumber } = useParams();
    const { pages } = usePagesStore();
    const { updateUser, userData } = useUserStore();
    const navigate = useNavigate();

    const currentPage = pages[parseInt(pageNumber!) - 2];
    const pageComponentIDs = currentPage?.components.map(
        (c) => c.component_name,
    );

    const numPages = pages.length + 1;
    const overflow = numPages < parseInt(pageNumber!);

    const handleInputChange: InputChangeHandler = async (
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

    const handlePrevious = (e: MouseEvent) => {
        e.preventDefault();

        const prevPage = parseInt(pageNumber!) - 1;
        navigate(`/flow/${prevPage}`);
    };

    const handleNext = (e: MouseEvent) => {
        e.preventDefault();

        const nextPage = parseInt(pageNumber!) + 1;

        navigate(`/flow/${nextPage}`);
    };

    return overflow ? (
        <Navigate to="/data" />
    ) : (
        <section>
            <h2 className="text-2xl underline">{currentPage?.title}</h2>

            {pageComponentIDs.map((id, index) => (
                <div key={index}>{generateComponent(id)}</div>
            ))}

            <div>
                <button
                    className="mt-4 mr-4 cursor-pointer border p-2"
                    onClick={handlePrevious}
                >
                    Previous
                </button>
                <button
                    className="mt-4 mr-4 cursor-pointer border p-2"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </section>
    );
}
