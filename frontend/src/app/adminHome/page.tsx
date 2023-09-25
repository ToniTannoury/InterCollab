"use client"
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Chart from "react-apexcharts";
function AdminHome() {
  const [state , setState] = useState<any>({
    options: {
      chart: {
        id: "basic-bar"
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
  const {currentUser} = useSelector((state:any)=>state.users)
  return (
    <div>
      <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"
            />
    </div>
  )
}

export default AdminHome
