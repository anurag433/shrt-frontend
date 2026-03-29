import React , {useState} from 'react'
import Navbar from './component/Navbar'
import Card from './component/Card'
import axios from './api/axios'


function App() {

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async () => {
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
    }
  };


  return (
    <div className='min-h-screen bg-gradient-to-br from-[#D5EFFB] via-[#E6E9FA] to-[#BBB7C3]'>
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
