import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import LineChart from '../../assets/chart/lineChart';
import LineChart2 from '../../assets/chart/lineChart2';
import PieChart from '../../assets/chart/pieChart';
import { UserData2, SubData, StatusData } from '../../assets/data/data';
import CalendarStart from '../../components/CalendarStart';
import CalendarEnd from '../../components/CalendarEnd';
import AmountAsset from '../../components/dropdownAsset'
import Status from '../../components/dropdownStatus'
import Year from '../../components/dropdownYear'
import User from '../../components/dropdownUser'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Summarize() {

  const [userData2, setUserData2] = useState({
    labels: UserData2.map((data) => data.asset),
    datasets: [
      {
        label: 'จำนวนการยืมครุภัณฑ์',
        data: UserData2.map((data) => data.totalAmount),
        backgroundColor: [
          'rgba(0,0,0)',
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#f3ba2f',
          '#2a71d0',
          'rgba(225,75,225,1)'
        ],
        borderColor: 'black',
        borderWidth: 2,
        tension: 0.4
      },
    ],
  });

  const [subData, setSubData] = useState({
    labels: SubData.map((data) => data.year),
    datasets: [
      {
        label: 'จำนวนครุภัณฑ์',
        data: SubData.map((data) => data.number),
        backgroundColor: ['#d02a2a'],
        borderColor: 'black',
        borderWidth: 2,
        tension: 0.4
      },
    ],
  });

  const [statusData, setStatusData] = useState({
    labels: StatusData.map((data) => data.status),
    datasets: [
      {
        label: 'สถานะครุภัณฑ์',
        data: StatusData.map((data) => data.count),
        backgroundColor: [
          '#f3ba2f',
          '#2a71d0',
          'rgba(255,0,255,1)'
        ],
        borderColor: 'white',
        borderWidth: 5,
      },
    ],
  });

  let [categories] = useState({
    ครุภัณฑ์: [
      {
        id: 1,
        list:
          <AmountAsset />,
        chart:
          <div className="flex justify-center items-center pr-3 pl-3 w-full h-full pb-3">
            <div className="w-full flex justify-center items-center" >
              <LineChart2 chart2Data={subData} />
            </div>
          </div>,
        time: <div className="col-span-1 row-span-8 w-full h-full">
          <div className="row fthight">
            <div className="col-sm-8  mt-3">
              <div className="pt-5"></div>
              <p class="w-full col-span-1 text-2xl text-orange-500 font-medium flex justify-center">เริ่มต้น</p>
              <div className="row mb-4 w-full">
                <div className="col-sm-5 w-full">
                  <p class="text-sm text-gray-600 font-medium">เลือกวันที่</p>
                  <div className="h-4"></div>
                  <CalendarStart />
                </div>
              </div>
              <p class="w-full col-span-1 text-2xl text-orange-500 font-medium flex justify-center">ถึง</p>
              <div className="row mb-4 w-full">
                <div className="col-sm-5 w-full">
                  <p class="text-sm text-gray-600 font-medium">เลือกวันที่</p>
                  <div className="h-4"></div>
                  <CalendarEnd />
                </div>
              </div>
              <div className="pt-8"></div>
              <div className="row mb-4 bg-orange-400 rounded-md p-2">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-5">
                  <button className="w-full btn btn-success flex justify-center text-white"> ค้นหา </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        budget: <div></div>,
        col: "grid grid-cols-3 grid-rows-8 gap-8 h-full pl-8 pr-8 pb-8",
      },
    ],
    สถานะ: [
      {
        id: 2,
        list:
          <Status />,
        chart:
          <div className="flex justify-center items-center pr-3 pl-3 w-full h-full">
            <div className="min-w-1/4 flex justify-center items-center" >
              <PieChart chartData={statusData} />
            </div>
          </div>
        ,
        time: null,
        budget:
          <div className="col-span-1 row-span-1 grid grid-cols-10 grid-rows-1 gap-4 w-full h-full">
            <div className="col-span-1"></div>
            <p className="col-span-1 pt-3 pl-1 text-sm text-gray-600 font-medium flex justify-center">
              ปีงบประมาณ
            </p>
            <div className="relative col-span-7">
              <Year />
            </div>
            <div className="col-span-1"></div>
          </div>,
        col: "grid grid-cols-1 grid-rows-8 gap-8 h-full pl-8 pr-8 pb-8",
      },
    ],
    บุคลากร: [
      {
        id: 3,
        list:
          <User />,
        chart:
          <div className="flex justify-center items-center pr-3 pl-3 w-full h-full pb-16">
            <div className="w-3/5 flex justify-center items-center" >
              <LineChart chartData={userData2} />
            </div>
          </div>,
        time: null,
        budget: null,
        col: "grid grid-cols-2 grid-rows-8 gap-8 h-full pl-8 pr-8 pb-8",
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
      <div className='flex pt-10 flex-row justify-center items-center pl-32 pr-32'>
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
                  <div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col">
                      <p className="sm:col-span-1 md:col-span-2 lg:col-span-3"></p>
                      <p className="lg:text-right col-span-1 text-xl text-green-500 font-medium items-right justify-right pt-4">+3</p>
                    </div>
                  </div>
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
                  <div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col">
                      <p className="sm:col-span-1 md:col-span-2 lg:col-span-3"></p>
                      <p className="lg:text-right col-span-1 text-xl text-green-500 font-medium items-right justify-right pt-4">+3</p>
                    </div>
                  </div>
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
                  <div className="col-span-1">
                    <div className="grid grid-rows-1 grid-flow-col">
                      <p className="sm:col-span-1 md:col-span-2 lg:col-span-3"></p>
                      <p className="lg:text-right col-span-1 text-xl text-green-500 font-medium items-right justify-right pt-4">-1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-10 pl-36 font-bold text-4xl  text-kmuttColor-800 items-start">
        แผนภูมิ
      </div>
      <div className='flex flex-row justify-center items-center pl-32 pr-32 '>
        <div className="contact-between w-full h-full">
          <div className="rounded-lg pb-10 w-full h-full">
            <div className="sm:px-0 shadow-md rounded-lg w-full h-full">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-t-lg bg-white p-1 ">
                  {Object.keys(categories).map((category) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        classNames(
                          'w-full h-full rounded-t-lg py-2.5 text-sm font-medium leading-5 text-black',
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-white focus:border-2 focus:border-orange-400 focus:outline-none focus:ring-2 focus:text-white',
                          selected
                            ? 'bg-orange-400 text-white'
                            : 'text-black border-2 border-black hover:bg-orange-300 hover:text-white hover:border-2 hover:border-orange-300'
                        )
                      }
                    >
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels className="rounded-xl">
                  {Object.values(categories).map((posts, idx) => (
                    <Tab.Panel
                      key={idx}
                      className={classNames(
                        'rounded-b-lg bg-white',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                      {posts.map((post) => (
                        <div className={post.col}>
                          <div className="col-span-2 row-span-8 gap-2 w-full h-full">
                            <div className='grid grid-cols-1 grid-rows-8 w-full h-full'>
                              <div className='relative p-5 col-span-1 row-span-1 w-full flex justify-center'>
                                {post.list}
                              </div>
                              <div className='col-span-1 row-span-7 flex justify-center items-center w-full h-full'>
                                {post.chart}
                              </div>
                            </div>
                          </div>
                          {post.time}
                          {post.budget}
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
      <div className="m-16">
        <p className="text-gray-700 text-center "> 2023 Final Project </p>
      </div>
    </div>
  );
}

