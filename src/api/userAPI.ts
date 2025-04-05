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

export const getUser = async (username: string) => {
    try {
        const response = await fetch(
            `http://localhost:8000/api/get-user/${username}`,
        );

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
        const response = await fetch("http://localhost:8000/api/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
        const response = await fetch(
            `http://localhost:8000/api/update-user/${username}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            },
        );

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
