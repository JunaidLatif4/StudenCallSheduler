import React, { useState, useRef } from 'react'

import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';

import { GrClose } from 'react-icons/gr';

import upload from "../../../../../../Assets/upload.svg";

import './Interior.scss'





const Interior = ({ interiorData, setInteriorData, saveCar, tabs, setSelectedTab }) => {
  const fileuploadref = useRef(null);

  const [currentPathForPaintData, setCurrentPathForPaintData] = useState(null);
  const [loading, setLoading] = useState(false)


  const enteringInteriorData = async (event, location) => {
    let { name, value } = event.target

    let processedData = interiorData.map((data, index) => {
      if (index == location) {
        return {
          ...data,
          [name]: value
        }
      } else {
        return data
      }
    })
    await Promise.all(processedData)
    setInteriorData(processedData)
  }

  const onUploadPaintData = (box, location) => {
    setCurrentPathForPaintData({
      box,
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

    let processedData = interiorData.map((data, index) => {
      if (currentPathForPaintData.location == index) {
        if (currentPathForPaintData.box == "paint") {
          return {
            ...data,
            paintImg: stringFile
          }
        } else {
          return {
            ...data,
            interiorImg: stringFile
          }
        }
      } else {
        return data
      }
    })
    await Promise.all(processedData)
    setInteriorData(processedData)
  }


  const addMoreInteriorData = () => {
    let newInteriorObject = {
      title: "",
      price: "",
      paintImg: null,
      interiorImg: null
    }

    setInteriorData((preVal) => {
      return [
        ...preVal,
        newInteriorObject
      ]
    })
  }

  const savingCar = () => {
    setLoading(true)
    saveCar()
  }


  return (
    <div className="interior_data">
      <input ref={fileuploadref} style={{ display: "none" }} type="file" onChange={uploadFile} />
      <div className="interior_title">
        Interior:
      </div>
      {
        interiorData.map((data, index) => {
          return (
            <>
              <div className="interior_content">
                {index == 0 ? <></> : <><GrClose className='cross' /></>}
                <div className="number">{index + 1}</div>
                <div className="interior_input">
                  <TextField fullWidth id="filled-basic" label="Interior Name:" variant="filled" name="title" value={data.title} onChange={(event) => enteringInteriorData(event, index)} />
                </div>
                <div className="interior_input">
                  <TextField fullWidth id="filled-basic" label="Interior Price:" variant="filled" name="price" value={data.price} onChange={(event) => enteringInteriorData(event, index)} />
                </div>
                <div className="box_main">
                  <label>Upload Interior Color Image:</label>
                  <div className="upload_box" onClick={() => onUploadPaintData("paint", index)}>
                    {data.paintImg ? (
                      <>
                        <img
                          src={data.paintImg}
                          alt="Image not upload"
                          className="uploaded_img"
                        />
                      </>
                    ) : (
                      <>
                        <div className="upload">
                          <img src={upload} />
                          <div className="yourBtn">
                            Upload Interior Color Image
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="box_main">
                  <label>Upload Interior Image:</label>
                  <div className="upload_box" onClick={() => onUploadPaintData("interior", index)}>
                    {data.interiorImg ? (
                      <>
                        <img
                          src={data.interiorImg}
                          alt="Image not upload"
                          className="uploaded_img"
                        />
                      </>
                    ) : (
                      <>
                        <div className="upload">
                          <img src={upload} />
                          <div className="yourBtn">Upload Interior Image</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )
        })
      }
      <button className='interior_btn' onClick={addMoreInteriorData}>Add More</button>
      <div className="btn_main">
        <button onClick={() => setSelectedTab(tabs[1])}>Back</button>
        {
          loading ?
            <button style={{ cursor: "not-allowed" }}> <CircularProgress size={15} style={{ color: "white" }} /> </button>
            :
            <button onClick={savingCar}>Save</button>

        }
      </div>
    </div>
  )
}

export default Interior