import { Outlet, NavLink } from "react-router-dom";
import { usePagesStore } from "../store";

export default function FlowFormLayout() {
    const { pages } = usePagesStore();
    return (
        <>
            <h2 className="text-2xl font-bold">Welcome to Onboarcerer</h2>
            <p className="text-sm italic">
                Your personal onboarding wizard.{" "}
                <span className="text-lg not-italic">🧙✨</span>
            </p>
            <form className="my-6 flex">
                <nav className="min-w-fit border-r-2 pt-4 pr-8">
                    <ul className="text-right">
                        <li>
                            <NavLink
                                to="/flow/1"
                                className={({ isActive }) =>
                                    isActive
                                        ? "my-6 block underline"
                                        : "my-6 block"
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                        {pages.map((page) => (
                            <li key={page.page_number}>
                                <NavLink
                                    to={`/flow/${page.page_number}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "my-6 block underline"
                                            : "my-6 block"
                                    }
                                >
                                    {page.title || `Page ${page.page_number}`}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <section className="w-full pl-8">
                    <Outlet />
                </section>
            </form>
        </>
    );
}
