import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import upload from "../../../../../../Assets/upload.svg";

import "../../HomePageCMS.scss";

const PromotionSection = () => {
  let Navigate = useNavigate();
  let location = useLocation();
  const fileuploadref = useRef(null);

  let id = new URLSearchParams(location.search).get("id");

  let [selectedTab, setSelectedTab] = useState("Add Product");
  const [enteredData, setEnteredData] = useState({
    line1: "",
    line2: "",
    line3: "",
    detail: "",
    img: null,
  });

  const enteringData = (event) => {
    let { name, value } = event.target;

    setEnteredData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const onupload = () => {
    fileuploadref.current.click();
  };
  const uploadFile = async (event) => {
    let file = event.target.files[0];

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    let stringFile = await toBase64(file);

    setEnteredData((preVal) => {
      return {
        ...preVal,
        img: stringFile,
      };
    });
  };

  // useEffect(() => {
  //   if (id) {
  //     setFullPageLoading(true)
  //     getProducts()
  //   }

  // }, [location.search])

  return (
    <>
      <input
        ref={fileuploadref}
        style={{ display: "none" }}
        type="file"
        onChange={uploadFile}
      />
      <div className="add_sapre_main">
        <div className="main_title">Promotion Section</div>
        <div className="interior_content">
          <div className="interior_input">
            <TextField
              fullWidth
              id="filled-basic"
              label="Line 1 :"
              variant="filled"
              name="line1"
              onChange={enteringData}
              value={enteredData.line1}
            />
          </div>
          <div className="interior_input">
            <TextField
              fullWidth
              id="filled-basic"
              label="Line 2 Orange :"
              variant="filled"
              name="line2"
              onChange={enteringData}
              value={enteredData.line2}
            />
          </div>
          <div className="interior_input">
            <TextField
              fullWidth
              id="filled-basic"
              label="Line 3  :"
              variant="filled"
              name="line3"
              onChange={enteringData}
              value={enteredData.line3}
            />
          </div>
          <div className="interior_input">
            <TextareaAutosize
              aria-label="Details"
              minRows={10}
              placeholder="Details"
              style={{ width: 450 }}
              name="detail"
              onChange={enteringData}
              value={enteredData.detail}
            />
          </div>
          <div className="box_main">
            <label>Upload Video</label>
            <div className="upload_box" onClick={onupload}>
              {enteredData.img ? (
                <>
                  <video controls className="uploaded_img">
                    <source src={enteredData.img} type="video/mp4" />
                  </video>
                </>
              ) : (
                <>
                  <div className="upload">
                    <img src={upload} />
                    <div className="yourBtn">Upload Video</div>
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
  );
};

export default PromotionSection;
