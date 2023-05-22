import DevicesIcon from '@mui/icons-material/Devices';
import AppBlockingIcon from '@mui/icons-material/AppBlocking';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import notebook from '../assets/notebook.jpg';
import tablet from '../assets/tablet.jpg';
import avatar from '../assets/pic.jpg';

export const overviewAsset = [
  {
    device: 'Notebook',
    datas: [
      {
        icon: <DevicesIcon sx={{ fontSize: 35 }} />,
        title: 'จำนวนทั้งหมด',
        iconColor: '#2CBE66',
        number: 12,
      },
      {
        icon: <AppBlockingIcon sx={{ fontSize: 35 }} />,
        title: 'จำนวนที่กำลังยืม',
        iconColor: '#FFDD81',
        number: 22,
      },
      {
        icon: <BuildCircleIcon sx={{ fontSize: 35 }} />,
        title: 'จำนวนที่ยืมได้',
        iconColor: '#FFA048',
        number: 33,
      },
      {
        icon: <CancelIcon sx={{ fontSize: 35 }} />,
        title: 'จำนวนสิ้นสภาพ',
        iconColor: '#FF6666',
        number: 44,
      },
    ],
  },
  {
    device: 'Tablet',
    datas: [
      {
        icon: <DevicesIcon sx={{ fontSize: 35 }} />,
        title: 'จำนวนทั้งหมด',
        iconColor: '#2CBE66',
        number: 55,
      },
      {
        icon: <AppBlockingIcon sx={{ fontSize: 35 }} />,
        title: 'จำนวนที่กำลังยืม',
        iconColor: '#FFDD81',
        number: 66,
      },
      {
        icon: <BuildCircleIcon sx={{ fontSize: 35 }} />,
        title: 'จำนวนที่ยืมได้',
        iconColor: '#FFA048',
        number: 77,
      },
      {
        icon: <CancelIcon sx={{ fontSize: 35 }} />,
        title: 'จำนวนสิ้นสภาพ',
        iconColor: '#FF6666',
        number: 88,
      },
    ],
  },
];
export const mostActivity = [
  {
    title: 'Notebook',
    image: notebook,
    borrowed: 15,
    useable: 24,
    all: 30,
  },
  {
    title: 'Tablet',
    image: tablet,
    borrowed: 12,
    useable: 15,
    all: 20,
  },
];
export const roomAtAsset = [
  {
    number: 'ห้อง SCL607',
    image: notebook,
    borrowed: 15,
    useable: 24,
    all: 30,
  },
  {
    number: 'ห้อง SCL608',
    image: tablet,
    borrowed: 12,
    useable: 15,
    all: 20,
  },
  {
    number: 'ห้อง SCL609',
    image: notebook,
    borrowed: 15,
    useable: 24,
    all: 30,
  },
  {
    number: 'ห้อง SCL610',
    image: tablet,
    borrowed: 12,
    useable: 15,
    all: 20,
  },
  {
    number: 'ห้อง SCL611',
    image: tablet,
    borrowed: 12,
    useable: 15,
    all: 20,
  },
];

export const dataTable1 = [
  {
    order: '1',
    asset_id: '59E1500061',
    name: 'คอมพิวเตอร์ Notebook',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'รศ.ชูเกียรติ',
    inventoryStatus: 'คืน',
  },
  {
    order: '2',
    asset_id: '58E0100998',
    name: 'เครื่องบันทึกเสียง',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'รศ.ดร.อุษา',
    inventoryStatus: 'คืน',
  },
  {
    order: '3',
    asset_id: '58E0200545',
    name: 'เครื่องวัดความชื้นอุณหภูมิ',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
    inventoryStatus: 'คืน',
  },
  {
    order: '4',
    asset_id: '58E1500352',
    name: 'อุปกรณ์จัดเก็บข้อมูล(Server Storage)',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
    inventoryStatus: 'คืน',
  },
  {
    order: '5',
    asset_id: '62E1500008',
    name: 'คอมพิวเตอร์ Notebook',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
    inventoryStatus: 'คืน',
  },
  {
    order: '6',
    asset_id: '62E0100045',
    name: 'เครื่องปรับอากาศ',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
    inventoryStatus: 'คืน',
  },
  {
    order: '7',
    asset_id: '62E0100046',
    name: 'เครื่องปรับอากาศ',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
    inventoryStatus: 'คืน',
  },
  {
    order: '8',
    asset_id: '62E0100047',
    name: 'เครื่องปรับอากาศ',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
    inventoryStatus: 'คืน',
  },
  {
    order: '9',
    asset_id: '62E0200062',
    name: 'เครื่องวัดสภาพอากาศอัตโนมัติ',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
  },
  {
    order: '10',
    asset_id: '62E0200063',
    name: 'เครื่องเชื่อมต่อสัญญาณ',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
  },
  {
    order: '11',
    asset_id: '62E0200064',
    name: 'ตัวสถานีวัดอุณหภูมิและความชื้นในใบและความชื้นในดิน',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
  },
  {
    order: '12',
    asset_id: '62E0200065',
    name: 'เซนเซอร์สำหรับวัดความชื้นและอุณหภูมิในใบไม้',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
  },
  {
    order: '13',
    asset_id: '62E0200066',
    name: 'เซนเซอร์สำหรับวัดความชื้นและอุณหภูมิในใบไม้',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
  },
  {
    order: '14',
    asset_id: '62E0200067',
    name: 'เซนเซอร์สำหรับวัดความชื้นและอุณหภูมิในใบไม้',
    year: '2564',
    status: 'Kentucky',
    useable: 'ใช้งาน',
    room_id: 'กำลังใช้',
  },
];

