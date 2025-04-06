import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormEvent, MouseEvent } from "../types";
import { useUserStore } from "../store";

export default function FlowLoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { createUser, getUser } = useUserStore();
    const navigate = useNavigate();

    const handleInputChange = (e: FormEvent) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: MouseEvent) => {
        e.preventDefault();

        await createUser({
            username: formData.username,
            password: formData.password,
        });

        navigate("/flow/2");
    };

    const handleLogin = async (e: MouseEvent) => {
        e.preventDefault();

        await getUser(formData.username);

        navigate("/flow/2");
    };

    return (
        <>
            <h2 className="text-2xl underline">
                Welcome to the Onboarding Flow
            </h2>
            <div className="mt-4">
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    name="username"
                    className="block border p-1"
                    value={formData.username}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mt-4">
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="block border p-1"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </div>
            <button
                onClick={(e) => handleSubmit(e)}
                className="mt-4 mr-4 cursor-pointer border p-2"
            >
                Create Account
            </button>
            <button
                onClick={(e) => handleLogin(e)}
                className="mt-4 mr-4 cursor-pointer border p-2"
            >
                Continue Flow
            </button>
            <p className="mt-4 text-sm">
                If you already created an account, use your credentials and
                press the <span className="italic">continue</span> button to
                continue updating your profile.
            </p>
        </>
    );
}
