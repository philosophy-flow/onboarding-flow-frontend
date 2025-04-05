import { Outlet } from "react-router-dom";

export default function FlowFormLayout() {
    return (
        <form>
            <Outlet />
        </form>
    );
}
