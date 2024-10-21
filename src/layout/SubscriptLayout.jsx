import React from 'react'
import SubscriptionNav from '../components/subscription/SubscriptionNav'
import { Outlet } from 'react-router-dom'

const SubscriptLayout = () => {
  return (
    <div>
        <SubscriptionNav/>
        <Outlet/>
    </div>
  )
}

export default SubscriptLayout
