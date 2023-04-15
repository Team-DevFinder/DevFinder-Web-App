import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Developers } from '../pages/Developers/Developers'
import { Inbox } from '../pages/Inbox/Inbox'
import { Projects } from '../pages/Projects/Projects'
import { Login } from '../pages/Login/Login'
import { IndividualProject } from '../pages/Projects/IndividualProject/IndividualProject'

export const ManageRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/project" element={<IndividualProject />} />
      <Route path="/login" element={<Login />} />
      
    </Routes>
  )
}
