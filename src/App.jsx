import React , {useState} from 'react'
import Navbar from './component/Navbar'
import Card from './component/Card'
import axios from './api/axios'
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function App() {

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
      setShortUrl("") ;
      toast.error("Invalid URL");
      return;
    }
    try {
      const response = await axios.post(
        "/urls/",
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
      <div className='flex justify-center items-center px-4 min-h-[70vh]'>
        <Card
          url={url}
          setUrl={setUrl}
          handleSubmit={handleSubmit}
          shortUrl={shortUrl}
          loading ={loading}
        />
      </div>
    </div>
  )
}

export default App
