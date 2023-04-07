import React, { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import LineChart from '../components/chart/lineChart';
import PieChart from '../components/chart/pieChart';
import { UserData, SubData } from '../data';
import Datepickertofrom from '../components/chart/day';

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
  let [categories] = useState({
    ครุภัณฑ์: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    บุคลากร: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
  });
  const [selected1, setSelected1] = useState(number1[0]);
  const [selected2, setSelected2] = useState(number2[0]);
  const [selected3, setSelected3] = useState(number3[0]);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained',
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });
  const [subData, setSubData] = useState({
    labels: SubData.map((data) => data.status),
    datasets: [
      {
        label: 'Subjects Status',
        data: SubData.map((data) => data.subGain),
        backgroundColor: ['#d02a2a', '#f3ba2f', '#50AF95'],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  });
  return (
    <div>
      <div className="flex flex-col-2 justify-start p-2">
        <div className="text-3xl p-4">Dashboard</div>
        <div className="text-md pt-7 text-gray-400">แดชบอร์ด</div>
      </div>
      <div className="px-5">
        <hr className="h-px my-1 bg-gray-300 border-0" />
      </div>
      <div>
        <div className="p-5">
          <div className="h-4"></div>
          <div>
            <div className="bg-gray-200 rounded-xl shadow-md">
              <div className="grid grid-cols-3 grid-rows-1 h-24">
                <div className="bg-white p-2.5 rounded-l-xl grid grid-rows-5 grid-flow-col gap-4">
                  <div class="row-span-4 col-span-1"></div>
                  <div class="row-span-1 col-span-1"></div>
                  <div class="row-span-2 col-span-11">
                    <div className="h-1"></div>
                    <p class="text-md text-gray-600 font-medium">
                      จำนวนอุปกรณ์ทั้งหมด
                    </p>
                  </div>
                  <div class="row-span-2 col-span-11">
                    <div class="grid grid-rows-1 grid-flow-col">
                      <p class="col-span-1 text-2xl text-orange-500 font-medium">
                        100
                      </p>
                      <p class="col-span-2 text-md text-gray-400 font-medium pr-4 pt-1.5">
                        ชิ้น
                      </p>
                      <p class="col-span-9"></p>
                    </div>
                  </div>
                  <div class="row-span-1 col-span-11"></div>
                  <div class="row-span-2 col-span-1"></div>
                  <div class="row-span-3 col-span-1">
                    <p class="text-xs text-green-500 font-medium items-right justify-right pt-4">
                      +3
                    </p>
                  </div>
                </div>
                <div className="bg-white p-2.5 border-2 border-white border-x-gray-200 grid grid-rows-5 grid-flow-col gap-4">
                  <div class="row-span-4 col-span-1"></div>
                  <div class="row-span-1 col-span-1"></div>
                  <div class="row-span-2 col-span-11">
                    <div className="h-1"></div>
                    <p class="text-md text-gray-600 font-medium">
                      จำนวนอุปกรณ์ที่ใช้งาน
                    </p>
                  </div>
                  <div class="row-span-2 col-span-11">
                    <div class="grid grid-rows-1 grid-flow-col">
                      <p class="col-span-1 text-2xl text-orange-500 font-medium">
                        49
                      </p>
                      <p class="col-span-2 text-md text-gray-400 font-medium pr-4 pt-1.5">
                        ชิ้น
                      </p>
                      <p class="col-span-9"></p>
                    </div>
                  </div>
                  <div class="row-span-1 col-span-11"></div>
                  <div class="row-span-2 col-span-1"></div>
                  <div class="row-span-3 col-span-1">
                    <p class="text-xs text-green-500 font-medium items-right justify-right pt-4">
                      +3
                    </p>
                  </div>
                </div>
                <div className="bg-white p-2.5 rounded-r-xl grid grid-rows-5 grid-flow-col gap-4">
                  <div class="row-span-4 col-span-1"></div>
                  <div class="row-span-1 col-span-1"></div>
                  <div class="row-span-2 col-span-11">
                    <div className="h-1"></div>
                    <p class="text-md text-gray-600 font-medium">
                      จำนวนอุปกรณ์ที่ใช้ได้
                    </p>
                  </div>
                  <div class="row-span-2 col-span-11">
                    <div class="grid grid-rows-1 grid-flow-col">
                      <p class="col-span-1 text-2xl text-orange-500 font-medium">
                        87
                      </p>
                      <p class="col-span-2 text-md text-gray-400 font-medium pr-4 pt-1.5">
                        ชิ้น
                      </p>
                      <p class="col-span-9"></p>
                    </div>
                  </div>
                  <div class="row-span-1 col-span-11"></div>
                  <div class="row-span-2 col-span-1"></div>
                  <div class="row-span-3 col-span-1">
                    <p class="text-xs text-red-500 font-medium items-right justify-right pt-4">
                      -1
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-8"></div>
          <div>
            <p class="text-3xl text-orange-500 font-medium">แผนภูมิ</p>
          </div>
          <div className="h-5"></div>
          <div>
            <div className="grid grid-rows-6 grid-cols-5 gap-8 ">
              <div className="row-span-6 col-span-3 bg-white rounded-lg">
                <div className="w-full sm:px-0 shadow-md rounded-lg">
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-t-lg bg-white p-1">
                      {Object.keys(categories).map((category) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              'w-full rounded-t-lg py-2.5 text-sm font-medium leading-5 text-black',
                              'ring-orange-400 ring-opacity-60 ring-offset-2 ring-offset-orange-400 focus:outline-none focus:ring-2 focus:text-white',
                              selected
                                ? 'bg-orange-400 text-white'
                                : 'text-white hover:bg-orange-200 hover:text-white'
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
                            'rounded-b-lg bg-white p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                          )}
                        >
                          <div className="grid grid-cols-2 grid-rows-8 gap-8 h-full">
                            <div className="col-span-1 row-span-8">
                              <div>
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
                                        <ChevronDownIcon
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

                              <div className="flex justify-center">
                                <div style={{ width: 300, height: 225 }}>
                                  <LineChart chartData={userData} />
                                </div>
                              </div>
                            </div>
                            <div className="col-span-1 row-span-8">
                              <Datepickertofrom />
                            </div>
                          </div>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
              <div className="row-span-6 col-span-2 bg-gray-100">
                <div className="row-span-1 col-span-2 bg-gray-100">
                  <div className="h-12 max-h-full"></div>
                </div>
                <div className="bg-gray-100">
                  <div className="bg-white rounded-xl shadow-md">
                    <div className="h-full">
                      <div>
                        <Listbox value={selected1} onChange={setSelected1}>
                          <div className="relative mt-1 p-5">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate">
                                {selected1.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
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
                      <div className="flex justify-center h-full\">
                        <div style={{ width: 200, height: 200 }}>
                          <PieChart chartData={subData} />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 grid-rows-1 gap-4">
                        <p className="col-span-1 pt-3 pl-1 text-sm text-gray-600 font-medium flex justify-center">
                          ปีงบประมาณ
                        </p>
                        <div className="col-span-3 pb-2 pr-2">
                          <Listbox value={selected3} onChange={setSelected3}>
                            <div className="relative mt-1">
                              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">
                                  {selected3.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronDownIcon
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
        </div>
      </div>
    </div>
  );
}
