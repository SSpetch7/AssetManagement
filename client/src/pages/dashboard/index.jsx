import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import LineChart from "../../assets/chart/lineChart";
import LineChart2 from "../../assets/chart/lineChart2";
import PieChart from "../../assets/chart/pieChart";
import { UserData2, SubData, StatusData } from "../../assets/data/data";
import CalendarStart from "../../components/CalendarStart";
import CalendarEnd from "../../components/CalendarEnd";
import AmountAsset from "../../components/dropdownAsset";
import Status from "../../components/dropdownStatus";
import Year from "../../components/dropdownYear";
import User from "../../components/dropdownUser";
import { TabView, TabPanel } from "primereact/tabview";
import { Dropdown } from "primereact/dropdown";
import { ChartService } from "../../service/ChartService";
import { Chart } from "primereact/chart";
import { Height } from "@mui/icons-material";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Summarize() {
  const [activeIndex, setActiveIndex] = useState(0);

  let emptydatachart = [{ asset_year: null, total_asset_in_year: null }];

  const Status = [
    { name: "ทั้งหมด", id: null },
    { name: "ใช้งานได้", id: "1" },
    { name: "รอซ่อม", id: "2" },
    { name: "สิ้นสภาพ", id: "3" },
    { name: "แทงจำหน่าย", id: "4" },
  ];
  const [selectedStatus, setSelectedStatus] = useState(Status[0].name);

  const Asset = [
    { name: "จำนวนครุภัณฑ์ทั้งหมด", id: null },
    { name: "สำนักงาน", id: "1" },
    { name: "อาคารสำนักงาน", id: "4" },
    { name: "การศึกษา", id: "2" },
    { name: "คอมพิวเตอร์ทั้งหมด", id: "3" },
    { name: "เครื่องคอมพิวเตอร์", id: "1" },
    { name: "โน๊ตบุ๊ค", id: "2" },
    { name: "แท็บเล็ต", id: "3" },
    { name: "อื่นๆ", id: "5" },
  ];

  const [selectedAsset, setSelectedAsset] = useState(Asset[0]);
  const [numberCateAndSubYear, setNumberCateAndSubYear] = useState(emptydatachart);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    console.log(selectedAsset);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
  
    const fetchData = async () => {
      let data;
      if (selectedAsset.name === "จำนวนครุภัณฑ์ทั้งหมด") {
        data = await ChartService.getAssetYear();
      } else if (
        selectedAsset.name === "สำนักงาน" ||
        selectedAsset.name === "การศึกษา" ||
        selectedAsset.name === "คอมพิวเตอร์ทั้งหมด" ||
        selectedAsset.name === "อาคารสำนักงาน" ||
        selectedAsset.name === "อื่นๆ"
      ) {
        data = await ChartService.getCateAssetYear(selectedAsset.id);
      } else if (
        selectedAsset.name === "เครื่องคอมพิวเตอร์" ||
        selectedAsset.name === "โน๊ตบุ๊ค" ||
        selectedAsset.name === "แท็บเล็ต"
      ) {
        data = await ChartService.getSubAssetYear(selectedAsset.id);
      }
  
      return data;
    };
  
    fetchData().then((data) => {
      setNumberCateAndSubYear(data);
  
      const chartData = {
        labels: data.map((data) => data.asset_year),
        datasets: [
          {
            label: "First Dataset",
            data: data.map((data) => data.total_asset_in_year),
            backgroundColor: ["#d02a2a"],
            borderColor: "black",
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
              text: "ปี (พ.ศ.)",
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
            title: {
              display: true,
              text: "จำนวนครุภัณฑ์ทั้งหมด",
            },
          },
        },
      };
  
      setChartData(chartData);
      setChartOptions(chartOptions);
    });
  }, [selectedAsset]);

  const User = [
    { name: "กิตนันท์ สมัครพงค์" },
    { name: "พีรกานต์ จักรเพ็ชร" },
    { name: "นิธิโชติ มณีรัตน์ไพโรจน์" },
    { name: "..." },
  ];
  const [selectedUser, setSelectedUser] = useState(User[0].name);
  const Year = [
    { name: "2023" },
    { name: "2022" },
    { name: "2021" },
    { name: "2020" },
    { name: "2019" },
    { name: "2018" },
    { name: "2017" },
    { name: "2016" },
    { name: "2015" },
    { name: "2014" },
    { name: "2013" },
    { name: "2012" },
    { name: "2011" },
    { name: "2010" },
    { name: "2009" },
    { name: "2008" },
    { name: "2007" },
    { name: "2006" },
    { name: "2005" },
    { name: "2004" },
    { name: "2003" },
    { name: "2002" },
    { name: "2001" },
    { name: "2000" },
  ];

  const [selectedYear, setSelectedYear] = useState(Year[0].name);

  const [userData2, setUserData2] = useState({
    labels: UserData2.map((data) => data.asset),
    datasets: [
      {
        label: "จำนวนการยืมครุภัณฑ์",
        data: UserData2.map((data) => data.totalAmount),
        backgroundColor: [
          "rgba(0,0,0)",
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f3ba2f",
          "#2a71d0",
          "rgba(225,75,225,1)",
        ],
        borderColor: "black",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  });

  const [statusData, setStatusData] = useState({
    labels: StatusData.map((data) => data.status),
    datasets: [
      {
        label: "สถานะครุภัณฑ์",
        data: StatusData.map((data) => data.count),
        backgroundColor: ["#f3ba2f", "#2a71d0", "rgba(255,0,255,1)"],
        borderColor: "white",
        borderWidth: 5,
      },
    ],
  });

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
                  จำนวนอุปกรณ์ทั้งหมด
                </p>
              </div>
              <div className="row-span-2 col-span-11">
                <div className="grid grid-rows-1 grid-cols-2 flow justify-between">
                  <div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col gap-2">
                      <p className="col-span-1 text-4xl text-kmuttColor-800 font-bold">
                        100
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
                  จำนวนอุปกรณ์ที่ใช้งาน
                </p>
              </div>
              <div className="row-span-2 col-span-11">
                <div className="grid grid-rows-1 grid-cols-2 flow justify-between">
                  <div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col gap-2">
                      <p className="col-span-1 text-4xl text-kmuttColor-800 font-bold">
                        49
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
                  จำนวนอุปกรณ์ที่ใช้ได้
                </p>
              </div>
              <div className="row-span-2 col-span-11">
                <div className="grid grid-rows-1 grid-cols-2 flow justify-between">
                  <div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col gap-2">
                      <p className="col-span-1 text-4xl text-kmuttColor-800 font-bold">
                        87
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
                  <div className="pt-4"></div>
                  <div className="grid grid-cols-3 grid-rows-8 gap-8 h-full pl-8 pr-8 pb-8">
                    <div className="col-span-2 row-span-8 gap-2 w-full h-full">
                      <div className="grid grid-cols-1 grid-rows-8 w-full h-full">
                        <div className="relative p-5 col-span-1 row-span-1 w-full flex justify-center">
                          <div className="card flex justify-content-center w-full">
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
                        <div className="pt-8"></div>
                        <div className="col-span-1 row-span-7 flex justify-center items-center w-full h-full">
                          <div className="flex justify-center items-center pr-3 pl-3 w-full h-full pb-3">
                            <div className="w-full flex justify-center items-center">
                              <div className="card">
                                <Chart
                                  type="line"
                                  data={chartData}
                                  options={chartOptions}
                                  style={{ width: "600px", height: "300px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 row-span-8 w-full h-full">
                      <div className="row fthight">
                        <div className="col-sm-8  mt-3">
                          <div className="pt-5"></div>
                          <p class="w-full col-span-1 text-2xl text-orange-500 font-medium flex justify-center">
                            เริ่มต้น
                          </p>
                          <div className="row mb-4 w-full">
                            <div className="col-sm-5 w-full">
                              <p class="text-sm text-gray-600 font-medium">
                                เลือกวันที่
                              </p>
                              <div className="h-4"></div>
                              <CalendarStart />
                            </div>
                          </div>
                          <p class="w-full col-span-1 text-2xl text-orange-500 font-medium flex justify-center">
                            ถึง
                          </p>
                          <div className="row mb-4 w-full">
                            <div className="col-sm-5 w-full">
                              <p class="text-sm text-gray-600 font-medium">
                                เลือกวันที่
                              </p>
                              <div className="h-4"></div>
                              <CalendarEnd />
                            </div>
                          </div>
                          <div className="pt-16"></div>
                          <div className="row mb-4 bg-orange-400 rounded-md p-2">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-5">
                              <button className="w-full btn btn-success flex justify-center text-white">
                                {" "}
                                ค้นหา{" "}
                              </button>
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
                              <PieChart chartData={statusData} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 row-span-1 grid grid-cols-10 grid-rows-1 gap-4 w-full h-full">
                      <div className="col-span-1"></div>
                      <p className="col-span-1 pt-3 pl-1 text-sm text-gray-600 font-medium flex justify-center">
                        ปีงบประมาณ
                      </p>
                      <div className="relative col-span-7">
                        <div className="card flex justify-content-center w-full h-11/12">
                          <Dropdown
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.value)}
                            options={Year}
                            optionLabel="name"
                            placeholder={selectedYear}
                            className="p-invalid w-full md:w-14rem"
                          />
                        </div>
                      </div>
                      <div className="col-span-1"></div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel header="บุคลากร">
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
                </TabPanel>
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
