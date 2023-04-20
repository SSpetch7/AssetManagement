import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function User() {
    const User = [
        { name: 'กิตนันท์ สมัครพงค์' },
        { name: 'พีรกานต์ จักรเพ็ชร' },
        { name: 'นิธิโชติ มณีรัตน์ไพโรจน์' },
        { name: '...' },
    ];
    const [selectedUser, setSelectedUser] = useState(User[0].name);
    return (
        <div className="card flex justify-content-center w-4/5 h-11/12">
            <Dropdown value={selectedUser} onChange={(e) => setSelectedUser(e.value)} options={User} optionLabel="name"
                placeholder={selectedUser} className="p-invalid w-full md:w-14rem" />
        </div>
    )
}
