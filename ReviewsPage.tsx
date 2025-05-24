import React from "react";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, UserCircle } from "lucide-react"; // UserCircle for avatar placeholder

// Placeholder review data type
interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  productReviewed?: string; // Optional
  avatar?: string; // Optional: URL to an image or use UserCircle
}

// Placeholder Pakistani names and review details
const placeholderReviews: Review[] = [
  {
    id: 1,
    name: "Fatima Bibi",
    date: "May 12, 2024",
    rating: 5,
    comment: "The mangoes from Farm Fresh were the freshest I\'ve had all season! Reminded me of the ones from my family\'s farm in Multan. Excellent quality and fast delivery.",
    productReviewed: "Organic Sindhri Mangoes",
    avatar: undefined, // Will use UserCircle
  },
  {
    id: 2,
    name: "Ali Raza Khan",
    date: "May 10, 2024",
    rating: 4,
    comment: "Vegetables were very fresh and well-packaged. The carrots and spinach were particularly good. It would be great to see more variety from local Bahawalpur farms.",
    avatar: undefined,
  },
  {
    id: 3,
    name: "Sana Javed Ahmed",
    date: "May 5, 2024",
    rating: 5,
    comment: "Farm Fresh has made it so easy to get farm-fresh produce directly to my doorstep in Lahore. The customer service is also very responsive. Highly recommended!",
    productReviewed: "Mixed Vegetable Basket",
    avatar: undefined,
  },
  {
    id: 4,
    name: "Usman Malik Butt",
    date: "April 28, 2024",
    rating: 4,
    comment: "Good quality organic wheat flour. Made excellent rotis. The delivery took a day longer than expected, but the product quality was worth it.",
    productReviewed: "Organic Whole Wheat Flour",
    avatar: undefined,
  },
];

const ReviewsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-lime-50/70" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavigationBar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10 md:mb-16">
          <h1 
            className="text-4xl md:text-5xl font-bold text-green-700 tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Customer Testimonials
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Hear what our valued customers have to say about Farm Fresh and the freshness we deliver.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {placeholderReviews.map((review) => (
            <Card key={review.id} className="bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
              <CardHeader className="bg-green-50 p-5">
                <div className="flex items-center gap-3">
                  {review.avatar ? (
                    <img src={review.avatar} alt={review.name} className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <UserCircle className="h-12 w-12 text-gray-400" />
                  )}
                  <div>
                    <CardTitle 
                      className="text-lg font-semibold text-green-700"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {review.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {review.date}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    {review.productReviewed && (
                      <span className="ml-auto text-xs bg-lime-100 text-lime-700 px-2 py-0.5 rounded-full font-medium">
                        {review.productReviewed}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {review.comment}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewsPage;
