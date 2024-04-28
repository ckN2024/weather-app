import React from 'react'
import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import weather from "../apiResonsses/weather.json";
import { ImLocation } from "react-icons/im";
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

const Home = () => {
    const [data, setData] = useState({});

  useEffect(() => {
    setData(weather);
  }, []);

  return (
    <div>
        <Header />
      <div className="flex flex-col border rounded text-slate-700 bg-gradient-to-br from-indigo-200 from-10% via-sky-100 via-30% to-indigo-300 to-90% h-[75vh] mx-[6em] my-[2em] p-[3em]">
        {/* city name */}
        <div className="flex gap-1 items-center text-[2em] font-semibold">
          <ImLocation className="" />
          <p className="">{data?.name}</p>
        </div>

        {/* temperature details */}
        <div>
          {/* temperature */}
          <div className="flex items-center text-[2em]">
            {/* temperature */}
            <FaTemperatureHalf className="text-[0.7em]" />
            <p>{data?.main?.temp} K</p>
          </div>

          {/* Real feel */}
          <div className="text-[1em]">
            <p>Real feel: {data?.main?.feels_like} K</p>
          </div>

          {/* max and min */}
          <div className="flex gap-3">
            <div className="flex items-center">
              <FaArrowUp className="text-[1.2em]" />
              <p>max: {data?.main?.temp_max}</p>
            </div>

            <div className="flex items-center">
              <FaArrowDown className="text-[1.2em]" />
              <p>min: {data?.main?.temp_min}</p>
            </div>
          </div>
        </div>

        {/* more details */}
        <div className="mt-7">
          <div className="flex items-center">
            <WiHumidity className="text-[1.8em]" />
            Humidity: {data?.main?.humidity} %
          </div>

          <div className="flex items-center">
            <WiHumidity className="text-[1.8em]" />
            Atm pressure: {data?.main?.pressure} hPa
          </div>

          <div className="flex items-center">
            <WiHumidity className="text-[1.8em]" />
            Visibility: {data?.visibility} m
          </div>

          <div className="flex items-center">
            <WiHumidity className="text-[1.8em]" />
            Cloudiness: {data?.clouds?.all} %
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home