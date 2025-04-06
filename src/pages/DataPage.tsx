import { useNavigate } from "react-router-dom";
import { MouseEvent } from "../types";

export default function DataPage() {
    const navigate = useNavigate();

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();

        navigate("/flow/1");
    };
    return (
        <div>
            <h2 className="text-2xl underline">User Data</h2>
            <button
                className="mt-4 mr-4 cursor-pointer border p-2"
                onClick={handleClick}
            >
                Return to Flow
            </button>
        </div>
    );
}
