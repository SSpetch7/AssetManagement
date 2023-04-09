import React, { useState } from "react";
import { Container } from "react-bootstrap";

function Datepickertofrom() {
    const [disable, setDisable] = useState(true);
    const [todate, setTodate] = useState([]);
    const [fromdate, setFromdate] = useState([]);

    const [todateformat, setTodateformat] = useState('');
    const [fromdateformat, setFromdateformat] = useState('');

    const handletodate = (e) => {
        const gettodatevalue = e.target.value;
        const setdateformat = gettodatevalue.split('-');
        const settoyear = setdateformat[0];
        const settomonth = setdateformat[1];
        const settodate = setdateformat[2];
        const settodateformat = settoyear + "" + settomonth + "" + settodate;
        setTodate(gettodatevalue);
        setTodateformat(settodateformat);
        setDisable(false);
        //console.log(settodateformat);

    }

    const handlefromdate = (e) => {
        const getfromdatevalue = e.target.value;
        const setfromformat = getfromdatevalue.split("-");
        const setfromyear = setfromformat[0];
        const setfrommonth = setfromformat[1];
        const setfromdate = setfromformat[2];
        const setfromformatdate = setfromyear + "" + setfrommonth + "" + setfromdate;
        setFromdate(getfromdatevalue);
        setFromdateformat(setfromformatdate);
        // console.log(setfromformatdate);

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        //alert("todate "+todate+ "form date"+ fromdate);

        if (todateformat > fromdateformat) {
            alert("Please select valid date");
        } else {

            alert("Successfull ! Please set API URL");
        }

    }


    return (
        <React.Fragment>
            <Container>
                <div className="row fthight">
                    <div className="col-sm-8  mt-3">
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4 ">
                                <div className="col-sm-5">
                                    <p class="text-sm text-gray-600 font-medium">เลือกวันที่</p>
                                    <div className="h-4"></div>
                                    <input type="date" className="form-control flex w-full content-between border-2 border-orange-200 rounded-md p-2" name="todate" onChange={(e) => handletodate(e)} />
                                    <span className="text-danger"> </span>
                                </div>
                            </div>
                            <p class="w-full col-span-1 text-2xl text-orange-500 font-medium flex justify-center">ถึง</p>
                            <div className="row mb-4 ">
                                <div className="col-sm-5">
                                    <p class="text-sm text-gray-600 font-medium">เลือกวันที่</p>
                                    <div className="h-4"></div>
                                    <input type="date" className="form-control flex w-full content-between border-2 border-orange-200 rounded-md p-2" name="fromdate" onChange={(e) => handlefromdate(e)} />
                                </div>
                            </div>

                            <div className="row mb-4 bg-orange-400 rounded-md p-2">
                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-5">
                                    <button className="w-full btn btn-success flex justify-center text-white"> ค้นหา </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}
export default Datepickertofrom;