
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function CalendarEnd() {
    const [dateend, setDateEnd] = useState(null);

    return (
        <div className="card flex justify-content-center w-full h-full">
            <Calendar className="w-full" value={dateend} onChange={(e) => setDateEnd(e.value)} />
        </div>
    )
}