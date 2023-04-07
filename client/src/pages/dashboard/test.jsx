import React from 'react';
import { overviewAsset, mostActivity, roomAtAsset } from '../../assets/dummy';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Dashboard() {
  return (
    <div className="mt-12">
      <div className=" pb-10">
        <span className="pl-32 font-bold  text-4xl text-gray-600 items-start">
          Dashboard
        </span>
        <span className="text-gray-400  pl-2">สรุปผล</span>
        {/* <div className="border-b w-96 pl-42"></div> */}
      </div>
      <div className="pl-36 font-bold text-4xl  text-kmuttColor-800 items-start">
        ภาพรวมครุภัณฑ์
      </div>
      <div className="flex pt-10 flex-row justify-center items-center">
        <div className="bg-white w-3/12 p-3 h-32  rounded-l-xl  gap-4">
          <p>จำนวนอุปกรณ์ทั้งหมด</p>
          <span className="text-kmuttColor-800 font-bold"> 100</span>
          <span className="text-gray-400  pl-2">ชิ้น</span>
        </div>
        <div className="bg-white w-3/12 h-32  p-3  border-2 border-white border-x-gray-200  gap-4">
          <p>จำนวนอุปกรณ์ทั้งหมด</p>
          <span className="text-kmuttColor-800 font-bold"> 100</span>
          <span className="text-gray-400  pl-2">ชิ้น</span>
        </div>
        <div className="bg-white w-3/12 h-32  p-3 rounded-r-xl  gap-4">
          <p>จำนวนอุปกรณ์ทั้งหมด</p>
          <span className="text-kmuttColor-800 font-bold"> 100</span>
          <span className="text-gray-400  pl-2">ชิ้น</span>
        </div>
      </div>
      <div className="m-16">
        <p className="text-gray-700 text-center  m-16"> 2023 Final Project </p>
      </div>
    </div>
  );
}
