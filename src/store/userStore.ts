import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
    getUser,
    createUser,
    updateUser,
    UserRegisterData,
    UserUpdateData,
} from "../api";

const useUserStore = create(
    devtools(
        (set) => ({
            userData: null,

            getUserLoading: false,
            getUserError: null,
            getUser: async (username: string) => {
                set({ getUserLoading: true, getUserError: null });
                try {
                    const newUser = await getUser(username);
                    set({ userData: newUser });
                } catch (error) {
                    if (error instanceof Error) {
                        set({ getUserError: error.message });
                    } else {
                        set({ getUserError: "An unknown error occurred" });
                    }
                } finally {
                    set({ getUserLoading: false });
                }
            },

            createUserLoading: false,
            createUserError: null,
            createUser: async (userData: UserRegisterData) => {
                set({ createUserLoading: true, createUserError: null });
                try {
                    const newUser = await createUser(userData);
                    set({ userData: newUser });
                } catch (error) {
                    if (error instanceof Error) {
                        set({ createUserError: error.message });
                    } else {
                        set({ createUserError: "An unknown error occurred" });
                    }
                } finally {
                    set({ createUserLoading: false });
                }
            },

            updateUserLoading: false,
            updateUserError: null,
            updateUser: async (username: string, userData: UserUpdateData) => {
                set({ updateUserLoading: true, updateUserError: null });
                try {
                    const newUser = await updateUser(username, userData);
                    set({ userData: newUser });
                } catch (error) {
                    if (error instanceof Error) {
                        set({ updateUserError: error.message });
                    } else {
                        set({ updateUserError: "An unknown error occurred" });
                    }
                } finally {
                    set({ updateUserLoading: false });
                }
            },
        }),
        { name: "User Store" },
    ),
);

export default useUserStore;
