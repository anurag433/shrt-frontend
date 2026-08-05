import {Zap, QrCode, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";
import heroImage from "../assets/chain.png";

export default function Hero({
  url,
  setUrl,
  handleSubmit,
  loading = false,
  setShortUrl,
}) {
  const isInputEmpty = !url.trim();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 pt-8 lg:pt-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <h1 className="text-[42px] sm:text-[52px] lg:text-[64px] leading-[1.1] font-extrabold text-[#32264C] tracking-tight">
            Shorten Links,
            <br />
            <span className="bg-gradient-to-r from-[#5855F4] to-[#8B5CF6] bg-clip-text text-transparent">
              Share Everywhere.
            </span>
          </h1>

          <p className="mt-6 text-[16px] sm:text-[17px] text-[#7E7E8C] leading-relaxed max-w-lg font-medium">
            Transform your long URLs into short, trackable links.
            <br />
            Easy to share, easy to manage.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="mt-10 max-w-xl">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);

                  if (setShortUrl) {
                    setShortUrl("");
                  }
                }}
                placeholder="Paste your long URL here..."
                className="w-full sm:flex-1 h-12 sm:h-14 px-4 text-base outline-none bg-transparent"
              />

              <button
                type="submit"
                disabled={isInputEmpty || loading}
                className={`h-12 sm:h-14 w-full sm:w-auto px-8 rounded-xl font-semibold flex items-center justify-center gap-2 text-white transition ${
                   isInputEmpty || loading
                       ? "bg-[#9CB5F4]"
                       : "bg-[#5855F4] hover:bg-[#4F46E5]"
                }`}
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    Shorten
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="Link Illustration"
            className="w-[300px] sm:w-[380px] lg:w-[480px] object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 lg:mt-20 pt-8 border-t border-gray-200/60">
        <Feature
          icon={<Zap size={22} />}
          title="Lightning Fast"
          desc="Instantly shorten your URLs"
        />

        <Feature
          icon={<QrCode size={22} />}
          title="QR Codes"
          desc="Scan and visit instantly"
        />

        <Feature
          icon={<BarChart3 size={22} />}
          title="Analytics"
          desc="Track clicks and insights"
        />

        <Feature
          icon={<ShieldCheck size={22} />}
          title="Secure"
          desc="Safe and reliable links"
        />
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
      <div className="w-12 h-12 rounded-xl bg-[#F0EEFF] text-[#5855F4] flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-[#32264C] text-[15px]">
          {title}
        </h3>

        <p className="text-[14px] text-[#7E7E8C] mt-1">
          {desc}
        </p>
      </div>
    </div>
  );
}