import { useEffect } from "react";
import { usePagesStore } from "../store";

export default function useBootstrap() {
    const { getPages } = usePagesStore();
    useEffect(() => {
        async function bootstrap() {
            await getPages();
        }
        bootstrap();
    }, [getPages]);
}
