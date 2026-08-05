import { Clock3 } from "lucide-react";

export default function ComingSoon() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-[#F0EEFF] flex items-center justify-center">
          <Clock3 className="w-10 h-10 text-[#5855F4]" />
        </div>

        <h1 className="mt-8 text-4xl md:text-6xl font-extrabold text-[#32264C]">
          Coming Soon
        </h1>

        <p className="mt-4 text-lg text-[#7E7E8C] max-w-md mx-auto">
          We're working hard to bring this feature to you.
          Stay tuned for exciting updates!
        </p>

        <span className="inline-block mt-8 px-5 py-2 rounded-full bg-[#F0EEFF] text-[#5855F4] font-semibold">
          🚀 Under Development
        </span>

      </div>
    </section>
  );
}