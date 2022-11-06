import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import { CircularProgress, Button } from "@mui/material"

import { AiFillStar } from "react-icons/ai"

import CFormat from "currency-formatter"

import TopBar from "../TabsBar/TopBar";
import porche from "../../../../Assets/engine.png";

import { getProductsAPI, deleteProductAPI } from "../../../../API/Store"
import { ToastContainer, toast } from 'react-toastify';

import "./AvailableSpareparts.scss";





let Tabs = ["ALL Spareparts"]

const AvailableSpareparts = () => {

  let navigate = useNavigate()

  let [selectedTab, setSelectedTab] = useState("ALL PRODUCTS")
  const [allProducts, setAllProducts] = useState(null)
  const [refresh, setRefresh] = useState(true)


  const editPart = (id) => {
    navigate(`/dashboard/addproduct?id=${id}`, { state: { id } })
  }


  const getProducts = async () => {
    let res = await getProductsAPI()
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
      setAllProducts(res.data.data)
    }

  }

  useEffect(() => {
    setAllProducts(null)
    getProducts()
  }, [refresh])


  const deletepart = async (id) => {
    if (window.confirm('Do You Want To Delete The Product')) {
      let res = await deleteProductAPI(id)
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
        })
        setRefresh(!refresh)
      }
    }
  }




  return (
    <div className="avail_spare_main">
      <TopBar tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {
        allProducts ?
          allProducts.length < 1 ?
            <>
              <div className="progress_box">
                <div className="no_data">NO Products Found</div>
              </div>
            </>
            :
            <>
              <div className="card_main">
                {allProducts.map((e) => {
                  return (
                    <>
                      <div className="card">
                        <img src={e.img} />
                        <div className="name">
                          <b>{e.name}</b>
                        </div>

                        <div className="price">
                          <b>{CFormat.format(e.price, { code: "USD" })}</b>
                        </div>
                        <div className="btn_main">
                          <Button className="btn" onClick={() => editPart(e._id)} >Edit</Button>
                          <Button className="btn" onClick={() => deletepart(e._id)} >Delete</Button>
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
  )
}

export default AvailableSpareparts