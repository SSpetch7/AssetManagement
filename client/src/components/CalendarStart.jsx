
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function CalendarStart() {
    const [datestart, setDateStart] = useState(null);

    return (
        <div className="card flex justify-content-center w-full h-full">
            <Calendar className="w-full" value={datestart} onChange={(e) => setDateStart(e.value)}/>
        </div>
    )
}