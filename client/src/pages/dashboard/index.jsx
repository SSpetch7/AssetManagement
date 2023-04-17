import React, { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import { Listbox, Transition } from '@headlessui/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import LineChart from '../../assets/chart/lineChart';
import { UserData, UserData2, SubData } from '../../assets/data/data';
import Datepickertofrom from '../../components/day';

const number1 = [
  { name: 'จำนวนของแต่ละสถานะครุภัณฑ์' },
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: '7' },
  { name: '8' },
  { name: '9' },
  { name: '10' },
];
const number2 = [
  { name: 'จำนวนครุภัณฑ์ที่เพิ่มเข้ามาใหม่' },
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: '7' },
  { name: '8' },
  { name: '9' },
  { name: '10' },
];
const number3 = [
  { name: '1980' },
  { name: '1981' },
  { name: '1982' },
  { name: '1983' },
  { name: '1984' },
  { name: '1985' },
  { name: '1986' },
  { name: '1987' },
  { name: '1988' },
  { name: '1989' },
  { name: '1990' },
  { name: '1991' },
  { name: '1992' },
  { name: '1993' },
  { name: '1994' },
  { name: '1995' },
  { name: '1996' },
  { name: '1997' },
  { name: '1998' },
  { name: '1999' },
  { name: '2000' },
  { name: '2001' },
  { name: '2002' },
  { name: '2003' },
  { name: '2004' },
  { name: '2005' },
  { name: '2006' },
  { name: '2007' },
  { name: '2008' },
  { name: '2009' },
  { name: '2010' },
  { name: '2011' },
  { name: '2012' },
  { name: '2013' },
  { name: '2014' },
  { name: '2015' },
  { name: '2016' },
  { name: '2017' },
  { name: '2018' },
  { name: '2019' },
  { name: '2020' },
  { name: '2021' },
  { name: '2022' },
  { name: '2023' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Summarize() {
  const [selected1, setSelected1] = useState(number1[0]);
  const [selected2, setSelected2] = useState(number2[0]);
  const [selected3, setSelected3] = useState(number3[0]);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.asset),
    datasets: [
      {
        label: 'จำนวนครุภัณฑ์',
        data: UserData.map((data) => data.totalAmount),
        backgroundColor: [
          'rgba(0,0,0)',
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#f3ba2f',
          '#2a71d0',
          'rgba(225,75,225,1)',
        ],
        borderColor: 'black',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  });

  const [userData2, setUserData2] = useState({
    labels: UserData2.map((data) => data.asset),
    datasets: [
      {
        label: 'จำนวนครุภัณฑ์',
        data: UserData2.map((data) => data.totalAmount),
        backgroundColor: [
          'rgba(0,0,0)',
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#f3ba2f',
          '#2a71d0',
          'rgba(225,75,225,1)',
        ],
        borderColor: 'black',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  });

  const [subData, setSubData] = useState({
    labels: SubData.map((data) => data.year),
    datasets: [
      {
        label: 'จำนวนครุภัณฑ์ในแต่ละปี',
        data: SubData.map((data) => data.number),
        backgroundColor: ['#d02a2a'],
        borderColor: 'black',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  });

  let [categories] = useState({
    ครุภัณฑ์: [
      {
        id: 1,
        title: userData,
      },
    ],
    บุคลากร: [
      {
        id: 1,
        title: userData2,
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
      <div className="flex pt-10 flex-row justify-center items-center">
        <div className="bg-white  w-3/12 p-3 h-32 rounded-l-xl  gap-4">
          <div className="pl-10 pt-2 ">
            <p className="text-2xl flex items-center">จำนวนอุปกรณ์ทั้งหมด</p>
            <div className="pt-2">
              <span className="text-kmuttColor-800 font-bold text-5xl">
                100
              </span>
              <span className="text-gray-400 text-xl pl-4">ชิ้น</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-3/12 h-32  p-3 border-2 border-white border-x-gray-200  gap-4">
          <div className="pl-10 pt-2 ">
            <p className="text-2xl">จำนวนอุปกรณ์ที่ใช้งาน</p>
            <div className="pt-2">
              <span className="text-kmuttColor-800 font-bold text-5xl">
                100
              </span>
              <span className="text-gray-400 text-xl  pl-4">ชิ้น</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-3/12 h-32  p-3 rounded-r-xl  gap-4">
          <div className="pl-10 pt-2">
            <p className="text-2xl">จำนวนอุปกรณ์ที่ใช้ได้</p>
            <div className="pt-2">
              <span className="text-kmuttColor-800 font-bold text-5xl">
                100
              </span>
              <span className="text-gray-400 text-xl  pl-4">ชิ้น</span>
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
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-t-lg bg-white p-1">
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
                      <div className="grid grid-cols-3 grid-rows-8 gap-8 h-full pl-8 pr-8 pb-8">
                        <div className="col-span-2 row-span-8 gap-2 w-full h-full">
                          <div className="grid grid-cols-1 grid-rows-8 w-full h-full">
                            <div className="col-span-1 row-span-1">
                              <Listbox
                                value={selected2}
                                onChange={setSelected2}
                              >
                                <div className="relative mt-1 p-5">
                                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">
                                      {selected2.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ArrowDropDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {number2.map((person, personIdx) => (
                                        <Listbox.Option
                                          key={personIdx}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active
                                                ? 'bg-amber-100 text-amber-900'
                                                : 'text-gray-900'
                                            }`
                                          }
                                          value={person}
                                        >
                                          {({ selected2 }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected2
                                                    ? 'font-medium'
                                                    : 'font-normal'
                                                }`}
                                              >
                                                {person.name}
                                              </span>
                                              {selected2 ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>
                            <div className="col-span-1 row-span-7 flex justify-center items-center w-full h-full">
                              {posts.map((post) => (
                                <div className="flex justify-center items-center pr-3 pl-3 w-full h-full">
                                  <div style={{ width: '100%' }}>
                                    <LineChart chartData={post.title} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1 row-span-8 w-full h-full">
                          <Datepickertofrom />
                        </div>
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="w-full h-full">
              <div className="bg-white rounded-xl shadow-md w-full h-full">
                <div className="w-full h-full p-5">
                  <div className="col-span-1 row-span-1 w-full h-full">
                    <Listbox value={selected1} onChange={setSelected1}>
                      <div className="relative mt-1 p-5">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">
                            {selected1.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ArrowDropDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {number1.map((person, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? 'bg-amber-100 text-amber-900'
                                      : 'text-gray-900'
                                  }`
                                }
                                value={person}
                              >
                                {({ selected1 }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected1
                                          ? 'font-medium'
                                          : 'font-normal'
                                      }`}
                                    >
                                      {person.name}
                                    </span>
                                    {selected1 ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <div className="col-span-1 row-span-8 flex justify-center items-center w-full h-full">
                    <div className="flex justify-center items-center pr-5 pl-5 w-full h-full">
                      <div style={{ width: '100%' }}>
                        <LineChart chartData={subData} />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 row-span-1 grid grid-cols-10 grid-rows-1 gap-4 w-full h-full">
                    <p className="col-span-1 pt-8 pl-1 text-sm text-gray-600 font-medium flex justify-center">
                      ปีงบประมาณ
                    </p>
                    <div className="col-span-9 pb-2 pr-2 pt-5 pb-5">
                      <Listbox value={selected3} onChange={setSelected3}>
                        <div className="relative mt-1 pr-4">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                              {selected3.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ArrowDropDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {number3.map((person, personIdx) => (
                                <Listbox.Option
                                  key={personIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? 'bg-amber-100 text-amber-900'
                                        : 'text-gray-900'
                                    }`
                                  }
                                  value={person}
                                >
                                  {({ selected3 }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected3
                                            ? 'font-medium'
                                            : 'font-normal'
                                        }`}
                                      >
                                        {person.name}
                                      </span>
                                      {selected3 ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                </div>
              </div>
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
