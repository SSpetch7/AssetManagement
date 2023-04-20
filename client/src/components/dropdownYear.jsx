import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function Year() {
    const Year = [
        { name: '2023' },
        { name: '2022' },
        { name: '2021' },
        { name: '2020' },
        { name: '2019' },
        { name: '2018' },
        { name: '2017' },
        { name: '2016' },
        { name: '2015' },
        { name: '2014' },
        { name: '2013' },
        { name: '2012' },
        { name: '2011' },
        { name: '2010' },
        { name: '2009' },
        { name: '2008' },
        { name: '2007' },
        { name: '2006' },
        { name: '2005' },
        { name: '2004' },
        { name: '2003' },
        { name: '2002' },
        { name: '2001' },
        { name: '2000' },
        { name: '1999' },
        { name: '1998' },
        { name: '1997' },
        { name: '1996' },
        { name: '1995' },
        { name: '1994' },
        { name: '1993' },
        { name: '1992' },
        { name: '1991' },
        { name: '1990' },
        { name: '1989' },
        { name: '1988' },
        { name: '1987' },
        { name: '1986' },
        { name: '1985' },
        { name: '1984' },
        { name: '1983' },
        { name: '1982' },
        { name: '1981' },
        { name: '1980' },
    ];
    const [selectedYear, setSelectedYear] = useState(Year[0].name);
    return (
        <div className="card flex justify-content-center w-full h-11/12">
            <Dropdown value={selectedYear} onChange={(e) => setSelectedYear(e.value)} options={Year} optionLabel="name"
                placeholder={selectedYear} className="p-invalid w-full md:w-14rem" />
        </div>
    )
}
