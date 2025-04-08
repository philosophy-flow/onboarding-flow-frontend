import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FormEvent, MouseEvent } from "../types";
import { useUserStore } from "../store";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

type FormError = {
    create: boolean;
    login: boolean;
};

export default function FlowLoginPage() {
    const [formError, setFormError] = useState({ create: false, login: false });
    const { createUser, getUser, userData, updateUser } = useUserStore();
    const [formData, setFormData] = useState({
        username: userData?.username,
        password: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const updateUserPage = async () => {
            updateUser(userData!.username, {
                current_page: 1,
            });
        };
        updateUserPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const bothDisabled = !formData.username && !formData.password;
    const createDisabled = bothDisabled || !formData.password;
    const continueDisabled = Boolean(bothDisabled || formData.password);

    const handleLoginInputChange = (e: FormEvent) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreate = async (e: MouseEvent) => {
        e.preventDefault();

        setFormError({
            create: false,
            login: false,
        });

        const response = await createUser({
            username: formData.username!,
            password: formData.password,
        });

        if (response.success) {
            navigate("/flow/2");
        } else {
            setFormError((prev: FormError) => ({ ...prev, create: true }));
        }
    };

    const handleLogin = async (e: MouseEvent) => {
        e.preventDefault();

        setFormError({
            create: false,
            login: false,
        });

        const response = await getUser(formData.username);

        if (response.success) {
            navigate("/flow/2");
            setFormError({
                create: false,
                login: false,
            });
        } else {
            setFormError((prev: FormError) => ({ ...prev, login: true }));
        }
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
                <Button
                    label="Create Account"
                    onClick={handleCreate}
                    disabled={createDisabled}
                />
                <Button
                    label="Continue Flow"
                    onClick={handleLogin}
                    disabled={continueDisabled}
                />
                <Button label="Admin" onClick={handleAdmin} />
            </div>

            {formError.create && (
                <p className="my-2 max-w-100 text-sm text-red-600">
                    Unable to create account. Username might be taken.
                </p>
            )}
            {formError.login && (
                <p className="my-2 max-w-100 text-sm text-red-600">
                    Unable to login. Username might not exist.
                </p>
            )}

            <p className="my-2 max-w-100 text-sm">
                Enter a username and password to create a new account.
            </p>
            <p className="my-2 max-w-100 text-sm">
                If you already created an account, enter your username{" "}
                <span className="underline">without</span> your password and
                press the <span className="italic">Continue Flow</span> button
                to continue updating your profile.
            </p>
        </>
    );
}
