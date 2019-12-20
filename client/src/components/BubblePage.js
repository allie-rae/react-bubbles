import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const [isFetching, setIsFetching] = useState(false);

  const getColors = () => {
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        setColorList(res.data)
        console.log("res.data in bubblepage", res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getColors()
  }, [isFetching])

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
      />
      <Bubbles
        colors={colorList}
      />
    </>
  );

};

export default BubblePage;
