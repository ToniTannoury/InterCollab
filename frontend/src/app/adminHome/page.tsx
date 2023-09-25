"use client"
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Chart from "react-apexcharts";
function AdminHome() {
  const [state , setState] = useState<any>({
    options: {
      chart: {
        id: "bar-chart"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: "series-2",
        data: [30, 40, 45, 50, 50, 60, 70, 91]
      }
    ]
  })
  const [lineState , setLineState] = useState<any>({
    options: {
      chart: {
        id: "line-chart"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [55, 23, 45, 36, 49, 60, 12, 15]
      },
      {
        name: "series-2",
        data: [30, 40, 45, 50, 50, 60, 70, 91]
      }
    ]
  })
  const [areaState , setAreaState] = useState<any>({
    options: {
      chart: {
        id: "area-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [55, 23, 45, 36, 49, 60, 12, 15]
      },
      {
        name: "series-2",
        data: [30, 40, 45, 50, 50, 60, 70, 91]
      }
    ]
  })
  const [radarState , setRadarState] = useState<any>({
    options: {
      chart: {
        id: "area-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [55, 23, 45, 36, 49, 60, 12, 15]
      },
      {
        name: "series-2",
        data: [30, 40, 45, 50, 50, 60, 70, 91]
      }
    ]
  })
  const {currentUser} = useSelector((state:any)=>state.users)
  return (
    <div>
      <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"
            />
      <Chart
              options={lineState.options}
              series={lineState.series}
              type="line"
              width="500"
            />
      <Chart
              options={areaState.options}
              series={areaState.series}
              type="area"
              width="500"
            />
      <Chart
              options={areaState.options}
              series={areaState.series}
              type="radar"
              width="500"
            />
    </div>
  )
}

export default AdminHome
