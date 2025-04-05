import { useParams, Navigate } from "react-router-dom";

import { usePagesStore } from "../store";

export default function FlowModularPage() {
    const { pageNumber } = useParams();
    const { pagesData } = usePagesStore();

    const numPages = pagesData.length + 1;
    const overflow = numPages > 1 && numPages < parseInt(pageNumber!);

    return overflow ? (
        <Navigate to="/flow/1" />
    ) : (
        <div>
            <p>Modular Page #{pageNumber}</p>
        </div>
    );
}
