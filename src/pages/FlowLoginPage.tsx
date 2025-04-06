import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormEvent, MouseEvent } from "../types";
import { useUserStore } from "../store";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function FlowLoginPage() {
    const { createUser, getUser, userData } = useUserStore();
    const [formData, setFormData] = useState({
        username: userData?.username,
        password: "",
    });
    const navigate = useNavigate();

    const handleLoginInputChange = (e: FormEvent) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreate = async (e: MouseEvent) => {
        e.preventDefault();

        await createUser({
            username: formData.username!,
            password: formData.password,
        });

        navigate("/flow/2");
    };

    const handleLogin = async (e: MouseEvent) => {
        e.preventDefault();

        await getUser(formData.username!);

        navigate("/flow/2");
    };

    return (
        <>
            <h2 className="mb-6 text-2xl underline">
                Welcome to the Onboarding Flow
            </h2>
            <Input
                name="username"
                label="Username:"
                value={formData.username || ""}
                onChange={handleLoginInputChange}
            />
            <Input
                name="password"
                label="Password"
                value={formData.password || ""}
                onChange={handleLoginInputChange}
            />

            <div>
                <Button
                    label="Create Account"
                    onClick={(e) => handleCreate(e)}
                />
                <Button label="Continue Flow" onClick={(e) => handleLogin(e)} />
            </div>

            <p className="mt-2 text-sm">
                If you already created an account, use your credentials and
                press the <span className="italic">continue</span> button to
                continue updating your profile.
            </p>
        </>
    );
}
