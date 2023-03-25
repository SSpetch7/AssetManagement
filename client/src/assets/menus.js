import HomeIcon from '@mui/icons-material/Home';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import HistoryIcon from '@mui/icons-material/History';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

export const menus = [
  {
    title: '',
    links: [
      {
        name: 'Home',
        nameTh: 'หน้าแรก',
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: 'จัดการครุภัณฑ์',
    links: [
      {
        name: 'allAsset',
        nameTh: 'ครุภัณฑ์ทั้งหมด',
        icon: <DevicesOtherIcon />,
      },
      {
        name: 'checkAsset',
        nameTh: 'ตรวจเช็คครุภัณฑ์',
        icon: <PublishedWithChangesIcon />,
      },
    ],
  },
  {
    title: '',
    links: [
      {
        name: 'Dashboard',
        nameTh: 'สรุปผลรวม',
        icon: <InsertChartIcon />,
      },
    ],
  },
  {
    title: '',
    links: [
      {
        name: 'borrowHistory',
        nameTh: 'ประวัติการยืม',
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: '',
    links: [
      {
        name: 'borrower',
        nameTh: 'ข้อมูลผู้ยืม',
        icon: <AccountBoxIcon />,
      },
    ],
  },
  {
    title: '',
    links: [
      {
        name: 'admin',
        nameTh: 'ผู้ดูแล',
        icon: <AdminPanelSettingsIcon />,
      },
    ],
  },
];
