import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function Status() {
    const Status = [
        { name: 'สถานะครุภัณฑ์ทั้งหมด' },
        { name: 'ชำรุด' },
        { name: 'รอซ่อม' },
        { name: 'ใช้งานได้' },
    ];
    const [selectedStatus, setSelectedStatus] = useState(Status[0].name);
    return (
        <div className="card flex justify-content-center w-4/5 h-full">
            <Dropdown value={selectedStatus} onChange={(e) => setSelectedStatus(e.value)} options={Status} optionLabel="name"
                placeholder={selectedStatus} className="p-invalid w-full md:w-14rem" />
        </div>
    )
}
