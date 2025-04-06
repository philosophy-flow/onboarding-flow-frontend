import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import { ModularComponent, InputChange } from "../../types";

export default function AddressModule({ handleInputChange }: ModularComponent) {
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
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
        <>
            <label htmlFor="address"></label>
            <div id="address">
                <div>
                    <label htmlFor="street">Street</label>
                    <input
                        name="street"
                        id="street"
                        value={address.street}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <input
                        name="city"
                        id="city"
                        value={address.city}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="state">State</label>
                    <input
                        name="state"
                        id="state"
                        value={address.state}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="zip">Zip</label>
                    <input
                        name="zip"
                        id="zip"
                        value={address.zip}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
}
