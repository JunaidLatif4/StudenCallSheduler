import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import { CircularProgress, Button } from "@mui/material"

import { AiFillStar } from "react-icons/ai"
import porche from "../../../../Assets/lux.png";
import TopBar from "../TabsBar/TopBar";

import CFormat from "currency-formatter"

import { getCarsAPI, deleteCarAPI } from "../../../../API/Cars"
import { ToastContainer, toast } from 'react-toastify';

import "./AvailableCar.scss";






const card = [
  {
    img: porche,
    brand: "Flux Village",
    star: <AiFillStar />,
    dollar: "$200000",
    edit: "Edit",
    delete: "Delete",
  },
  {
    img: porche,
    brand: "Porche",
    star: <AiFillStar />,
    dollar: "$200000",
    edit: "Edit",
    delete: "Delete",
  },
  {
    img: porche,
    brand: "Flux Freedom",
    star: <AiFillStar />,
    dollar: "$200000",
    edit: "Edit",
    delete: "Delete",
  },
  {
    img: porche,
    brand: "Porche",
    star: <AiFillStar />,
    dollar: "$200000",
    edit: "Edit",
    delete: "Delete",
  },
];

let Tabs = ["ALL CARS"]


const AvailableCar = () => {

  let navigate = useNavigate()

  let [selectedTab, setSelectedTab] = useState("ALL CARS")
  const [allCars, setAllCars] = useState(null)
  const [refresh, setRefresh] = useState(true)

  const editCar = (id) => {
    navigate(`/dashboard/addcar?id=${id}`, { state: { id } })
  }
  const deleteCar = async (id) => {
    if (window.confirm("Do You want to Delete the car")) {
      let res = await deleteCarAPI(id)
      if (res.error) {
        toast.error(res.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRefresh(!refresh)
      } else {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRefresh(!refresh)
      }
    }
  }
  
  const gettingCars = async () => {
    let res = await getCarsAPI()
    if (res.error != null) {
      toast.error(res.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setAllCars(res.data.data)
    }
  }
  useEffect(() => {
    setAllCars(null)
    gettingCars()
  }, [refresh])

  return (
    <div className="avail_main">
      <TopBar tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {
        allCars ?
          allCars.length < 1 ?
            <>
              <div className="progress_box">
                <div className="no_data">NO Cars Found</div>
              </div>
            </>
            :
            <>
              <div className="card_main">
                {allCars.map((data) => {
                  return (
                    <>
                      <div className="card">
                        <img src={data.paintsWheels[0].wheels[0].carImg} />
                        <div className="name">
                          <b>{data.name}</b>
                        </div>
                        <div className="star">
                          {data.milage}hp
                        </div>
                        <div className="price">
                          <b>{CFormat.format(data.price, { code: "USD" })}</b>
                        </div>
                        <div className="btn_main">
                          <Button className="btn" onClick={() => editCar(data._id)}>Edit</Button>
                          <Button className="btn" onClick={() => deleteCar(data._id)}>Delete</Button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          :
          <>
            <div className="progress_box">
              <CircularProgress />
            </div>
          </>
      }
    </div>
  );
};

export default AvailableCar;
