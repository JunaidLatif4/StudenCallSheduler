import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import TopBar from "../TabsBar/TopBar";
import PrimaryDataComponent from "./Components/PrimaryData/PrimaryData"
import PaintComponent from "./Components/WheelPaint/WheelPaint"
import InterorComponent from "./Components/Interior/Interior"

import { addCarAPI, editCarAPI, getCarsAPI } from "../../../../API/Cars"
import { ToastContainer, toast } from 'react-toastify';

import "./AddCar.scss";





let Tabs = ["PRIMARY DATA", "PAINTS & WHEELS", "INTERIOR"];

const AddCar = () => {
  let navigate = useNavigate()
  let location = useLocation()

  let id = new URLSearchParams(location.search).get("id")

  let [selectedTab, setSelectedTab] = useState("PRIMARY DATA");
  const [fullPageLoading, setFullPageLoading] = useState(false)

  // primary data state

  const [primaryData, setPrimarydata] = useState({
    name: '',
    price: '',
    milage: '',
    power: '',
    pickup: "",
    upgradeName: "",
    upgradePrice: "",
    chargingName1: "",
    chargingPrice1: "",
    chargingName2: "",
    chargingPrice2: "",
  })
  const [paintData, setPaintData] = useState([
    {
      title: "",
      price: "",
      img: null,
      wheels: [
        {
          title: "",
          price: "",
          img: null,
          carImg: null
        }
      ]
    }
  ])
  const [interiorData, setInteriorData] = useState([
    {
      title: "",
      price: "",
      paintImg: null,
      interiorImg: null
    }
  ])

  const saveCar = async () => {
    let res;
    if (id) {
      res = await editCarAPI(id, { primaryData, paintData, interiorData })
    } else {
      res = await addCarAPI({ primaryData, paintData, interiorData })
    }
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
      toast(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/dashboard")
    }
  }

  console.log(paintData);

  const gettingCar = async () => {
    let res = await getCarsAPI(id)
    if (res.error != null) {
      setFullPageLoading(false)
      toast.error(res.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/dashboard")
    } else {
      let carData = res.data.data
      setPrimarydata({
        name: carData.name,
        price: carData.price,
        power: carData.power,
        milage: carData.milage,
        pickup: carData.pickup,
        upgradeName: carData.upgradeName,
        upgradePrice: carData.upgradePrice,
        chargingName1: carData.chargingName1,
        chargingPrice1: carData.chargingPrice1,
        chargingName2: carData.chargingName2,
        chargingPrice2: carData.chargingPrice2,
      })
      setPaintData(carData.paintsWheels)
      setInteriorData(carData.interior)
      setFullPageLoading(false)
    }
  }

  const currentComponent = (CTAB) => {
    switch (CTAB) {
      case Tabs[0]:
        return <PrimaryDataComponent primaryData={primaryData} setPrimarydata={setPrimarydata} tabs={Tabs} setSelectedTab={setSelectedTab} />
        break;
      case Tabs[1]:
        return <PaintComponent paintData={paintData} setPaintData={setPaintData} tabs={Tabs} setSelectedTab={setSelectedTab} />
        break;
      case Tabs[2]:
        return <InterorComponent interiorData={interiorData} setInteriorData={setInteriorData} saveCar={saveCar} tabs={Tabs} setSelectedTab={setSelectedTab} />
        break;
      default:
        return <PrimaryDataComponent primaryData={primaryData} setPrimarydata={setPrimarydata} tabs={Tabs} setSelectedTab={setSelectedTab} />
        break;
    }
  }

  useEffect(() => {
    if (id) {
      setFullPageLoading(true)
      gettingCar()
    }
  }, [location.search])

  return (


    <>
      <div className="main_addcar">
        <TopBar
          tabs={Tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {
          currentComponent(selectedTab)
        }
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={fullPageLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};
export default AddCar;
