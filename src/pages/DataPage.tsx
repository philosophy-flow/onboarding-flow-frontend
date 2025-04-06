import { useNavigate } from "react-router-dom";

import { useUserStore } from "../store";
import { MouseEvent } from "../types";
import Button from "../components/common/Button";

export default function DataPage() {
    const navigate = useNavigate();
    const { userData } = useUserStore();

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        navigate("/flow/1");
    };

    return (
        <div>
            <h2 className="text-2xl underline">User Data</h2>
            <table className="my-6 w-[50%] text-left text-sm rtl:text-right">
                <tbody>
                    {Object.entries(userData!).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-700">
                            <td className="w-2.5 border-r border-gray-700 px-6 py-4 pl-0">
                                {key}
                            </td>
                            <td className="px-6 py-4">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button label="Return to Flow" onClick={handleClick} />
        </div>
    );
}
