import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
    getPages,
    updatePage,
    PageData,
    ComponentData,
    getUnusedComponents,
} from "../api";

type PagesStore = {
    pages: PageData[];
    unusedComponents: ComponentData[];

    getPagesLoading: boolean;
    getPagesError: string;
    getPagesUnitialized: boolean;
    getPages: () => Promise<void>;

    updatePageLoading: boolean;
    updatePageError: string;
    updatePage: (pageData: PageData) => Promise<void>;

    getUnusedComponentsLoading: boolean;
    getUnusedComponentsError: string;
    getUnusedComponents: () => Promise<void>;
};

const usePagesStore = create<PagesStore>()(
    devtools(
        (set) => ({
            pages: [],
            unusedComponents: [],

            getPagesLoading: false,
            getPagesError: "",
            getPagesUnitialized: true,
            getPages: async () => {
                set({ getPagesLoading: true, getPagesUnitialized: false });
                try {
                    const response = await getPages();
                    set({ pages: response.data, getPagesError: "" });
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
            updatePageError: "",
            updatePage: async (pageData: PageData) => {
                set({ updatePageLoading: true });
                try {
                    const response = await updatePage(pageData);
                    set({ pages: response.data, updatePageError: "" });
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

            getUnusedComponentsLoading: false,
            getUnusedComponentsError: "",
            getUnusedComponents: async () => {
                set({
                    getUnusedComponentsLoading: true,
                });
                try {
                    const response = await getUnusedComponents();
                    set({
                        unusedComponents: response.data || [],
                        getUnusedComponentsError: "",
                    });
                } catch (error) {
                    if (error instanceof Error) {
                        set({ getUnusedComponentsError: error.message });
                    } else {
                        set({
                            getUnusedComponentsError:
                                "An unknown error occurred.",
                        });
                    }
                } finally {
                    set({ getUnusedComponentsLoading: false });
                }
            },
        }),
        { name: "Pages Store" },
    ),
);

export default usePagesStore;
