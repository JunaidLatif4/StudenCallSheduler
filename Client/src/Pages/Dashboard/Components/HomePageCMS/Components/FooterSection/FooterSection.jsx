import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import TextField from '@mui/material/TextField';


import upload from "../../../../../../Assets/upload.svg";



import '../../HomePageCMS.scss'






const FooterSection = () => {
  let Navigate = useNavigate()
  let location = useLocation()
  const fileuploadref = useRef(null);

  let id = new URLSearchParams(location.search).get('id')

  let [selectedTab, setSelectedTab] = useState("Add Product")
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


 



  // useEffect(() => {
  //   if (id) {
  //     setFullPageLoading(true)
  //     getProducts()
  //   }

  // }, [location.search])


  return (
    <>
      <input ref={fileuploadref} style={{ display: "none" }} type="file" onChange={uploadFile} />
      <div className="add_sapre_main">
      <div className="main_title">
      Footer Section
      </div>
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
          <button>Cancel</button>
          
        
              
              <button>Save</button>
          
        </div>
      </div>
    
    </>
  )
}

export default FooterSection