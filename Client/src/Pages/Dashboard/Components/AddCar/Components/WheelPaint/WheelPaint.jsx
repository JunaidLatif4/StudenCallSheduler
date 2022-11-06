import React, { useState, useRef } from 'react'

import TextField from '@mui/material/TextField';

import { GrClose } from 'react-icons/gr';

import upload from "../../../../../../Assets/upload.svg";

import './WheelPaint.scss'





const WheelPaint = ({ tabs, setSelectedTab, paintData, setPaintData }) => {
  const fileuploadref = useRef(null);

  const [currentPathForPaintData, setCurrentPathForPaintData] = useState(null);


  const entringPaintData = async (event, location, inputName, wheelLocation) => {
    let { name, value } = event.target
    let processedData = paintData.map((data, index) => {
      if (index == location) {
        if (name == "paint") {
          return {
            ...data,
            [inputName]: value
          }
        } else {
          return {
            ...data,
            wheels: data.wheels.map((WData, WIndex) => {
              if (WIndex == wheelLocation) {
                return {
                  ...WData,
                  [inputName]: value
                }
              } else {
                return WData
              }
            })
          }
        }
      } else {
        return data
      }
    })

    await Promise.all(processedData)
    setPaintData(processedData)
  }

  const onUploadPaintData = (box, path, location) => {
    setCurrentPathForPaintData({
      box,
      path,
      location
    });
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

    let processedData = paintData.map((data, index) => {
      if (currentPathForPaintData.location == index) {
        if (currentPathForPaintData.box == "paint") {
          return {
            ...data,
            img: stringFile
          }
        } else if (currentPathForPaintData.box == "wheel") {
          return {
            ...data,
            wheels: data.wheels.map((WData, WIndex) => {
              if (currentPathForPaintData.path == WIndex) {
                return {
                  ...WData,
                  img: stringFile
                }
              } else {
                return WData
              }
            })
          }
        } else {
          return {
            ...data,
            wheels: data.wheels.map((WData, WIndex) => {
              if (currentPathForPaintData.path == WIndex) {
                return {
                  ...WData,
                  carImg: stringFile
                }
              } else {
                return WData
              }
            })
          }
        }
      } else {
        return data
      }
    })
    await Promise.all(processedData)
    setPaintData(processedData)
  };


  const addMorePaintData = () => {
    let newPaintObject = {
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
    setPaintData((preVal) => {
      return [
        ...preVal,
        newPaintObject
      ]
    })
  }
  const addMoreWheelData = async (location) => {
    let newWheelObject = {
      title: "",
      img: null,
      carImg: null
    }
    let processedData = paintData.map((data, index) => {
      if (index == location) {
        return {
          ...data,
          wheels: [
            ...data.wheels,
            newWheelObject
          ]
        }
      } else {
        return data
      }
    })
    await Promise.all(processedData)
    setPaintData(processedData)
  }

  const removePaint = async (location) => {
    let filteredPaints = await paintData.filter((data , index) => index != location)
    setPaintData(filteredPaints) 
  }

  return (
    <>
      <div className="wheel_car_main">
        <input ref={fileuploadref} style={{ display: "none" }} type="file" onChange={uploadFile} />
        {/* <div className="wheel_title">Colors And Wheels :</div> */}
        {
          paintData.map((data, index) => {
            return (
              <>
                <div className="upload_car_content">

                  {index == 0 ? <></> : <><GrClose className='cross' onClick={() => removePaint(index)} /></>}
                  <div className="number">{index + 1}</div>

                  <div className="input_main">
                    <div className="paint_input_box">
                      <div className="left">
                        <TextField fullWidth id="filled-basic" label="Enter Color Name:" variant="filled" name="paint" onChange={(event) => entringPaintData(event, index, "title")} value={data.title} />
                        <TextField fullWidth id="filled-basic" label="Enter Color Price:" variant="filled" name="paint" onChange={(event) => entringPaintData(event, index, "price")} value={data.price} />
                      </div>
                      <div className="right">
                        <div className="box_main">
                          <label>Upload Color Image:</label>
                          <div className="upload_box" onClick={() => onUploadPaintData("paint", "paint", index)}>
                            {data.img ? (
                              <>
                                <img
                                  src={data.img}
                                  alt="Image not upload"
                                  className="uploaded_img"
                                />
                              </>
                            ) : (
                              <>
                                <div className="upload">
                                  <img src={upload} />
                                  <div className="yourBtn">Upload Color Image</div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {
                      data.wheels.map((WData, WIndex) => {
                        return (
                          <>
                            <div className="wheel_line"></div>
                            <div className="wheel_input_box">
                              <div className="left">
                                <TextField fullWidth id="filled-basic" label="Enter Wheel Name:" variant="filled" name="wheel" onChange={(event) => entringPaintData(event, index, "title", WIndex)} value={WData.title} />
                                <div className="paint_input">
                                  <TextField fullWidth id="filled-basic" label="Enter Wheel Price:" variant="filled" name="wheel" onChange={(event) => entringPaintData(event, index, "price", WIndex)} value={WData.price} />
                                </div>
                              </div>
                              <div className="right">
                                <div className="box_main">
                                  <label>Upload wheel Image:</label>
                                  <div className="upload_box" onClick={() => onUploadPaintData("wheel", WIndex, index)}>
                                    {WData.img ? (
                                      <>
                                        <img
                                          src={WData.img}
                                          alt="Image not upload"
                                          className="uploaded_img"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <div className="upload">
                                          <img src={upload} />
                                          <div className="yourBtn">Upload Wheel Image</div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="box_main">
                                  <label>Upload car image with these Wheels:</label>
                                  <div className="upload_box" onClick={() => onUploadPaintData("car", WIndex, index)}>
                                    {WData.carImg ? (
                                      <>
                                        <img
                                          src={WData.carImg}
                                          alt="Image not upload"
                                          className="uploaded_img"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <div className="upload">
                                          <img src={upload} />
                                          <div className="yourBtn">Upload Car Image</div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                                {
                                  WIndex == data.wheels.length - 1 &&
                                  <button className="add_btn" onClick={() => addMoreWheelData(index)}>Add More Wheels</button>
                                }
                              </div>
                            </div>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
              </>
            )
          })
        }
        <button className='add_btn' onClick={addMorePaintData}>Add More</button>
        <div className="btn_main">
          <button onClick={() => setSelectedTab(tabs[0])}>Back</button>
          <button onClick={() => setSelectedTab(tabs[2])}>Next</button>
        </div>
      </div>
    </>
  )
}

export default WheelPaint