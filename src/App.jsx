import React, { useState } from "react";
import Navbar from "./component/Navbar";
import axios from "./api/axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Loader from "./component/Loader";
import Hero from "./component/Hero";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidUrl = (value) => {
    try {
      let normalized = value;
      if (!normalized.startsWith("http")) {
        normalized = "https://" + normalized;
      }
      new URL(normalized);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    let finalUrl = url.trim();
    if (!finalUrl) {
      toast.error("Please enter a URL");
      return;
    }

    if (!finalUrl.startsWith("http")) {
      finalUrl = "https://" + finalUrl;
    }

    if (!isValidUrl(finalUrl)) {
      setShortUrl("");
      toast.error("Invalid URL");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/urls/", {
        original_url: finalUrl,
      });
      setShortUrl(response.data.short_url || "");
      toast.success("Link shortened successfully");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative text-slate-900 bg-[#F9FAFC]">
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 75% 25%, rgba(68, 126, 255, 0.08) 0%, rgba(255, 255, 255, 0) 60%),
            radial-gradient(circle at 65% 55%, rgba(162, 57, 243, 0.1) 0%, rgba(255, 255, 255, 0) 70%)
          `,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {loading && <Loader />}
      <Toaster position="top-center" />
      
      <div className="relative z-10">
        <Navbar />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Hero
            url={url}
            setUrl={setUrl}
            handleSubmit={handleSubmit}
            shortUrl={shortUrl}
          />
        </main>
      </div>
    </div>
  );
}

export default App;