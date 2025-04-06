import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import { useUserStore } from "../../store";
import { ModularComponent } from "../../types";
import Input from "../common/input";

export default function BirthdayModule({
    handleInputChange,
}: ModularComponent) {
    const { userData } = useUserStore();
    const [storedYear, storedMonth, storedDay] = userData!.dob.split("-");

    const [dateStr, setDateStr] = useState("");
    const [month, setMonth] = useState(storedMonth);
    const [day, setDay] = useState(storedDay);
    const [year, setYear] = useState(storedYear);
    const [delayedDateStr] = useDebounce(dateStr, 2000);

    useEffect(() => {
        if (delayedDateStr) {
            handleInputChange("dob", delayedDateStr);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delayedDateStr]);

    useEffect(() => {
        if (month && day && year) {
            const paddedMonth = month.padStart(2, "0");
            const paddedDay = day.padStart(2, "0");

            const dateStr = `${year}-${paddedMonth}-${paddedDay}T00:00:00.000Z`;

            setDateStr(dateStr);
        }
    }, [month, day, year]);

    return (
        <div className="mb-6">
            <label htmlFor="birthday" className="mb-3"></label>
            <div id="birthday" className="w-100 border-2 p-2">
                <Input
                    name="month"
                    label="Month:"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />

                <Input
                    name="day"
                    label="Day:"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />

                <Input
                    name="year"
                    label="Year:"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </div>
        </div>
    );
}
