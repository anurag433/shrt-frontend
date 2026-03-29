import React , {useState} from 'react'
import Navbar from './component/Navbar'
import Card from './component/Card'
import axios from './api/axios'
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function App() {

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  const handleSubmit = async () => {
    if (!isValidUrl(url)) {
      toast.error("Invalid URL");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/shorten/",
        {
          original_url: url,
        }
      );

      setShortUrl(response.data.short_url);

    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#D5EFFB] via-[#E6E9FA] to-[#BBB7C3]'>
      <Toaster position="top-center" />
      <Navbar/>
      <div className='flex justify-center items-center h-[60vh]'>
        <Card
          url={url}
          setUrl={setUrl}
          handleSubmit={handleSubmit}
          shortUrl={shortUrl}
        />
      </div>
    </div>
  )
}

export default App
