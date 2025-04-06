import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
    getUser,
    createUser,
    updateUser,
    UserRegisterData,
    UserUpdateData,
} from "../api";

type User = {
    username: string;
    current_page: number;
    about: string;
    dob: string;
    street: string;
    city: string;
    state: string;
    zip: string;
};

type UserStore = {
    userData: User | null;

    getUserLoading: boolean;
    getUserError: string;
    getUser: (username: string) => Promise<void>;

    createUserLoading: boolean;
    createUserError: string;
    createUser: (userData: UserRegisterData) => Promise<void>;

    updateUserLoading: boolean;
    updateUserError: string;
    updateUser: (username: string, userData: UserUpdateData) => Promise<void>;
};

const initialUser = {
    username: "",
    current_page: 1,
    about: "",
    dob: "",
    street: "",
    city: "",
    state: "",
    zip: "",
};

const useUserStore = create<UserStore>()(
    devtools(
        (set) => ({
            userData: initialUser,

            getUserLoading: false,
            getUserError: "",
            getUser: async (username: string) => {
                set({ getUserLoading: true, getUserError: "" });
                try {
                    const newUser = await getUser(username);
                    set({ userData: newUser.data || initialUser });
                } catch (error) {
                    if (error instanceof Error) {
                        set({ userData: initialUser });
                        set({ getUserError: error.message });
                    } else {
                        set({ getUserError: "An unknown error occurred" });
                    }
                } finally {
                    set({ getUserLoading: false });
                }
            },

            createUserLoading: false,
            createUserError: "",
            createUser: async (userData: UserRegisterData) => {
                set({ createUserLoading: true, createUserError: "" });
                try {
                    const newUser = await createUser(userData);
                    set({ userData: newUser.data || initialUser });
                } catch (error) {
                    if (error instanceof Error) {
                        set({ userData: initialUser || initialUser });
                        set({ createUserError: error.message });
                    } else {
                        set({ createUserError: "An unknown error occurred" });
                    }
                } finally {
                    set({ createUserLoading: false });
                }
            },

            updateUserLoading: false,
            updateUserError: "",
            updateUser: async (username: string, userData: UserUpdateData) => {
                set({ updateUserLoading: true, updateUserError: "" });
                try {
                    const newUser = await updateUser(username, userData);
                    set({ userData: newUser.data || initialUser });
                } catch (error) {
                    if (error instanceof Error) {
                        set({ userData: initialUser || initialUser });
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
