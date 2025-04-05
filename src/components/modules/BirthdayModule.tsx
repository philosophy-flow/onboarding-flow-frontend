import { useState } from "react";
import { useEffect } from "react";
import { ModularComponent } from "../../types";

export default function BirthdayModule({
    handleInputChange,
}: ModularComponent) {
    const [dateStr, setDateStr] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        const getDateStr = () => {
            if (!month || !day || !year) {
                return "";
            }

            const paddedMonth = month.padStart(2, "0");
            const paddedDay = month.padStart(2, "0");

            return `${year}-${paddedMonth}-${paddedDay}T00:00:00.000Z`;
        };

        const dateStr = getDateStr();
        setDateStr(dateStr);

        handleInputChange("dob", dateStr);
    }, [month, day, year, handleInputChange]);

    return (
        <>
            <label htmlFor="birthday"></label>
            <div id="birthday">
                <div>
                    <label htmlFor="month">Month</label>
                    <input
                        name="month"
                        id="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="day">Day</label>
                    <input
                        name="'day"
                        id="day"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="year">Year</label>
                    <input
                        name="'year"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}
