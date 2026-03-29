import React,{ useState } from 'react'
import {ChevronRight, Copy} from 'lucide-react'

function Card(props) {

    return (
    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-10 shadow-xl w-full max-w-xl">
      <h1 className="text-3xl text-center mb-8 text-gray-800 font-medium">
        Transform Your Long URLs
      </h1>
      <div className='flex flex-col gap-10'>
        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-2 shadow-sm">

        <input
          type="text"
          value={props.url}
          onChange={(e) => {props.setUrl(e.target.value)}}
          
          placeholder="https://www.example-long-url.com/..."
          className="flex-1 px-4 py-3 outline-none text-gray-700 bg-transparent"
        />

        <button 
        onClick={props.handleSubmit}
        className="bg-gradient-to-r from-[#1F2B44] to-[#0f172a] text-white px-6 py-2 flex gap-1 rounded-lg active:scale-95 font-semibold text-base">
          Shorten <ChevronRight className='text-bold'/>
        </button>
      </div>

     {/* <div className="flex items-center bg-white border border-gray-200 rounded-xl p-2 shadow-sm">

        <input
          type="text"
          value={shortUrl}
          className="flex-1 px-4 py-3 outline-none text-gray-700 bg-transparent"
        />

        <button className="bg-gradient-to-r from-[#1F2B44] to-[#0f172a] text-white px-3 py-2 flex gap-3 rounded-lg active:scale-95 font-semibold text-base ">
          <Copy size={20} strokeWidth={2} className='text-3xl' />
        </button>
      </div> */}
      </div>
      

     </div>
    )
}

export default Card
