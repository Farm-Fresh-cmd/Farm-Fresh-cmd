import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  titleUr: string;
  date: string; // Date can remain in English or be localized if needed, keeping English for simplicity now
  excerpt: string;
  excerptUr: string;
  imageUrl?: string;
}

const blogPostsData: BlogPost[] = [
  {
    id: "1",
    title: "The Benefits of Buying in Bulk for Your Business",
    titleUr: "آپ کے کاروبار کے لیے زیادہ مقدار میں خریدنے کے فوائد",
    date: "May 15, 2025",
    excerpt: "Discover how purchasing farm-fresh produce in bulk can save you money and ensure quality...",
    excerptUr: "دریافت کریں کہ فارم سے تازہ پیداوار زیادہ مقدار میں خریدنے سے آپ کے پیسے کیسے بچ سکتے ہیں اور معیار کو یقینی بنایا جا سکتا ہے۔۔۔",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "2",
    title: "Farmer Spotlight: Meet the Growers Behind Your Food",
    titleUr: "کسان سپاٹ لائٹ: اپنے کھانے کے پیچھے کاشتکاروں سے ملیں",
    date: "May 10, 2025",
    excerpt: "We take you behind the scenes to meet some of the dedicated farmers who make Farm Fresh possible...",
    excerptUr: "ہم آپ کو پردے کے پیچھے ان سرشار کسانوں سے ملواتے ہیں جو فارم فریش کو ممکن بناتے ہیں۔۔۔",
    imageUrl: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "3",
    title: "Tips for Storing Fresh Produce to Maximize Shelf Life",
    titleUr: "تازہ پیداوار کو زیادہ دیر تک محفوظ رکھنے کے لیے تجاویز",
    date: "May 5, 2025",
    excerpt: "Learn the best practices for storing your fruits and vegetables to keep them fresher for longer...",
    excerptUr: "اپنی پھلوں اور سبزیوں کو زیادہ دیر تک تازہ رکھنے کے لیے بہترین طریقے سیکھیں۔۔۔",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

export const BlogsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-20 bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        .font-urdu {
          font-family: 'Noto Nastaliq Urdu', serif;
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800 tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          From Our Blog
          <span className="block mt-1 text-2xl md:text-3xl font-normal font-urdu" lang="ur" dir="rtl">
            ہمارے بلاگ سے
          </span>
        </h2>
        <p 
          className="text-center text-gray-600 mb-12 md:text-lg leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Insights, tips, and stories from the world of fresh produce and farming.
          <span className="block mt-1 font-urdu text-base md:text-[17px]" lang="ur" dir="rtl">
            تازہ پیداوار اور کاشتکاری کی دنیا سے بصیرتیں، تجاویز اور کہانیاں۔
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPostsData.map((post) => (
            <Card 
              key={post.id} 
              className="flex flex-col overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border-gray-200 hover:border-green-300"
            >
              {post.imageUrl && (
                <CardHeader className="p-0 h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </CardHeader>
              )}
              <CardContent className="p-5 md:p-6 flex flex-col flex-grow">
                <CardTitle 
                  className="text-xl font-semibold mb-2 text-green-700 leading-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {post.title}
                  <span className="block mt-0.5 text-lg font-normal font-urdu leading-snug" lang="ur" dir="rtl">
                    {post.titleUr}
                  </span>
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>{post.date}</CardDescription>
                <div className="text-gray-600 text-sm mb-4 flex-grow space-y-1 leading-relaxed">
                  <p>{post.excerpt}</p>
                  <p className="font-urdu text-right" lang="ur" dir="rtl">{post.excerptUr}</p>
                </div>
                <Button 
                  variant="link" 
                  className="p-0 text-orange-600 hover:text-orange-700 self-start font-medium"
                  onClick={() => navigate(`/BlogPage/${post.id}`)} 
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Read More 
                  <span className="inline-block font-urdu text-sm ml-1" lang="ur" dir="rtl">(مزید پڑھیں)</span> 
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/BlogPage")} 
            className="border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-base md:text-lg rounded-full px-8 py-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            View All Posts
            <span className="block mt-0.5 text-sm md:text-base font-urdu leading-none" lang="ur" dir="rtl">تمام پوسٹس دیکھیں</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
