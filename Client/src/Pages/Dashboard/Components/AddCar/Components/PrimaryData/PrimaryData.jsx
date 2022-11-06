import React, { useState } from 'react'

import TextField from '@mui/material/TextField';

import './PrimaryData.scss'





const PrimaryDataComponent = ({ primaryData, setPrimarydata, tabs, setSelectedTab }) => {
  console.log(primaryData);
  const handlePrimarydata = (e) => {
    let { name, value } = e.target

    setPrimarydata((e) => {
      return {
        ...e,
        [name]: value
      }
    })

  }



  return (
    <>
    <p className="note"> * TO PREVENT ERRORS & UI DISTURBANCE PLEASE FILL ALL THE INFORMATION BELOW </p>
      <div className="primary_content">
        <div className="primary_detail">
          <div className="label_main">
            <TextField fullWidth id="filled-basic" label="Car Name :" variant="filled" name="name" onChange={handlePrimarydata} value={primaryData.name} />
          </div>
          <div className="label_main">
            <TextField fullWidth id="filled-basic" label="Car Price : " variant="filled" name="price" onChange={handlePrimarydata} value={primaryData.price} />
          </div>
          <div className="label_main">
            <TextField fullWidth id="filled-basic" label="Car Engine : " variant="filled" name="power" onChange={handlePrimarydata} value={primaryData.power} />
          </div>
          <div className="label_main">
            <TextField fullWidth id="filled-basic" label="Car Milage :" variant="filled" name="milage" onChange={handlePrimarydata} value={primaryData.milage} />
          </div>
          <div className="label_main">
            <TextField fullWidth id="filled-basic" label="Car Pickup :" variant="filled" name="pickup" onChange={handlePrimarydata} value={primaryData.pickup} />
          </div>
        </div>
        {/* <div className="line"></div> */}
        <div className="title">
          Upgrade :
        </div>
        <div className="primary_detail">
          <TextField fullWidth id="filled-basic" label="Name :" variant="filled" name="upgradeName" onChange={handlePrimarydata} value={primaryData.upgradeName} />
          <TextField fullWidth id="filled-basic" label="Price :" variant="filled" name="upgradePrice" onChange={handlePrimarydata} value={primaryData.upgradePrice} />
        </div>
        <div className="title">
          Charging :
        </div>
        <div className="primary_detail">
          <TextField fullWidth id="filled-basic" label="Name 1" variant="filled" name="chargingName1" onChange={handlePrimarydata} value={primaryData.chargingName1} />
          <TextField fullWidth id="filled-basic" label="Price :" variant="filled" name="chargingPrice1" onChange={handlePrimarydata} value={primaryData.chargingPrice1} />

          <TextField fullWidth id="filled-basic" label="Name 2" variant="filled" name="chargingName2" onChange={handlePrimarydata} value={primaryData.chargingName2} />
          <TextField fullWidth id="filled-basic" label="Price :" variant="filled" name="chargingPrice2" onChange={handlePrimarydata} value={primaryData.chargingPrice2} />
        </div>

        <div className="btn_main">
          <button onClick={() => setSelectedTab(tabs[1])}>Next</button>
        </div>
      </div>
    </>
  )
}

export default PrimaryDataComponent