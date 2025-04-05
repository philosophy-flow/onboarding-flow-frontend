import { Routes, Route, Navigate } from "react-router-dom";
import { useBootstrap } from "./hooks";

import { BaseLayout, FlowFormLayout } from "./layouts";
import { FlowLoginPage, FlowModularPage, DataPage, AdminPage } from "./pages";

function App() {
    const appIsReady = useBootstrap();

    return (
        appIsReady && (
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<Navigate to="/flow/1" />} />
                    <Route path="/flow" element={<FlowFormLayout />}>
                        <Route path="/flow/1" element={<FlowLoginPage />} />
                        <Route
                            path="/flow/:pageNumber"
                            element={<FlowModularPage />}
                        />
                    </Route>
                    <Route path="/data" element={<DataPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<Navigate to="/flow/1" />} />
                </Route>
            </Routes>
        )
    );
}

export default App;
