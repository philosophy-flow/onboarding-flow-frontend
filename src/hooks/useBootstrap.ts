import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePagesStore, useUserStore } from "../store";

export default function useBootstrap() {
    const [appIsReady, setAppIsReady] = useState(false);
    const { getPages, getUnusedComponents } = usePagesStore();
    const { getUser, userData } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        async function bootstrap() {
            await getUser();
            await getPages();
            await getUnusedComponents();

            setAppIsReady(true);

            if (userData?.username) {
                navigate(`/flow/${userData?.current_page || 1}`);
            }
        }
        bootstrap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData?.username]);

    return appIsReady;
}
