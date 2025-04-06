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

    const handleAdmin = (e: MouseEvent) => {
        e.preventDefault();
        navigate("/admin");
    };

    return (
        <>
            <h3 className="mb-4 text-xl">Login</h3>
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
                <Button label="Create Account" onClick={handleCreate} />
                <Button label="Continue Flow" onClick={handleLogin} />
                <Button label="Admin" onClick={handleAdmin} />
            </div>

            <p className="my-2 text-sm">
                If you already created an account, use your credentials and
                press the <span className="italic">Continue Flow</span> button
                to continue updating your profile.
            </p>
        </>
    );
}
