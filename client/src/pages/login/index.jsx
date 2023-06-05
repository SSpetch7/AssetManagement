import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import loginImg from "assets/loginlogo.png"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

export default function Login() {
    const [values, setValues] = useState({
            admin_email: '',
            admin_password: ''
      })
      const navigate = useNavigate()
      axios.defaults.withCredentials = true;
      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/login', values)
        .then(res  => {
          if (res.data.Status === 'Success') {
              navigate('/home')
              window.location.reload();
          } else { 
            alert(res.data.Error);          
          }
        })
        .then(err  => console.log(err));
      }

  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/home');
        } else {
          navigate('/login');
        }
      })
      .then((err) => console.log(err))
  }, []);

      const {
        activeMenu,
        setActiveMenu,
        handleClick,
        isClicked,
        setIsClicked,
        screenSize,
        setScreenSize,
        setLoginOn,
        loginOn
      } = useStateContext();
      useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
    
        handleResize();
        return () => window.addEventListener("resize", handleResize);
      }, []);
    
      useEffect(() => {
        if (screenSize <= 900) {
          setActiveMenu(false);
        } else {
          setActiveMenu(true);
        }
      }, [screenSize]);
  return (
    <div className="grid grid-cols-1 grid-rows-3 h-screen w-full bg-gray-100">
      <div className=" flex flex-col justify-center">
        <img src={loginImg} className="max-w-[500px] w-full mx-auto" />
        <h1 className="text-center text-3xl font-bold text-gray-700">
          ระบบบริหารจัดการครุภัณฑ์
        </h1>
        <h1 className="text-center text-3xl font-bold text-orange-500">
          ภาควิชาคณิตศาสตร์
        </h1>
      </div>

      <div className="flex flex-col justify-center items">
        <form className="max-w-[400px] w-full mx-auto bg-white p-8 px-8 rounded-lg" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center text-orange-400">
            เข้าสู่ระบบ
          </h2>
          <div className="flex flex-col text-gray-500 py-2">
            <label>อีเมล</label>
            <input
              className="rounded-lg mt-2 p-2 border-2 focus:bg-orange-100 focus:outline-orange-300"
              type="email" name="admin_email" onChange={e => setValues({...values, admin_email:e.target.value})}
            />
          </div>
          <div className="flex flex-col text-gray-500 py-2">
            <label>รหัสผ่าน</label>
            <input
              className="rounded-lg mt-2 p-2 border-2 focus:border-red-200 focus:bg-orange-100 focus:outline-orange-300"
              type="password" name="admin_password" onChange={e => setValues({...values, admin_password:e.target.value})}
            />
          </div>
          <div className="flex justify-end text-kmuttColor-500 py-2">
            <p>ลืมรหัสผ่าน?</p>
          </div>
          <button className="w-full my-2 py-2 bg-kmuttColor-800 shadow-lg text-white font-semibold rounded-lg" onClick={() => setLoginOn((loginOn) => !loginOn)}>
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
      <div className="wave flex flex-col ">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
    </svg>
</div>
    </div>
    
  );
}