import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import { useUserStore } from "../../store";
import { ModularComponent, TextAreaChange } from "../../types";

export default function AboutModule({ handleInputChange }: ModularComponent) {
    const { userData } = useUserStore();
    const [about, setAbout] = useState(userData?.about || "");
    const [delayedAbout] = useDebounce(about, 500);

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
        <div className="mb-6 w-100">
            <label htmlFor="about" className="block">
                About
            </label>
            <textarea
                name="about"
                id="about"
                value={about}
                onChange={handleChange}
                maxLength={175}
                className="h-32 w-full resize-none border-2 p-3"
            />
        </div>
    );
}
