import { create } from "zustand";
import { getPages, updatePage, PageData } from "../api";

const usePagesStore = create((set) => ({
    pagesData: [],

    getPagesLoading: false,
    getPagesError: null,
    getPages: async () => {
        set({ getPagesLoading: true });
        try {
            const pages = await getPages();
            set({ pagesData: pages, getPagesError: null });
        } catch (error) {
            if (error instanceof Error) {
                set({ getPagesError: error.message });
            } else {
                set({
                    getPagesError: "An unknown error occurred.",
                });
            }
        } finally {
            set({ getPagesLoading: false });
        }
    },

    updatePageLoading: false,
    updatePageError: null,
    updatePage: async (pageData: PageData) => {
        set({ updatePageLoading: true });
        try {
            const updatedPages = await updatePage(pageData);
            set({ pagesData: updatedPages, updatePagesError: null });
        } catch (error) {
            if (error instanceof Error) {
                set({ updatePageError: error.message });
            } else {
                set({
                    updatePageError: "An unknown error occurred",
                });
            }
        } finally {
            set({ updatePageLoading: false });
        }
    },
}));

export default usePagesStore;
