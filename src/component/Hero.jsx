import { Zap, QrCode, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";
import heroImage from "../assets/chain.png";

export default function Hero({ url, setUrl, handleSubmit }) {
  
  const isInputEmpty = !url.trim();
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isInputEmpty) {
      handleSubmit();
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-9 pt-10 lg:pt-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-[48px] lg:text-[64px] leading-[1.1] font-extrabold text-[#32264C] tracking-tight">
            Shorten Links,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5855F4] to-[#8B5CF6]">
              Share Everywhere.
            </span>
          </h1>

          <p className="mt-6 text-[17px] text-[#7E7E8C] max-w-lg leading-relaxed font-medium">
            Transform your long URLs into short, trackable links.
            <br />
            Easy to share, easy to manage.
          </p>

          <div className="mt-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-2 flex flex-col sm:flex-row gap-2 max-w-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Paste your long URL here..."
              className="flex-1 h-14 bg-transparent px-6 outline-none text-lg text-gray-700 placeholder:text-gray-400"
            />
            <button
              onClick={handleSubmit}
              disabled={isInputEmpty}
              className={`h-14 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shrink-0 text-white ${
                isInputEmpty
                  ? "bg-[#81a6ed] cursor-not-allowed" 
                  : "bg-[#5855F4] hover:bg-[#4F46E5]" 
              }`}
            >
              Shorten
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex justify-center relative">
          <img
            src={heroImage}
            alt="Link Chain Illustration"
            className="w-[450px] lg:w-[480px] mx-auto object-contain relative z-10 drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-2 border-t border-gray-200/60">
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
    <div className="flex items-center lg:items-start flex-col lg:flex-row gap-4 text-center lg:text-left">
      <div className="w-12 h-12 rounded-xl bg-[#F0EEFF] text-[#5855F4] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-[#32264C] text-[15px]">{title}</h3>
        <p className="text-[14px] text-[#7E7E8C] mt-0.5">{desc}</p>
      </div>
    </div>
  );
}