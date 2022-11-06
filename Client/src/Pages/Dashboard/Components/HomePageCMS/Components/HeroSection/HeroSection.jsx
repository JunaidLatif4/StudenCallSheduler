import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import upload from "../../../../../../Assets/upload.svg";

import { AddHeroSectionDataAPI, GetHeroSectionDataAPI, UpdateHeroSectionDataAPI } from "../../../../../../API/CMS";
import { toast } from "react-toastify"

import '../../HomePageCMS.scss'






const HeroSection = () => {
  let Navigate = useNavigate()
  let location = useLocation()
  const fileuploadref = useRef(null);

  const [fullPageLoading, setFullPageLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [enteredData, setEnteredData] = useState({
    line1: '',
    line2: '',
    line3: '',
    details: '',
    img: null
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

  const onupload = () => {
    fileuploadref.current.click();
  };
  const uploadFile = async (event) => {
    let file = event.target.files[0]

    setEnteredData((preVal) => {
      return {
        ...preVal,
        img: {
          link: URL.createObjectURL(file),
          file: file
        }
      }
    })
  }


  const AddSectionData = async () => {
    setLoading(true)
    let formData = new FormData()
    let res;
    let data = enteredData

    if (data.img && data.img.file) {
      formData.append("img", data.img.file)
      data.img = true
    }
    Object.keys(data).map((key) => {
      if (key != "_id") {
        if (key == "img") {
          formData.append(key, JSON.stringify(data[key]))
        } else {
          formData.append(key, data[key])
        }
      }
    })
    console.log(enteredData);
    if (data._id) {
      res = await UpdateHeroSectionDataAPI(data._id, formData)
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
      res = await AddHeroSectionDataAPI(formData)
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
    const res = await GetHeroSectionDataAPI()
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
      <input ref={fileuploadref} style={{ display: "none" }} type="file" onChange={uploadFile} />
      <div className="add_sapre_main">
        <div className="main_title">
          Home Section
        </div>
        <div className="interior_content">
          <div className="interior_input">
            <TextField fullWidth id="filled-basic" label="Line 1 :" variant="filled" name="line1" onChange={enteringData} value={enteredData.line1} />
          </div>
          <div className="interior_input">
            <TextField fullWidth id="filled-basic" label="Line 2 Orange :" variant="filled" name="line2" onChange={enteringData} value={enteredData.line2} />
          </div>
          <div className="interior_input">
            <TextField fullWidth id="filled-basic" label="Line 3  :" variant="filled" name="line3" onChange={enteringData} value={enteredData.line3} />
          </div>
          <div className="interior_input">
            <TextareaAutosize aria-label="Details" minRows={10} placeholder="Details" style={{ width: 450 }} name="details" onChange={enteringData} value={enteredData.details} />
          </div>
          <div className="box_main">
            <label>Upload Image</label>
            <div className="upload_box" onClick={onupload}>
              {enteredData.img ? (
                <>
                  <img
                    src={enteredData.img.link}
                    alt="Image not upload"
                    className="uploaded_img"
                  />
                </>
              ) : (
                <>
                  <div className="upload">
                    <img src={upload} />
                    <div className="yourBtn">Upload Image</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="btn_sec">
          <button onClick={AddSectionData}>Save</button>
        </div>
      </div>

    </>
  )
}

export default HeroSection