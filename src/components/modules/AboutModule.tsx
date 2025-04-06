import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import { ModularComponent, TextAreaChange } from "../../types";

export default function AboutModule({ handleInputChange }: ModularComponent) {
    const [about, setAbout] = useState("");
    const [delayedAbout] = useDebounce(about, 2000);

    useEffect(() => {
        if (delayedAbout) {
            handleInputChange("about", delayedAbout);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delayedAbout]);

    const handleChange = (e: TextAreaChange) => {
        setAbout(e.target.value);
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
