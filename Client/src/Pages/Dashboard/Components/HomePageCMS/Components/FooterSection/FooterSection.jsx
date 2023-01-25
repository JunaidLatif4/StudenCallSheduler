import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { AddFooterSectionDataAPI, GetFooterSectionDataAPI, UpdateFooterSectionDataAPI } from "../../../../../../API/CMS";
import { toast } from "react-toastify"

import '../../HomePageCMS.scss'






const FooterSection = () => {
  let Navigate = useNavigate()
  let location = useLocation()
  const fileuploadref = useRef(null);

  const [fullPageLoading, setFullPageLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [enteredData, setEnteredData] = useState({
    instagram: '',
    twitter: '',
    facebook: "",
    linkdin: "",
    apiKey:"",
  })


  const enteringData = (event) => {
    let { name, value } = event.target

    setEnteredData((preVal) => {
      return {
        ...preVal,
        [name]: value
      }
    })

  }



  const AddSectionData = async () => {
    setLoading(true)
    let res;
    let data = enteredData

    if (data._id) {
      res = await UpdateFooterSectionDataAPI(data._id, data)
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
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        gettingHeroSectionData()
      }
    } else {
      res = await AddFooterSectionDataAPI(data)
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
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        gettingHeroSectionData()
      }
    }
    setLoading(false)
  }

  const gettingHeroSectionData = async () => {
    setFullPageLoading(true)
    const res = await GetFooterSectionDataAPI()
    setFullPageLoading(false)
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
      setEnteredData(res.data.data)
    }
  }

  useEffect(() => {
    gettingHeroSectionData()
  }, [])

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fullPageLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="add_sapre_main">
        <div className="main_title">
          Footer Section
        </div>
        <div className="interior_content">
          <div className="interior_input">
            <TextField fullWidth id="filled-basic" label="Instagram Link :" variant="filled" name="instagram" onChange={enteringData} value={enteredData.instagram} />
          </div>
          <div className="interior_input">
            <TextField fullWidth id="filled-basic" label="Twitter Link :" variant="filled" name="twitter" onChange={enteringData} value={enteredData.twitter} />
          </div>
          <div className="interior_input">
            <TextField fullWidth id="filled-basic" label="Facebook Link :" variant="filled" name="facebook" onChange={enteringData} value={enteredData.facebook} />
          </div>
          <div className="interior_input">
            <TextField fullWidth id="filled-basic" label="LinkdIn Link :" variant="filled" name="linkdin" onChange={enteringData} value={enteredData.linkdin} />
          </div>
          <div className="interior_input">
            <TextField fullWidth id="filled-basic" label="RazorPay API KEY :" variant="filled" name="apiKey" onChange={enteringData} value={enteredData.apiKey} />
          </div>
        </div>
        <div className="btn_sec">
          <button onClick={AddSectionData}>Save</button>
        </div>
      </div>
    </>
  )
}

export default FooterSection