import React from "react";
import toast from "react-hot-toast";
import { Copy, ArrowRight, Share2, Calendar, Clock, Link as LinkIcon, Download } from "lucide-react";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

export default function Result({
    originalUrl,
    shortUrl,
    stats,
    qrCodeUrl,
    resetApp,
}) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  const handleDownloadQR = async () => {
    if (!qrCodeUrl) return;
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'shrt-qrcode.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("QR Code downloaded!");
    } catch (error) {
      toast.error("Failed to download QR code");
    }
  };

const shareTwitter = () => {
  const text = "Check out this link!";
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(shortUrl)}`;

  window.open(url, "_blank", "noopener,noreferrer");
};

const shareFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shortUrl
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
};

const shareLinkedIn = () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shortUrl
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
};


const shareWhatsApp = () => {
  const message = `Check out this link: ${shortUrl}`;

  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
};

const shareNative = async () => {
  if (!navigator.share) {
    await copyToClipboard(shortUrl);
    toast.success("Link copied! Sharing is not supported on this browser.");
    return;
  }

  try {
    await navigator.share({
      title: "Short Link",
      text: "Check out this link!",
      url: shortUrl,
    });
  } catch (error) {
    if (error.name !== "AbortError") {
      toast.error("Unable to share link");
    }
  }
};
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-5">

      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#32264C]">
          Your short link is ready
        </h1>
        <p className="text-[#7E7E8C] mt-3 text-sm sm:text-base">
          Copy it, share it, scan the QR code, and track every click—all in one place.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.05)] p-5 sm:p-7 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-6">
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
                  title="Copy Original Link"
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
                  title="Copy Short Link"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>

            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto inline-flex justify-center items-center gap-2 bg-[#5855F4] hover:bg-[#4F46E5] text-white font-semibold rounded-xl px-8 py-3 transition"
            >
              Visit Short Link
              <ArrowRight size={18} />
            </a>
          </div>
          {qrCodeUrl && (
            <div className="lg:col-span-1 flex flex-col items-center p-6 bg-[#F8F9FA] border border-gray-100 rounded-2xl">
              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[#32264C]">Scan QR Code</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F0EEFF] text-[#5855F4] px-2.5 py-1 rounded-md">
                  New
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-5 w-full flex justify-center">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code for Shortened Link" 
                  className="w-36 h-36 object-contain"
                />
              </div>
              <button
                onClick={handleDownloadQR}
                className="w-full inline-flex justify-center items-center gap-2 bg-[#F0EEFF] hover:bg-[#E3E0FF] text-[#5855F4] font-semibold rounded-xl py-2.5 transition-colors"
              >
                <Download size={18} />
                Download QR
              </button>
            </div>
          )}

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
            onClick={shareTwitter}
            title="Share on Twitter"
          />
          <SocialButton
            icon={<FaFacebookF />}
            bg="bg-blue-100"
            color="text-blue-600"
            onClick={shareFacebook}
            title="Share on Facebook"
          />
          <SocialButton
            icon={<FaLinkedinIn />}
            bg="bg-cyan-100"
            color="text-cyan-700"
            onClick={shareLinkedIn}
            title="Share on LinkedIn"
          />
          <SocialButton
            icon={<FaWhatsapp />}
            bg="bg-green-100"
            color="text-green-600"
            onClick={shareWhatsApp}
            title="Share on WhatsApp"
          />
          <button
            onClick={shareNative}
            className="px-5 h-10 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition">
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

function SocialButton({
  icon,
  bg,
  color,
  onClick,
  title,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${bg} ${color}`}
    >
      {icon}
    </button>
  );
}