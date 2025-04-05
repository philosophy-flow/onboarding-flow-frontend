import { useEffect, useState } from "react";
import { usePagesStore } from "../store";

export default function useBootstrap() {
    const [appIsReady, setAppIsReady] = useState(false);
    const { getPages } = usePagesStore();
    useEffect(() => {
        async function bootstrap() {
            await getPages();
            setAppIsReady(true);
        }
        bootstrap();
    }, [getPages]);

    return appIsReady;
}
