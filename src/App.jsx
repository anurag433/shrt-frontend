import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Result from "./component/Result";
import Analytics from "./component/Analytics";
import Loader from "./component/Loader";
import axios from "./api/axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function Home({
  url,
  setUrl,
  shortUrl,
  loading,
  handleSubmit,
  submittedUrl,
  stats,
  qrCodeUrl,
  resetApp,
}) {
  return !shortUrl ? (
    <Hero
      url={url}
      setUrl={setUrl}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  ) : (
    <Result
    originalUrl={submittedUrl}
    shortUrl={shortUrl}
    stats={stats}
    qrCodeUrl={qrCodeUrl}
    resetApp={resetApp}
/>
  );
}

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [stats, setStats] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

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

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
      toast.error("Invalid URL");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("urls/", {
        original_url: finalUrl,
      });

      const data = response.data;

      setShortUrl(data.short_url || "");
      setSubmittedUrl(finalUrl);
      setQrCodeUrl(data.qr_code || "");

      setStats({
        clicks: data.clicks || 0,
        createdOn: formatDate(data.created_at),
        expiresOn: formatDate(data.expiry_date),
      });

      toast.success("Link shortened successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setUrl("");
    setShortUrl("");
    setSubmittedUrl("");
    setStats(null);
    setQrCodeUrl("");
  };

  return (
    <div className="min-h-screen relative text-slate-900 bg-[#F9FAFC]">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 75% 25%, rgba(68,126,255,.08) 0%, transparent 60%),
            radial-gradient(circle at 65% 55%, rgba(162,57,243,.10) 0%, transparent 70%)
          `,
        }}
      />

      {loading && <Loader />}
      <Toaster position="top-center" />

      <div className="relative z-10">
        <Navbar />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                    url={url}
                    setUrl={setUrl}
                    shortUrl={shortUrl}
                    loading={loading}
                    handleSubmit={handleSubmit}
                    submittedUrl={submittedUrl}
                    stats={stats}
                    qrCodeUrl={qrCodeUrl}
                    resetApp={resetApp}
                />
              }
            />

            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}