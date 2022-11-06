import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import upload from "../../../../Assets/upload.svg";

import TopBar from "../TabsBar/TopBar";

import { addProductAPI, editProductAPI, getProductsAPI } from "../../../../API/Store"
import { ToastContainer, toast } from 'react-toastify';

import './AddSpareparts.scss'





let Tabs = ["Add Product"]

const AddSpareparts = () => {
  let Navigate = useNavigate()
  let location = useLocation()
  const fileuploadref = useRef(null);

  let id = new URLSearchParams(location.search).get('id')

  let [selectedTab, setSelectedTab] = useState("Add Product")
  const [loading, setLoading] = useState(false)
  const [fullPageLoading, setFullPageLoading] = useState(false)
  const [enteredData, setEnteredData] = useState({
    name: '',
    price: '',
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

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    let stringFile = await toBase64(file)

    setEnteredData((preVal) => {
      return {
        ...preVal,
        img: stringFile
      }
    })
  }


  const getProducts = async () => {
    let res = await getProductsAPI(id)
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

      Navigate('/dashboard/products')
    } else {
      setEnteredData(res.data.data)
      setFullPageLoading(false)
    }
  }


  const saveProduct = async () => {
    setLoading(true)
    let res;
    if (id) {
      res = await editProductAPI(id, enteredData)
    } else {
      res = await addProductAPI(enteredData)
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
      setLoading(false)
    } else {
      toast(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      Navigate('/dashboard/products')
    }
  }



  useEffect(() => {
    if (id) {
      setFullPageLoading(true)
      getProducts()
    }

  }, [location.search])


  return (
    <>
      <input ref={fileuploadref} style={{ display: "none" }} type="file" onChange={uploadFile} />
      <div className="add_sapre_main">
        <TopBar tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="interior_content">
          <div className="interior_input">
            <TextField fullWidth id="filled-basic" label="Sparepart Name :" variant="filled" name="name" onChange={enteringData} value={enteredData.name} />
          </div>
          <div className="interior_input">
            <TextField fullWidth id="filled-basic" label="Sparepart Price :" variant="filled" name="price" onChange={enteringData} value={enteredData.price} />
          </div>
          <div className="box_main">
            <label>Upload Sparepart Image</label>
            <div className="upload_box" onClick={onupload}>
              {enteredData.img ? (
                <>
                  <img
                    src={enteredData.img}
                    alt="Image not upload"
                    className="uploaded_img"
                  />
                </>
              ) : (
                <>
                  <div className="upload">
                    <img src={upload} />
                    <div className="yourBtn">Upload Sparepart Image</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="btn_sec">
          <button onClick={() => Navigate("/dashboard/products")}>Cancel</button>
          {
            loading ?
              <button style={{ cursor: "not-allowed" }}> <CircularProgress size={15} style={{ color: "white" }} /> </button>
              :
              <button onClick={saveProduct}>Save</button>
          }
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fullPageLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default AddSpareparts