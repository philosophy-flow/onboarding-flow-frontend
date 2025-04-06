import { useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import { MouseEvent } from "../types";

export default function AdminPage() {
    const navigate = useNavigate();

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        navigate("/flow/1");
    };

    return (
        <div>
            <h2 className="text-2xl underline">Admin</h2>
            <div className="mt-8 flex pb-6">
                <div className="sidebar border-r-2 pr-8">
                    <h3 className="text-xl">Components</h3>
                    <ul className="mt-8">
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
                    <ul className="mt-8">
                        <li className="mb-3 flex max-w-md items-center rounded border bg-gray-50 p-3 text-lg">
                            <p className="mr-4">Page 2 |</p>
                            <ul className="flex items-center">
                                <li className="cursor-pointer rounded-full bg-gray-300 px-3 py-2 text-center text-sm hover:bg-gray-400">
                                    Component 3
                                </li>
                            </ul>
                        </li>
                        <li className="mb-3 max-w-md rounded border bg-gray-50 p-3 text-lg">
                            <p>Page 3 | </p>
                        </li>
                    </ul>
                    <p className="text-sm">
                        Click a component to remove it from a page.
                    </p>
                    <p className="text-sm">
                        Note — each page must have at least one component.
                    </p>
                </div>
            </div>
            <Button label="Back to Flow" onClick={handleClick} />
        </div>
    );
}