export const dataTable = {
  getDataTable() {
    return [
      {
        order: '1',
        asset_id: '59E1500061',
        name: 'คอมพิวเตอร์ Notebook',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'รศ.ชูเกียรติ',
        date: 'DD/MM/YY',
        inventoryStatus: 'คืน',
      },
      {
        order: '2',
        asset_id: '58E0100998',
        name: 'เครื่องบันทึกเสียง',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'รศ.ดร.อุษา',
        date: 'DD/MM/YY',
        inventoryStatus: 'คืน',
      },
      {
        order: '3',
        asset_id: '58E0200545',
        name: 'เครื่องวัดความชื้นอุณหภูมิ',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'ห้อง SC 2502',
        date: 'DD/MM/YY',
        inventoryStatus: '',
      },
      {
        order: '4',
        asset_id: '58E1500352',
        name: 'อุปกรณ์จัดเก็บข้อมูล(Server Storage)',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'ห้อง SC 2502',
        date: 'DD/MM/YY',
        inventoryStatus: 'ยืม',
      },
      {
        order: '5',
        asset_id: '62E1500008',
        name: 'คอมพิวเตอร์ Notebook',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'ดร.ณฐวัฒน์',
        date: 'DD/MM/YY',
        inventoryStatus: 'ส่งซ่อม',
      },
      {
        order: '6',
        asset_id: '62E0100045',
        name: 'เครื่องปรับอากาศ',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'สจล',
        date: 'DD/MM/YY',
        inventoryStatus: 'ยืม',
      },
      {
        order: '7',
        asset_id: '62E0100046',
        name: 'เครื่องปรับอากาศ',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'สจล',
        date: 'DD/MM/YY',
        inventoryStatus: 'ยืม',
      },
      {
        order: '8',
        asset_id: '62E0100047',
        name: 'เครื่องปรับอากาศ',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'สจล',
        date: 'DD/MM/YY',
        inventoryStatus: 'ส่งซ่อม',
      },
      {
        order: '9',
        asset_id: '62E0200062',
        name: 'เครื่องวัดสภาพอากาศอัตโนมัติ',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'สจล',
        date: 'DD/MM/YY',
        inventoryStatus: 'ส่งซ่อม',
      },
      {
        order: '10',
        asset_id: '62E0200063',
        name: 'เครื่องเชื่อมต่อสัญญาณ',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'สจล',
        date: 'DD/MM/YY',
        inventoryStatus: 'ยืม',
      },
      {
        order: '11',
        asset_id: '62E0200064',
        name: 'ตัวสถานีวัดอุณหภูมิและความชื้นในใบและความชื้นในดิน',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'สจล',
        date: 'DD/MM/YY',
        inventoryStatus: 'คืน',
      },
      {
        order: '12',
        asset_id: '62E0200065',
        name: 'เซนเซอร์สำหรับวัดความชื้นและอุณหภูมิในใบไม้',
        year: '2564',
        status: 'ใช้งานได้',
        useable: 'ใช้งาน',
        room_id: 'สจล',
        date: 'DD/MM/YY',
        inventoryStatus: 'ส่งซ่อม',
      },
    ];
  },
  getDatas() {
    return Promise.resolve(this.getDataTable());
  },
};

export const userInfoTable = {
  getUserInfoTable() {
    return [
      {
        userName: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        major: 'วิทยาการคอมพิวเตอร์ประยุกต์',
        numAsset: 10,
      },
      {
        userName: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        major: 'วิทยาการคอมพิวเตอร์ประยุกต์',
        numAsset: 10,
      },
      {
        userName: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        major: 'วิทยาการคอมพิวเตอร์ประยุกต์',
        numAsset: 10,
      },
      {
        userName: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        major: 'วิทยาการคอมพิวเตอร์ประยุกต์',
        numAsset: 10,
      },
      {
        userName: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        major: 'วิทยาการคอมพิวเตอร์ประยุกต์',
        numAsset: 10,
      },
      {
        userName: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        major: 'วิทยาการคอมพิวเตอร์ประยุกต์',
        numAsset: 10,
      },
      {
        userName: 'กิตนันท์ สมัครพงค์',
        email: 'Kisamakpong@gmail.com',
        major: 'วิทยาการคอมพิวเตอร์ประยุกต์',
        numAsset: 10,
      },
      {
        userName: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        major: 'วิทยาการคอมพิวเตอร์ประยุกต์',
        numAsset: 10,
      },
    ];
  },
  getUserDatas() {
    return Promise.resolve(this.getUserInfoTable());
  },
};

export const adminTable = {
  getAdminTable() {
    return [
      {
        picture: avatar,
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        picture: avatar,
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        picture: avatar,
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        picture: avatar,
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        picture: avatar,
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        picture: avatar,
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Head Admin',
      },
      {
        picture: avatar,
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        picture: avatar,
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
    ];
  },
  getAdminDatas() {
    return Promise.resolve(this.getAdminTable());
  },
};

export const historyTable = {
  getHistoryTable() {
    return [
      {
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Head Admin',
      },
      {
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
      {
        name: 'กิตนันท์ สมัครพงค์',
        email: 'Kittinan.samakpong@gmail.com',
        date: 'DD/MM/YY',
        role: 'Admin',
      },
    ];
  },
  getHistoryDatas() {
    return Promise.resolve(this.getHistoryTable());
  },
};
