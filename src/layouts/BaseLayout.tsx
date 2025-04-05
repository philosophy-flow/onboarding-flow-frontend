import { Outlet } from "react-router-dom";

export default function BaseLayout() {
    return (
        <main className="m-4">
            <Outlet />
        </main>
    );
}
