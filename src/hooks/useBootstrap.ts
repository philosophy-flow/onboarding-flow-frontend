import { useEffect, useState } from "react";
import { usePagesStore } from "../store";

export default function useBootstrap() {
    const [appIsReady, setAppIsReady] = useState(false);
    const { getPages, getUnusedComponents } = usePagesStore();
    useEffect(() => {
        async function bootstrap() {
            await getPages();
            await getUnusedComponents();

            setAppIsReady(true);
        }
        bootstrap();
    }, [getPages, getUnusedComponents]);

    return appIsReady;
}
