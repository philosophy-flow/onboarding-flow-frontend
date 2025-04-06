import { Outlet } from "react-router-dom";

export default function BaseLayout() {
    return (
        <main className="m-8">
            <Outlet />
        </main>
    );
}
