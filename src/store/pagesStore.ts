import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getPages, updatePage, PageData } from "../api";

const usePagesStore = create(
    devtools(
        (set) => ({
            pagesData: [],

            getPagesLoading: false,
            getPagesError: null,
            getPagesUnitialized: true,
            getPages: async () => {
                set({ getPagesLoading: true, getPagesUnitialized: false });
                try {
                    const response = await getPages();
                    set({ pagesData: response.data, getPagesError: null });
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
                    const response = await updatePage(pageData);
                    set({ pagesData: response.data, updatePagesError: null });
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
        }),
        { name: "Pages Store" },
    ),
);

export default usePagesStore;
