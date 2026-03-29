import React from 'react'
import {ChevronRight} from 'lucide-react'
function Card() {
    return (
    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-10 shadow-xl w-full max-w-xl">
      <h1 className="text-3xl text-center mb-8 text-gray-800 font-medium">
        Transform Your Long URLs
      </h1>
      <div className="flex items-center bg-white border border-gray-200 rounded-xl p-2 shadow-sm">

        <input
          type="text"
          placeholder="https://www.example-long-url.com/..."
          className="flex-1 px-4 py-3 outline-none text-gray-700 bg-transparent"
        />

        <button className="bg-gradient-to-r from-[#1F2B44] to-[#0f172a] text-white px-6 py-2 flex gap-1 rounded-lg active:scale-95 font-semibold text-base">
          Shorten <ChevronRight className='text-bold'/>
        </button>
      </div>
    </div>
    )
}

export default Card
