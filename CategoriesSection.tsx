import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  nameUr: string;
  imageUrl: string;
  description: string;
  descriptionUr: string;
  link: string;
}

const categoriesData: Category[] = [
  {
    name: "Wheat",
    nameUr: "گندم",
    imageUrl: "https://static.databutton.com/public/9f696f41-628c-4897-aae7-8a5d64128ece/wheat.png", // User uploaded static asset
    description: "High-quality wheat for all your baking and cooking needs.",
    descriptionUr: "آپ کی تمام بیکنگ اور کھانا پکانے کی ضروریات کے لیے اعلیٰ معیار کی گندم۔",
    link: "/ShopPage?category=wheat",
  },
  {
    name: "Rice",
    nameUr: "چاول",
    imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", // New URL
    description: "Premium rice varieties, from long-grain to aromatic basmati.",
    descriptionUr: "پریمیم چاول کی اقسام، لمبے دانے والے چاول سے لے کر خوشبودار باسمتی تک۔",
    link: "/ShopPage?category=rice",
  },
  {
    name: "Fresh Vegetables",
    nameUr: "تازہ سبزیاں",
    imageUrl: "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", // New URL
    description: "Crisp, seasonal vegetables sourced directly from local farms.",
    descriptionUr: "مقامی کھیتوں سے براہ راست حاصل کردہ تازہ، موسمی سبزیاں۔",
    link: "/ShopPage?category=vegetables",
  },
  {
    name: "Seasonal Fruits",
    nameUr: "موسمی پھل",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Juicy and ripe fruits, perfect for every season.",
    descriptionUr: "رس بھرے اور پکے ہوئے پھل، ہر موسم کے لیے بہترین۔",
    link: "/ShopPage?category=fruits",
  },
  {
    name: "Dairy Products",
    nameUr: "دودھ کی مصنوعات",
    imageUrl: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Fresh milk, cheese, and other dairy delights.",
    descriptionUr: "تازہ دودھ، پنیر، اور دیگر دودھ کی لذتیں۔",
    link: "/ShopPage?category=dairy",
  },
];

export const CategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-20 bg-lime-50/90" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        .font-urdu {
          font-family: 'Noto Nastaliq Urdu', serif;
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800 tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Explore Our Categories
          <span className="block mt-1 text-2xl md:text-3xl font-normal font-urdu" lang="ur" dir="rtl">
            ہماری کیٹیگریز دریافت کریں
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {categoriesData.map((category) => (
            <Card 
              key={category.name} 
              className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-xl border-green-100 hover:border-green-300 flex flex-col"
              onClick={() => navigate(category.link)}
            >
              <CardHeader className="p-0">
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="w-full h-48 object-cover aspect-[5/4]"
                />
              </CardHeader>
              <CardContent className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <CardTitle 
                    className="text-xl font-semibold mb-1 text-green-700 leading-tight"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {category.name}
                    <span className="block mt-0.5 text-lg font-normal font-urdu" lang="ur" dir="rtl">
                      {category.nameUr}
                    </span>
                  </CardTitle>
                  <p className="text-gray-600 text-sm mb-1 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {category.description}
                  </p>
                  <p className="text-gray-500 text-sm font-urdu text-right leading-relaxed" lang="ur" dir="rtl">
                    {category.descriptionUr}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
