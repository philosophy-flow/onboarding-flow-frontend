import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { usePagesStore } from "./store";
import {
    BaseLayout,
    FlowLoginPage,
    FlowModularPage,
    DataPage,
    AdminPage,
} from "./pages";

function App() {
    const { getPages } = usePagesStore();
    useEffect(() => {
        async function bootstrap() {
            await getPages();
        }
        bootstrap();
    }, [getPages]);
    return (
        <Routes>
            <Route path="/" element={<BaseLayout />}>
                <Route index element={<Navigate to="/flow/1" />} />
                <Route path="/flow/1" element={<FlowLoginPage />} />
                <Route path="/flow/:pageNumber" element={<FlowModularPage />} />
                <Route path="/data" element={<DataPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/flow/1" />} />
            </Route>
        </Routes>
    );
}

export default App;
