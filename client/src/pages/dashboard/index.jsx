import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import LineChart from '../../assets/chart/lineChart';
import LineChart2 from '../../assets/chart/lineChart2';
import PieChart from '../../assets/chart/pieChart';
import { UserData2, SubData, StatusData } from '../../assets/data/data';
import CalendarStart from '../../components/CalendarStart';
import CalendarEnd from '../../components/CalendarEnd';
import AmountAsset from '../../components/dropdownAsset';
import Status from '../../components/dropdownStatus';
import Year from '../../components/dropdownYear';
import User from '../../components/dropdownUser';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { Height } from '@mui/icons-material';
import { ChartService } from '../../service/ChartService';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Summarize() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullYear, setFullYear] = useState();

  const Asset = [
    { name: 'จำนวนครุภัณฑ์ทั้งหมด', id: null },
    { name: 'สำนักงาน', id: '1' },
    { name: 'อาคารสำนักงาน', id: '4' },
    { name: 'การศึกษา', id: '2' },
    { name: 'คอมพิวเตอร์ทั้งหมด', id: '3' },
    { name: 'เครื่องคอมพิวเตอร์', id: '1' },
    { name: 'โน๊ตบุ๊ค', id: '2' },
    { name: 'แท็บเล็ต', id: '3' },
    { name: 'อื่นๆ', id: '5' },
  ];

  const [selectedAsset, setSelectedAsset] = useState(Asset[0]);
  const [numberCateAndSubYear, setNumberCateAndSubYear] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    console.log(selectedAsset);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const fetchData = async () => {
      let data;
      if (selectedAsset.name === 'จำนวนครุภัณฑ์ทั้งหมด') {
        data = await ChartService.getAssetYear();
      } else if (
        selectedAsset.name === 'สำนักงาน' ||
        selectedAsset.name === 'การศึกษา' ||
        selectedAsset.name === 'คอมพิวเตอร์ทั้งหมด' ||
        selectedAsset.name === 'อาคารสำนักงาน' ||
        selectedAsset.name === 'อื่นๆ'
      ) {
        data = await ChartService.getCateAssetYear(selectedAsset.id);
      } else if (
        selectedAsset.name === 'เครื่องคอมพิวเตอร์' ||
        selectedAsset.name === 'โน๊ตบุ๊ค' ||
        selectedAsset.name === 'แท็บเล็ต'
      ) {
        data = await ChartService.getSubAssetYear(selectedAsset.id);
      }

      return await fillFullYear(data);
    };

    fetchData().then((data) => {
      setNumberCateAndSubYear(data);

      const chartData = {
        labels: data.map((data) => data.asset_year),
        datasets: [
          {
            data: data.map((data) => data.total_asset_in_year),
            backgroundColor: ['#FFB39F'],
            borderColor: '#FF8261',
            fill: false,
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      };

      const chartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
            title: {
              display: true,
              text: 'ปี (พ.ศ.)',
            },
          },
          y: {
            weight: 2,
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                if (value % 1 === 0) {
                  return value;
                }
              },
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
            title: {
              display: true,
              text: 'จำนวนครุภัณฑ์ทั้งหมด',
            },
          },
        },
      };

      setChartData(chartData);
      setChartOptions(chartOptions);
    });
  }, [selectedAsset]);

  const Status = [
    { name: 'สถานะครุภัณฑ์ทั้งหมด', id: null },
    { name: 'ใช้งานได้', id: '1' },
    { name: 'รอซ่อม', id: '2' },
    { name: 'สิ้นสภาพ', id: '3' },
    { name: 'แทงจำหน่าย', id: '4' },
  ];
  const [selectedStatus, setSelectedStatus] = useState(Status[0]);
  const [numberStatusYear, setNumberStatusYear] = useState(null);
  const [chartData2, setChartData2] = useState({});
  const [chartOptions2, setChartOptions2] = useState({});

  const [assetAll, setAssetAll] = useState('');
  const [assetUseable, setAssetUseable] = useState('');

  useEffect(() => {
    ChartService.getNumberAllAsset().then((data) => setAssetAll(data));
    ChartService.getNumberUseAble().then((data) => setAssetUseable(data));
  });

  useEffect(() => {
    console.log(selectedStatus);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const fetchData = async () => {
      let data;
      let texts;
      let backgroundColors;
      let borderColors;
      if (selectedStatus.name === 'สถานะครุภัณฑ์ทั้งหมด') {
        data = await ChartService.getNumberStatus();
        backgroundColors = [
          'rgba(0, 255, 0, 0.4)',
          'rgba(255,130,97,0.4)',
          'rgba(255, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0.4)',
        ];
        borderColors = [
          'rgba(0, 255, 0)',
          'rgba(255,130,97)',
          'rgba(255, 0, 0)',
          'rgba(0, 0, 0)',
        ];
        texts = 'สถานะครุภัณฑ์';
      } else if (
        selectedStatus.name === 'ใช้งานได้' ||
        selectedStatus.name === 'รอซ่อม' ||
        selectedStatus.name === 'สิ้นสภาพ' ||
        selectedStatus.name === 'แทงจำหน่าย'
      ) {
        data = await ChartService.getStatusYear(selectedStatus.id);
        texts = 'ปี (พ.ศ.)';
        if (selectedStatus.name === 'ใช้งานได้') {
          backgroundColors = ['rgba(0, 255, 0, 0.4)'];
          borderColors = ['rgba(0, 255, 0)'];
        } else if (selectedStatus.name === 'รอซ่อม') {
          backgroundColors = ['rgba(255,130,97,0.4)'];
          borderColors = ['rgba(255,130,97)'];
        } else if (selectedStatus.name === 'สิ้นสภาพ') {
          backgroundColors = ['rgba(255, 0, 0, 0.4)'];
          borderColors = ['rgba(255, 0, 0)'];
        } else if (selectedStatus.name === 'แทงจำหน่าย') {
          backgroundColors = ['rgba(0, 0, 0, 0.4)'];
          borderColors = ['rgba(0, 0, 0)'];
        }
      }
      if (selectedStatus.name === 'สถานะครุภัณฑ์ทั้งหมด') {
        return { data, backgroundColors, borderColors, texts };
      } else if (
        selectedStatus.name === 'ใช้งานได้' ||
        selectedStatus.name === 'รอซ่อม' ||
        selectedStatus.name === 'สิ้นสภาพ' ||
        selectedStatus.name === 'แทงจำหน่าย'
      ) {
        await fillFullStatusYear(data);
        return { data, backgroundColors, borderColors, texts };
      }
    };

    fetchData().then(({ data, backgroundColors, borderColors, texts }) => {
      setNumberStatusYear(data);

      const chartData2 = {
        labels: data.map((data) => data.status),
        datasets: [
          {
            label: 'Status',
            data: data.map((data) => data.total_status),
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2,
          },
        ],
      };

      const chartOptions2 = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
            title: {
              display: true,
              text: texts,
            },
          },
          y: {
            suggestedMin: 0,
            suggestedMax: 10,
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                if (value % 1 === 0) {
                  return value;
                }
              },
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
            title: {
              display: true,
              text: 'จำนวนครุภัณฑ์ทั้งหมด',
            },
          },
        },
      };

      setChartData2(chartData2);
      setChartOptions2(chartOptions2);
    });
  }, [selectedStatus]);

  const fillFullYear = async (data) => {
    const fillObj = [];
    const firstYear = parseInt(data[0].asset_year, 10);

    const currentYear = new Date().getFullYear();
    const lastYear = currentYear + 543;

    for (let year = firstYear; year <= lastYear; year++) {
      const obj = {
        asset_year: year.toString(),
        total_asset_in_year: 0,
      };
      fillObj.push(obj);
    }
    const mergeObj = fillObj.map((item) => {
      const matching = data.find(
        (item2) => item2.asset_year === item.asset_year
      );
      if (matching !== undefined) {
        return {
          asset_year: item.asset_year,
          total_asset_in_year: matching.total_asset_in_year,
        };
      } else {
        return item;
      }
    });
    return mergeObj;
  };

  const fillFullStatusYear = async (data) => {
    const fillObj = [];
    const firstYear = parseInt(data[0].status, 10);

    const currentYear = new Date().getFullYear();
    const lastYear = currentYear + 543;

    for (let year = firstYear; year <= lastYear; year++) {
      const obj = {
        status: year.toString(),
        total_status: 0,
      };
      fillObj.push(obj);
    }
    const mergeObj = fillObj.map((item) => {
      const matching = data.find((item2) => item2.status === item.status);
      if (matching !== undefined) {
        return {
          status: item.status,
          total_status: matching.total_status,
        };
      } else {
        return item;
      }
    });
    return mergeObj;
  };

  return (
    <div className="mt-12">
      <div className=" pb-10">
        <span className="pl-32 font-bold  text-4xl text-gray-600 items-start">
          Dashboard
        </span>
        <span className="text-gray-400  pl-2">สรุปผล</span>
      </div>
      <div className="pl-36 font-bold text-4xl text-kmuttColor-800 items-start">
        ภาพรวมครุภัณฑ์
      </div>
      <div className="flex pt-10 flex-row justify-center items-center pl-32 pr-32">
        <div className="bg-gray-200 rounded-xl shadow-md w-full h-full">
          <div className="grid grid-cols-3 grid-rows-1 h-24">
            <div className="bg-white p-2.5 rounded-l-xl grid grid-rows-5 grid-flow-col gap-4">
              <div className="row-span-4 col-span-1"></div>
              <div className="row-span-1 col-span-1"></div>
              <div className="row-span-2 col-span-11">
                <div className="h-1"></div>
                <p className="sm:text-sm md:text-base lg:text-2xl text-gray-600 font-medium">
                  จำนวนอุปกรณ์ทั้งหมดที่ใช้งานได้
                </p>
              </div>
              <div className="row-span-2 col-span-11">
                <div className="grid grid-rows-1 grid-cols-2 flow justify-between">
                  <div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col gap-2">
                      <p className="col-span-1 text-4xl text-kmuttColor-800 font-bold">
                        {assetAll}
                      </p>
                      <p className="col-span-2 text-2xl text-gray-400 font-medium pr-4 pt-1.5">
                        ชิ้น
                      </p>
                    </div>
                  </div>
                  {/*<div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col">
                      <p className="sm:col-span-1 md:col-span-2 lg:col-span-3"></p>
                      <p className="lg:text-right col-span-1 text-xl text-green-500 font-medium items-right justify-right pt-4">+3</p>
                    </div>
                  </div>*/}
                </div>
              </div>
            </div>
            <div className="bg-white p-2.5 border-2 border-white border-x-gray-200 grid grid-rows-5 grid-flow-col gap-4">
              <div className="row-span-4 col-span-1"></div>
              <div className="row-span-1 col-span-1"></div>
              <div className="row-span-2 col-span-11">
                <div className="h-1"></div>
                <p className="sm:text-sm md:text-base lg:text-2xl text-gray-600 font-medium">
                  จำนวนอุปกรณ์ที่กำลังใช้งาน
                </p>
              </div>
              <div className="row-span-2 col-span-11">
                <div className="grid grid-rows-1 grid-cols-2 flow justify-between">
                  <div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col gap-2">
                      <p className="col-span-1 text-4xl text-kmuttColor-800 font-bold">
                        {assetUseable[0]}
                      </p>
                      <p className="col-span-2 text-2xl text-gray-400 font-medium pr-4 pt-1.5">
                        ชิ้น
                      </p>
                    </div>
                  </div>
                  {/*<div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col">
                      <p className="sm:col-span-1 md:col-span-2 lg:col-span-3"></p>
                      <p className="lg:text-right col-span-1 text-xl text-green-500 font-medium items-right justify-right pt-4">+3</p>
                    </div>
                  </div>*/}
                </div>
              </div>
            </div>
            <div className="bg-white p-2.5 rounded-r-xl grid grid-rows-5 grid-flow-col gap-4">
              <div className="row-span-4 col-span-1"></div>
              <div className="row-span-1 col-span-1"></div>
              <div className="row-span-2 col-span-11">
                <div className="h-1"></div>
                <p className="sm:text-sm md:text-base lg:text-2xl text-gray-600 font-medium">
                  จำนวนอุปกรณ์ที่ไม่ใช้ได้งาน
                </p>
              </div>
              <div className="row-span-2 col-span-11">
                <div className="grid grid-rows-1 grid-cols-2 flow justify-between">
                  <div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col gap-2">
                      <p className="col-span-1 text-4xl text-kmuttColor-800 font-bold">
                        {assetUseable[1]}
                      </p>
                      <p className="col-span-2 text-2xl text-gray-400 font-medium pr-4 pt-1.5">
                        ชิ้น
                      </p>
                    </div>
                  </div>
                  {/*<div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col">
                      <p className="sm:col-span-1 md:col-span-2 lg:col-span-3"></p>
                      <p className="lg:text-right col-span-1 text-xl text-green-500 font-medium items-right justify-right pt-4">-1</p>
                    </div>
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-10 pl-36 font-bold text-4xl  text-kmuttColor-800 items-start">
        แผนภูมิ
      </div>
      <div className="flex flex-row justify-center items-center pl-32 pr-32 ">
        <div className="contact-between w-full h-full">
          <div className="rounded-lg pb-10 w-full h-full">
            <div className="sm:px-0 shadow-md rounded-lg w-full h-full">
              <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              >
                <TabPanel header="ครุภัณฑ์">
                  <div className="grid grid-cols-1 grid-rows-8 gap-8 h-full pl-8 pr-8 pb-8">
                    <div className="col-span-2 row-span-8 gap-2 w-full h-full">
                      <div className="grid grid-cols-1 grid-rows-8 w-full h-full">
                        <div className="relative p-5 col-span-1 row-span-1 w-full flex justify-center">
                          <div className="card flex justify-content-center w-4/5 h-full">
                            <Dropdown
                              value={selectedAsset}
                              onChange={(e) => setSelectedAsset(e.value)}
                              options={Asset}
                              optionLabel="name"
                              placeholder={selectedAsset}
                              className="p-invalid w-full md:w-14rem"
                            />
                          </div>
                        </div>
                        <div className="col-span-1 row-span-7 flex justify-center items-center w-full h-full">
                          <div className="flex justify-center items-center pr-3 pl-3 w-full h-full pb-3">
                            <div className="w-full flex justify-center items-center">
                              <div className="card">
                                <Chart
                                  type="line"
                                  data={chartData}
                                  options={chartOptions}
                                  style={{ width: '700px', height: '400px' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel header="สถานะ">
                  <div className="grid grid-cols-1 grid-rows-8 gap-8 h-full pl-8 pr-8 pb-8">
                    <div className="col-span-2 row-span-8 gap-2 w-full h-full">
                      <div className="grid grid-cols-1 grid-rows-8 w-full h-full">
                        <div className="relative p-5 col-span-1 row-span-1 w-full flex justify-center">
                          <div className="card flex justify-content-center w-4/5 h-full">
                            <Dropdown
                              value={selectedStatus}
                              onChange={(e) => setSelectedStatus(e.value)}
                              options={Status}
                              optionLabel="name"
                              placeholder={selectedStatus}
                              className="p-invalid w-full md:w-14rem"
                            />
                          </div>
                        </div>
                        <div className="col-span-1 row-span-7 flex justify-center items-center w-full h-full">
                          <div className="flex justify-center items-center pr-3 pl-3 w-full h-full">
                            <div className="min-w-1/4 flex justify-center items-center">
                              <div className="card">
                                <Chart
                                  type="bar"
                                  data={chartData2}
                                  options={chartOptions2}
                                  style={{ width: '700px', height: '400px' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                {/*<TabPanel header="บุคลากร">
                  <div className="grid grid-cols-2 grid-rows-8 gap-8 h-full pl-8 pr-8 pb-8">
                    <div className="col-span-2 row-span-8 gap-2 w-full h-full">
                      <div className="grid grid-cols-1 grid-rows-8 w-full h-full">
                        <div className="relative p-5 col-span-1 row-span-1 w-full flex justify-center">
                          <div className="card flex justify-content-center w-4/5 h-11/12">
                            <Dropdown
                              value={selectedUser}
                              onChange={(e) => setSelectedUser(e.value)}
                              options={User}
                              optionLabel="name"
                              placeholder={selectedUser}
                              className="p-invalid w-full md:w-14rem"
                            />
                          </div>
                        </div>
                        <div className="pt-2"></div>
                        <div className="col-span-1 row-span-7 flex justify-center items-center w-full h-full">
                          <div className="flex justify-center items-center pr-3 pl-3 w-full h-full pb-16">
                            <div className="w-4/5 flex justify-center items-center">
                              <LineChart chartData={userData2} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>*/}
              </TabView>
            </div>
          </div>
        </div>
      </div>
      <div className="m-16">
        <p className="text-gray-700 text-center  m-16"> 2023 Final Project </p>
      </div>
    </div>
  );
}
