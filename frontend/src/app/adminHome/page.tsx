"use client"
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Chart from "react-apexcharts";
function AdminHome() {
  const [state , setState] = useState<any>()
  const {currentUser} = useSelector((state:any)=>state.users)
  return (
    <div>
      <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
    </div>
  )
}

export default AdminHome
