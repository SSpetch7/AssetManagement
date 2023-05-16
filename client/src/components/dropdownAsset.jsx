import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function AmountAsset() {
    const Asset = [
        { name: 'จำนวนครุภัณฑ์ทั้งหมด'},
        { name: 'คอมพิวเตอร์'},
        { name: 'โน๊ตบุ๊ค'},
        { name: 'แท็บเล็ต'},
        { name: 'อื่นๆ'},
    ];
    const [selectedAsset, setSelectedAsset] = useState(Asset[0].name);
    return (
        <div className="card flex justify-content-center w-full h-4/5">
            <Dropdown value={selectedAsset} onChange={(e) => setSelectedAsset(e.value)} options={Asset} optionLabel="name" 
               placeholder={selectedAsset} className="p-invalid w-full md:w-14rem" />
        </div>
    )
}
        