import React from "react";
import toast from "react-hot-toast";
import { Copy, ArrowRight, Share2, Calendar, Clock, Link as LinkIcon } from "lucide-react";

import {FaTwitter, FaFacebookF, FaLinkedinIn, FaWhatsapp, } from "react-icons/fa";

export default function Result({
    originalUrl,
    shortUrl,
    stats,
    resetApp,
}) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">

      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#32264C]">
          Your link is ready! 🎉
        </h1>

        <p className="text-[#7E7E8C] mt-3 text-sm sm:text-base">
          Shorten, share and track your link all in one place.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.05)] p-5 sm:p-7 lg:p-8">
        <div className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-[#32264C] mb-2">
              Original Link
            </label>

            <div className="flex items-stretch gap-3">
              <div className="flex-1 min-w-0 bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#6B7280] break-words">
                {originalUrl}
              </div>

              <button
                onClick={() => copyToClipboard(originalUrl)}
                className="w-12 h-12 shrink-0 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#32264C] mb-2">
              Short Link
            </label>

            <div className="flex items-stretch gap-3">
              <div className="flex-1 min-w-0 bg-[#F4F3FF] border border-[#DDD8FF] rounded-xl px-4 py-3 text-sm font-medium text-[#5855F4] break-words">
                {shortUrl}
              </div>

              <button
                onClick={() => copyToClipboard(shortUrl)}
                className="w-12 h-12 shrink-0 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>

          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex justify-center items-center gap-2 bg-[#5855F4] hover:bg-[#4F46E5] text-white font-semibold rounded-xl py-3 transition"
          >
            Visit Short Link
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatCard
          icon={<Share2 size={20} />}
          title="Total Clicks"
          value={stats.clicks}
        />

        <StatCard
          icon={<Calendar size={20} />}
          title="Created On"
          value={stats.createdOn}
        />

        <StatCard
          icon={<Clock size={20} />}
          title="Expires On"
          value={stats.expiresOn}
        />

        <StatCard
          icon={<LinkIcon size={20} />}
          title="Link Type"
          value="Dynamic"
        />
      </div>

      <div className="text-center mt-10">
        <p className="text-xs tracking-widest uppercase text-gray-500 mb-5">
          Share your link
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <SocialButton
            icon={<FaTwitter />}
            bg="bg-sky-100"
            color="text-sky-500"
          />

          <SocialButton
            icon={<FaFacebookF />}
            bg="bg-blue-100"
            color="text-blue-600"
          />

          <SocialButton
            icon={<FaLinkedinIn />}
            bg="bg-cyan-100"
            color="text-cyan-700"
          />

          <SocialButton
            icon={<FaWhatsapp />}
            bg="bg-green-100"
            color="text-green-600"
          />

          <button className="px-5 h-10 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50">
            More
          </button>
        </div>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={resetApp}
          className="text-[#5855F4] font-semibold hover:underline"
        >
          ← Shorten another link
        </button>
      </div>
    </section>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-col items-center text-center gap-3">
      <div className="w-11 h-11 rounded-full bg-[#F0EEFF] text-[#5855F4] flex items-center justify-center">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{title}</p>

        <p className="text-sm sm:text-base font-bold text-[#32264C] break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

function SocialButton({ icon, bg, color }) {
  return (
    <button
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${bg} ${color}`}
    >
      {icon}
    </button>
  );
}