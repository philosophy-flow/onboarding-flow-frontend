import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import { useUserStore } from "../../store";
import { ModularComponent, InputChange } from "../../types";
import Input from "../common/input";

export default function AddressModule({ handleInputChange }: ModularComponent) {
    const { userData } = useUserStore();

    const [address, setAddress] = useState({
        street: userData?.street,
        city: userData?.city,
        state: userData?.state,
        zip: userData?.zip,
    });
    const [delayedAddress] = useDebounce(address, 2000);

    useEffect(() => {
        const keys = Object.keys(delayedAddress) as Array<keyof typeof address>;
        keys.forEach((key) => {
            if (delayedAddress[key]) {
                handleInputChange(key, delayedAddress[key]);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delayedAddress]);

    const handleChange = (e: InputChange) => {
        setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="mb-6">
            <label htmlFor="address" className="mb-3">
                Address
            </label>
            <div className="w-100 border-2 p-2">
                <div id="address" className="p-y-1">
                    <Input
                        name="street"
                        label="Street:"
                        value={address.street || ""}
                        onChange={handleChange}
                    />

                    <Input
                        name="city"
                        label="City:"
                        value={address.city || ""}
                        onChange={handleChange}
                    />

                    <Input
                        name="state"
                        label="State:"
                        value={address.state || ""}
                        onChange={handleChange}
                    />

                    <Input
                        name="zip"
                        label="Zip:"
                        value={address.zip || ""}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}
