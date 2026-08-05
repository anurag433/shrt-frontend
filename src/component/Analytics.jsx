import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../api/axios";
import { 
  Copy, ArrowRight, BarChart2, Globe, Link2, 
  Calendar, Clock, ShieldCheck, Download, Trash2, Info 
} from "lucide-react";
import analyticsIcon from "../assets/analytics.png"; 

export default function Analytics() {
  const [shortCode, setShortCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const extractCode = (input) => {
    try {
      const url = new URL(input);
      return url.pathname.replace("/", "");
    } catch {
      return input.split("/").pop();
    }
  };

  const handleAnalyze = async () => {
    const queryValue = shortCode.trim() || extractCode(shortUrl.trim());
    if (!queryValue) {
      toast.error("Please enter a Code or URL");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("analytics/", {
        url: queryValue
      });
      
      setData(response.data);
    } catch (error) {
      toast.error("Link not found");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!data || !data.short_code) return;
    
    const confirmDelete = window.confirm("Are you sure you want to delete this link?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await axios.delete(`analytics/${data.short_code}`);
      toast.success("Link deleted successfully");
      setData(null); 
      setShortCode("");
      setShortUrl("");
    } catch (error) {
      toast.error("Failed to delete the link");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied`);
  };

  const handleDownloadQR = async () => {
    if (!data?.qr_code) return;
    try {
      const response = await fetch(data.qr_code);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.short_code}-qrcode.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("QR Code downloaded!");
    } catch (error) {
      toast.error("Failed to download QR code");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-1">
      
      <div className="relative mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-[44px] font-extrabold text-[#1a1525] tracking-tight">
            Link <span className="text-[#5855F4]">Analytics</span>
          </h1>
          <p className="text-[#7E7E8C] mt-2 text-lg">
            Track clicks, manage and analyze your shortened links.
          </p>
        </div>
        <div className="hidden md:block relative w-32 h-32">
    
           <div className="absolute inset-0 bg-[#E3E0FF] blur-2xl rounded-full opacity-60"></div>
           <img src={analyticsIcon} alt="Analytics 3D" className="relative z-10 w-full h-full object-contain" />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAnalyze();
        }}
        className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6 mb-10"
      >
        <div className="flex-1 w-full">
          <label className="block text-sm font-semibold text-[#1a1525] mb-2">
            Enter Short Code
          </label>

          <div className="relative">
            <Link2
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="e.g. a1B2c3"
              value={shortCode}
              onChange={(e) => {
                setShortCode(e.target.value);
                setShortUrl("");
              }}
              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-[#32264C] focus:outline-none focus:border-[#5855F4] focus:bg-white transition-colors"
            />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Enter the short code (case-sensitive)
          </p>
        </div>

        <div className="text-gray-400 font-bold text-sm uppercase hidden md:block mt-6">
          OR
        </div>

        <div className="flex-1 w-full">
          <label className="block text-sm font-semibold text-[#1a1525] mb-2">
            Enter Short URL
          </label>

          <div className="relative">
            <Link2
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="e.g. https://domain/a1B2c3"
              value={shortUrl}
              onChange={(e) => {
                setShortUrl(e.target.value);
                setShortCode("");
              }}
              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-[#32264C] focus:outline-none focus:border-[#5855F4] focus:bg-white transition-colors"
            />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Enter the complete short URL
          </p>
        </div>

        <div className="w-full md:w-auto mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3.5 bg-[#5855F4] hover:bg-[#4F46E5] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 shadow-md shadow-[#5855F4]/20"
          >
            {loading ? "Analyzing..." : "Analyze Link"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </div>
      </form>

      {data && (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
          
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#F0EEFF] p-2 rounded-lg text-[#5855F4]">
              <Link2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-[#1a1525]">My Shortened Link</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-0 border border-gray-100 rounded-2xl overflow-hidden">
              
              <DataRow icon={<BarChart2 size={18}/>} label="Total Clicks" value={data.clicks.toLocaleString()} isNumber />
              
              <DataRow 
                icon={<Globe size={18}/>} 
                label="Original URL" 
                value={data.original_url} 
                copyable 
                onCopy={() => copyToClipboard(data.original_url)}
              />
              
              <DataRow 
                icon={<Link2 size={18}/>} 
                label="Short URL" 
                value={data.short_url} 
                isLink 
                copyable 
                onCopy={() => copyToClipboard(data.short_url)}
              />
              
              <DataRow icon={<Calendar size={18}/>} label="Created On" value={data.created_at} />
              <DataRow icon={<Clock size={18}/>} label="Expires On" value={data.expiry_date} />
              <DataRow icon={<ShieldCheck size={18}/>} label="Link Status" value={data.status} isStatus />

            </div>

            <div className="lg:col-span-1 bg-[#F9FAFC] border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center">
              <h3 className="text-sm font-semibold text-[#1a1525] mb-4">QR Code</h3>
              <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100 w-full flex justify-center">
                <img src={data.qr_code} alt="QR Code" className="w-48 h-48 object-contain" />
              </div>
              
              <div className="flex w-full gap-3">
                <button 
                  onClick={handleDownloadQR}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#E3E0FF] text-[#5855F4] hover:bg-[#F0EEFF] font-medium py-2.5 rounded-xl transition-colors text-sm"
                >
                  <Download size={16} /> Download QR
                </button>
                <button 
                  onClick={() => copyToClipboard(data.qr_code)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-2.5 rounded-xl transition-colors text-sm"
                >
                  <Copy size={16} /> Copy Link
                </button>
              </div>
            </div>

          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6 items-center">
            
            <div className="lg:col-span-1">
              <button 
                onClick={handleDelete}
                className="w-full flex flex-col items-start bg-[#FEF2F2] border border-[#FCA5A5] hover:bg-[#FEE2E2] rounded-xl p-4 transition-colors group text-left"
              >
                <div className="flex items-center gap-2 text-red-600 font-bold mb-1">
                  <Trash2 size={18} className="group-hover:animate-pulse" />
                  Delete Link
                </div>
                <p className="text-xs text-red-500/80">This will permanently delete this link and its data.</p>
              </button>
            </div>

            <div className="lg:col-span-2 bg-[#F4F3FF] border border-[#E3E0FF] rounded-xl p-4 flex items-center gap-4 text-[#5855F4]">
              <Info size={24} className="shrink-0" />
              <p className="text-sm font-medium">Once deleted, this link and its analytics data cannot be recovered. Ensure you have backed up any necessary QR codes.</p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function DataRow({ icon, label, value, isNumber, isLink, isStatus, copyable, onCopy }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-4 px-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
      <div className="flex items-center gap-3 w-48 shrink-0 mb-2 sm:mb-0">
        <div className="text-[#5855F4]">{icon}</div>
        <span className="text-[14px] font-medium text-gray-600">{label}</span>
      </div>
      
      <div className="flex-1 flex items-center justify-between min-w-0">
        <span className={`text-[15px] truncate pr-4 ${
          isNumber ? 'font-bold text-[#5855F4] text-lg' : 
          isLink ? 'font-medium text-[#5855F4]' : 
          isStatus ? 'font-bold text-green-600' : 'font-medium text-[#1a1525]'
        }`}>
          {value}
        </span>
        
        {copyable && (
          <button 
            onClick={onCopy}
            className="text-gray-400 hover:text-[#5855F4] hover:bg-[#F0EEFF] p-2 rounded-lg transition-colors shrink-0"
            title="Copy"
          >
            <Copy size={18} />
          </button>
        )}
      </div>
    </div>
  );
}