import React, { useState } from 'react';
import { overviewAsset, mostActivity, roomAtAsset } from '../../assets/dummy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LineChart from '../../assets/chart/lineChart';
import { UserData } from '../../assets/data/data';

const Home = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.asset),
    datasets: [
      {
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
  return (
    <div className="mt-12">
      <div className=" pb-10">
        <span className="pl-32 labtop:pl-20 font-bold  text-4xl text-gray-600 items-start">
          Home
        </span>
        <span className="text-gray-400  pl-2">หน้าแรก</span>
        {/* <div className="border-b w-96 pl-42"></div> */}
      </div>
      <div className="pl-36 labtop:pl-20 font-bold text-4xl  text-kmuttColor-800 items-start">
        ภาพรวมครุภัณฑ์
      </div>
      <div className="flex flex-col justify-center items-center">
        {overviewAsset.map((item) => (
          <div
            key={item.device}
            className=" bg-kmuttColor-bg-menu h-56 rounded-xl labtop:w-10/12 w-9/12 border border-gray-300 px-8 pt-6 m-3 "
          >
            <div>
              <div className="flex justify-start item-start pb-4">
                <p className="font-bold text-3xl  text-gray-400">
                  {item.device}
                </p>
              </div>

              <div className="flex m-3 flex-wrap justify-between gap-1 items-center">
                {item.datas.map((data) => (
                  //   <>
                  <div
                    key={data.title}
                    className="flex bg-white h-24 w-48 rounded-xl "
                  >
                    <div
                      style={{ color: data.iconColor }}
                      className="flex items-end pb-6 pl-4"
                    >
                      {data.icon}
                    </div>
                    <div className="pl-4 flex flex-col self-center  ">
                      <div className="text-2xl  text-gray-400 ">
                        {data.title}
                      </div>
                      <div className="text-4xl  font-bold text-gray-500">
                        {data.number}
                      </div>
                    </div>
                  </div>
                  //   </>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="font-bold text-4xl flex text-kmuttColor-800  mt-12 pl-36">
        <span>แสดงจำนวนครุภัณฑ์</span>
      </div>
      <div className="">
        <div className="flex justify-center p-10">
          <div style={{ width: '60%' }}>
            <LineChart chartData={userData} />
          </div>
        </div>
      </div>
      <div className="m-16">
        <p className="text-gray-700 text-center  m-16"> 2023 Final Project </p>
      </div>
    </div>
  );
};

export default Home;
