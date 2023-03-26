import DevicesIcon from '@mui/icons-material/Devices';
import AppBlockingIcon from '@mui/icons-material/AppBlocking';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import notebook from '../assets/notebook.jpg';
import tablet from '../assets/tablet.png';

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
