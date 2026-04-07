import React,{ useState } from 'react'
import {ChevronRight, Copy} from 'lucide-react'
import toast from "react-hot-toast";

function Card(props) {

    const handleCopy = () => {
        navigator.clipboard.writeText(props.shortUrl);
        toast.success("Copied!");
    }
    return (
    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-10 shadow-xl w-full max-w-xl mx-4 sm:mx-0">
      <h1 className="text-3xl text-center mb-8 text-gray-800 font-medium">
        Transform Your Long URLs
      </h1>
      <div className='flex flex-col gap-10'>

      <form
      onSubmit={(e) => {
      e.preventDefault();
      props.handleSubmit();
      }}
      className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-xl p-2 shadow-sm gap-2"
      >
      <input
      type="text"
      value={props.url}
      onChange={(e) => {
        props.setUrl(e.target.value);
        props.setShortUrl("")
      }}
      placeholder="Enter URL"
      className="flex-1 px-4 py-3 outline-none text-gray-700 bg-transparent w-full"
      />

      <button
      type="submit"
      disabled={!props.url || props.loading}
      className="bg-gradient-to-r from-[#1F2B44] to-[#0f172a] text-white px-5 py-2 rounded-lg w-full sm:w-auto flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
      {props.loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
      <>
      Shorten
      <ChevronRight className="w-4 h-4" />
    </>
  )}
</button>
    </form>

     {props.shortUrl && (
        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-2 shadow-sm">
            <a
            href={props.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-3 text-blue-600 underline break-all"
            >
                {props.shortUrl}
            </a>
            <button 
            onClick={handleCopy}
            className="bg-gradient-to-r from-[#1F2B44] to-[#0f172a] text-white px-3 py-2 flex gap-3 rounded-lg active:scale-95 font-semibold text-base hover:scale-105 ">
            <Copy size={20} strokeWidth={2} className='text-3xl' />
            </button>
        </div>
    )}
      </div>
     </div>
    )
}

export default Card
