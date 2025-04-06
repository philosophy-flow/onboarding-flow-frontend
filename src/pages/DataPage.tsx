import { useNavigate } from "react-router-dom";

import { useUserStore } from "../store";
import { MouseEvent } from "../types";
import Button from "../components/common/Button";

export default function DataPage() {
    const navigate = useNavigate();
    const { userData, updateUser, logoutUser, getUserLoading } = useUserStore();

    const handleFlow = async (e: MouseEvent) => {
        e.preventDefault();

        await updateUser(userData!.username, { current_page: 1 });
        navigate("/flow/1");
    };

    const handleLogout = async (e: MouseEvent) => {
        e.preventDefault();

        await updateUser(userData!.username, { current_page: 2 });
        await logoutUser();
        navigate("/flow/1");
    };

    return (
        !getUserLoading && (
            <div>
                <h2 className="text-2xl font-bold">User Data</h2>
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
                <div>
                    <Button label="Return to Flow" onClick={handleFlow} />
                    <Button label="Logout" onClick={handleLogout} />
                </div>
            </div>
        )
    );
}
