import { useState } from "react";
import { ModularComponent, InputChange } from "../../types";

export default function AddressModule({ handleInputChange }: ModularComponent) {
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
    });

    const handleChange = (e: InputChange) => {
        setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        handleInputChange(e.target.name, e.target.value);
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
