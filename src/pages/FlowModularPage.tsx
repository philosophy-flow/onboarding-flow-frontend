import { useParams, Navigate, useNavigate } from "react-router-dom";
import { ReactNode, Fragment, useEffect } from "react";

import { usePagesStore, useUserStore } from "../store";
import componentMap from "../components/modules";
import { InputChangeHandler, MouseEvent } from "../types";
import Button from "../components/common/Button";

export default function FlowModularPage() {
    const { pageNumber } = useParams();
    const { pages } = usePagesStore();
    const { updateUser, userData, getUserLoading } = useUserStore();
    const navigate = useNavigate();

    const currentPage = pages[parseInt(pageNumber!) - 2];
    const pageComponentIDs = currentPage?.components.map(
        (c) => c.component_name,
    );

    const numPages = pages.length + 1;
    const overflow = numPages < parseInt(pageNumber!);

    useEffect(() => {
        const updateUserPage = async () => {
            updateUser(userData!.username, {
                current_page: parseInt(pageNumber!),
            });
        };
        updateUserPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

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

    const handlePrevious = async (e: MouseEvent) => {
        e.preventDefault();

        const prevPage = parseInt(pageNumber!) - 1;
        navigate(`/flow/${prevPage}`);
    };

    const handleNext = async (e: MouseEvent) => {
        e.preventDefault();

        const nextPage = parseInt(pageNumber!) + 1;
        navigate(`/flow/${nextPage}`);
    };

    return overflow ? (
        <Navigate to="/data" />
    ) : (
        !getUserLoading && (
            <>
                <h3 className="mb-4 text-xl">
                    {currentPage.title || `Page ${currentPage.page_number}`}
                </h3>

                {pageComponentIDs.map((id, index) => (
                    <Fragment key={index}>{generateComponent(id)}</Fragment>
                ))}

                <div>
                    <Button label="Previous" onClick={handlePrevious} />
                    <Button label="Next" onClick={handleNext} />
                </div>
            </>
        )
    );
}
