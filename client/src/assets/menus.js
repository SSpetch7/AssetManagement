import HomeIcon from '@mui/icons-material/Home';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import HistoryIcon from '@mui/icons-material/History';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DevicesIcon from '@mui/icons-material/Devices';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export const menus = [
  {
    name: 'asset',
    nameTh: 'ครุภัณฑ์',
    icon: DevicesIcon,
    menus: [
      { name: 'allAsset', nameTh: 'ครุภัณฑ์ทั้งหมด' },
      { name: 'eachRoom', nameTh: 'ครุภัณฑ์ตามห้อง' },
    ],
  },
  //   {
  //     name: 'type',
  //     nameTh: 'ประเภทครุภัณฑ์',
  //     icon: DevicesOtherIcon,
  //     menus: [
  //       { name: 'computer', nameTh: 'คอมพิวเตอร์' },
  //       { name: 'tablet', nameTh: 'แท็บแลต' },
  //       { name: 'office', nameTh: 'สำนักงาน' },
  //     ],
  //   },
  {
    name: 'AssetManage',
    nameTh: 'การจัดการครุภัณฑ์',
    icon: FactCheckIcon,
    menus: [
      { name: 'add', nameTh: 'เพิ่มครุภัณฑ์ใหม่' },
      { name: 'delete', nameTh: 'แทงจำหน่ายครุภัณฑ์' },
      { name: 'edit', nameTh: 'แก้ไขครุภัณฑ์' },
    ],
  },
];

export const borrowMenu = [
  {
    name: 'borrow',
    nameTh: 'การยืม - การคืน',
    icon: SwapHorizIcon,
    menus: [
      { name: 'borrowAsset', nameTh: 'การยืมครุภัณฑ์ส่วนกลาง' },
      { name: 'borrowHistory', nameTh: 'ประวัติการยืม' },
      { name: 'borrower', nameTh: 'ข้อมูลผู้ยืม' },
    ],
  },
];
