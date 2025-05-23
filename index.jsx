
import React from "react";
import { NavigationBar } from "../components/NavigationBar";
import { HeroSection } from "../components/HeroSection";
import { CategoriesSection } from "../components/CategoriesSection";
import { BlogsSection } from "../components/BlogsSection";
import { CustomerReviewsSection } from "../components/CustomerReviewsSection";
import { Footer } from "../components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-lime-50/70" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavigationBar />
      <main className="flex-grow">
        <HeroSection />
        {/* Placeholder for other sections like Product Category Showcase */}
        <div className="container mx-auto px-4 py-8">
          {/* Content for the rest of the landing page will go here - e.g., featured products if different from shop page */}
        </div>
        <CategoriesSection />
        <BlogsSection />
        <CustomerReviewsSection />
      </main>
      <Footer />
    </div>
  );
}
