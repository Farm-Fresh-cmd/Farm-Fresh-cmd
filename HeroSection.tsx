import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-green-100 via-lime-50 to-white pt-10 pb-20 md:pt-16 md:pb-28 text-center overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        .font-urdu {
          font-family: 'Noto Nastaliq Urdu', serif;
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <img 
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Panoramic Farm View"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
        <div className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-32">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-green-800 tracking-tight leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Fresh Picks, Bulk Clicks.
            <span className="block mt-2 text-3xl sm:text-4xl md:text-5xl font-normal font-urdu" lang="ur" dir="rtl">
              تازہ چناؤ، زیادہ مقدار میں کلکس
            </span>
          </h1>
          <p 
            className="text-lg sm:text-xl md:text-2xl text-green-700 mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Discover the best local produce delivered in bulk, straight from the farm to your business.
            <span className="block mt-1 font-urdu text-base sm:text-lg md:text-xl" lang="ur" dir="rtl">
              مقامی بہترین پیداوار دریافت کریں جو زیادہ مقدار میں، سیدھا کھیت سے آپ کے کاروبار تک پہنچائی جاتی ہے۔
            </span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white text-base md:text-lg rounded-full px-8 sm:px-10 py-5 sm:py-6 transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
              onClick={() => navigate("/ShopPage")}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Order Now
              <span className="block mt-0.5 text-sm md:text-base font-urdu leading-none" lang="ur" dir="rtl">ابھی آرڈر کریں</span>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="text-green-700 border-green-600 hover:bg-lime-50 hover:text-green-800 text-base md:text-lg rounded-full px-8 sm:px-10 py-5 sm:py-6 transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
              onClick={() => navigate("/JoinFarmerPage")}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Partner With Us
              <span className="block mt-0.5 text-sm md:text-base font-urdu leading-none" lang="ur" dir="rtl">ہمارے ساتھ شراکت کریں</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
