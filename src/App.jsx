import React from 'react'
import Navbar from './component/Navbar'
import Card from './component/Card'

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#D5EFFB] via-[#E6E9FA] to-[#BBB7C3]'>
      <Navbar/>
      <div className='flex justify-center items-center h-[60vh]'>
        <Card/>
      </div>
    </div>
  )
}

export default App
