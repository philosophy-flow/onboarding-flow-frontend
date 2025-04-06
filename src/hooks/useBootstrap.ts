import { useEffect, useState } from "react";
import { usePagesStore, useUserStore } from "../store";

export default function useBootstrap() {
    const [appIsReady, setAppIsReady] = useState(false);
    const { getPages, getUnusedComponents } = usePagesStore();
    const { getUser } = useUserStore();

    useEffect(() => {
        async function bootstrap() {
            await getUser();
            await getPages();
            await getUnusedComponents();

            setAppIsReady(true);
        }
        bootstrap();
    }, [getPages, getUnusedComponents, getUser]);

    return appIsReady;
}
