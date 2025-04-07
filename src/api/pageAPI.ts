export type ComponentData = {
    component_name: string;
};

export type PageData = {
    page_number: number;
    title?: string;
    components: ComponentData[];
};

const apiUrl = import.meta.env.VITE_API_URL;

export const getPages = async () => {
    try {
        const response = await fetch(`${apiUrl}/get-pages`);

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

export const updatePage = async (pageData: PageData) => {
    try {
        const response = await fetch(`${apiUrl}/update-page`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pageData),
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

export const getUnusedComponents = async () => {
    try {
        const response = await fetch(`${apiUrl}/get-unused-components`);

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
