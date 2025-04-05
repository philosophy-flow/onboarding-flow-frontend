import { useState } from "react";
import { ModularComponent, TextAreaChange } from "../../types";

export default function AboutModule({ handleInputChange }: ModularComponent) {
    const [about, setAbout] = useState("");

    const handleChange = (e: TextAreaChange) => {
        console.log(e.target.value);
        setAbout(e.target.value);
        handleInputChange(e.target.name, e.target.value);
    };

    return (
        <div>
            <label htmlFor="about">About</label>
            <textarea
                name="about"
                id="about"
                value={about}
                onChange={handleChange}
            />
        </div>
    );
}
