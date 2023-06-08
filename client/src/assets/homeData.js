import React, { useState, useEffect } from 'react';
import DevicesIcon from '@mui/icons-material/Devices';
import AppBlockingIcon from '@mui/icons-material/AppBlocking';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import notebook from '../assets/notebook.jpg';
import tablet from '../assets/tablet.jpg';
import avatar from '../assets/pic.jpg';
import { HomeService } from '../service/HomeService';

const Homedata = () => {
  const [overviewAsset, setOverviewAsset] = useState([
    {
      device: 'Notebook',
      datas: [
        {
          icon: <DevicesIcon sx={{ fontSize: 35 }} />,
          title: 'จำนวนทั้งหมด',
          iconColor: '#2CBE66',
          number: 30,
        },
        {
          icon: <AppBlockingIcon sx={{ fontSize: 35 }} />,
          title: 'จำนวนที่ถูกยืม',
          iconColor: '#FFDD81',
          number: 18,
        },
        {
          icon: <BuildCircleIcon sx={{ fontSize: 35 }} />,
          title: 'จำนวนที่รอซ่อม',
          iconColor: '#FFA048',
          number: 12,
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
          number: 30,
        },
        {
          icon: <AppBlockingIcon sx={{ fontSize: 35 }} />,
          title: 'จำนวนที่ถูกยืม',
          iconColor: '#FFDD81',
          number: 18,
        },
        {
          icon: <BuildCircleIcon sx={{ fontSize: 35 }} />,
          title: 'จำนวนที่รอซ่อม',
          iconColor: '#FFA048',
          number: 12,
        },
      ],
    },
  ]);
};

export default Homedata;
