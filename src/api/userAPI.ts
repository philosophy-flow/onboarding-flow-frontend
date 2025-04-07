export type UserRegisterData = {
    username: string;
    password: string;
};

export type UserUpdateData = {
    current_page?: number;
    about?: string;
    dob?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

export const getUser = async (username: string = "refresh") => {
    try {
        const response = await fetch(`${apiUrl}/get-user/${username}`, {
            method: "GET",
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (e) {
        console.error(e);
        return { success: false, error: e };
    }
};

export const createUser = async (userData: UserRegisterData) => {
    try {
        const response = await fetch(`${apiUrl}/create-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (e) {
        console.error(e);
        return { success: false, error: e };
    }
};

export const updateUser = async (
    username: string,
    userData: UserUpdateData,
) => {
    try {
        const response = await fetch(`${apiUrl}/update-user/${username}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (e) {
        console.error(e);
        return { success: false, error: e };
    }
};

export const logoutUser = async () => {
    try {
        const response = await fetch(`${apiUrl}/logout-user`, {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (e) {
        console.error(e);
        return { success: false, error: e };
    }
};
