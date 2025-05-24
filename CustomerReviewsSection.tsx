import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  locationEn: string; // English location/title
  locationUr: string; // Urdu location/title
  avatarFallback: string;
  avatarUrl?: string; // Will keep this optional, but use fallbacks for now
  rating: number;
  reviewTextEn: string; // English review text
  reviewTextUr: string; // Urdu review text
}

const reviewsData: Review[] = [
  {
    id: "1",
    name: "Ahmed Khan",
    locationEn: "Restaurant Owner, Lahore",
    locationUr: "ریستوراں مالک، لاہور",
    avatarFallback: "AK",
    // avatarUrl: "path/to/ahmed_khan_avatar.png", // Example placeholder
    rating: 5,
    reviewTextEn: "The produce from Farm Fresh is always fresh and helps my restaurant attract more customers. Ordering in bulk is very simple.",
    reviewTextUr: "فارم فریش کی پیداوار ہمیشہ تازہ ہوتی ہے اور میرے ریستوراں کو مزید گاہکوں کو متوجہ کرنے میں مدد دیتی ہے۔ زیادہ مقدار میں آرڈر کرنا بہت آسان ہے۔",
  },
  {
    id: "2",
    name: "Fatima Bibi",
    locationEn: "Grocery Store Owner, Multan",
    locationUr: "کریانہ اسٹور مالک، ملتان",
    avatarFallback: "FB",
    // avatarUrl: "path/to/fatima_bibi_avatar.png", // Example placeholder
    rating: 5,
    reviewTextEn: "As a small grocery store owner, Farm Fresh has made it easy to get quality fruits and vegetables directly from farms. My customers are happier!",
    reviewTextUr: "ایک چھوٹی کریانہ اسٹور کی مالک کی حیثیت سے، فارم فریش نے فارموں سے براہ راست معیاری پھل اور سبزیاں حاصل کرنا آسان بنا دیا ہے۔ میرے گاہک زیادہ خوش ہیں!",
  },
  {
    id: "3",
    name: "Imran Nawaz",
    locationEn: "Catering Service, Faisalabad",
    locationUr: "کیٹرنگ سروس، فیصل آباد",
    avatarFallback: "IN",
    // avatarUrl: "path/to/imran_nawaz_avatar.png", // Example placeholder
    rating: 4,
    reviewTextEn: "We trust Farm Fresh for our catering needs. The platform is easy to use, and the direct connection to farmers is great. Highly recommended!",
    reviewTextUr: "ہم اپنی کیٹرنگ کی ضروریات کے لیے فارم فریش پر بھروسہ کرتے ہیں۔ پلیٹ فارم استعمال میں آسان ہے، اور کسانوں سے براہ راست رابطہ بہترین ہے۔ انتہائی سفارش کی جاتی ہے!",
  },
];

const renderStars = (rating: number) => {
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
};

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-green-50" style={{ fontFamily: "'Inter', sans-serif" }}>
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
          What Our Customers Say
          <span className="block mt-1 text-2xl md:text-3xl font-normal font-urdu" lang="ur" dir="rtl">
            ہمارے صارفین کیا کہتے ہیں۔
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviewsData.map((review) => (
            <Card key={review.id} className="flex flex-col bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl border-green-100 hover:border-green-300">
              <CardHeader className="flex flex-row items-center space-x-4 p-5 md:p-6">
                <Avatar className="h-14 w-14 text-lg">
                  {review.avatarUrl && <AvatarImage src={review.avatarUrl} alt={review.name} />}
                  <AvatarFallback className="bg-green-600 text-white font-semibold">{review.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <CardTitle 
                    className="text-lg font-semibold text-green-700 leading-tight"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {review.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {review.locationEn}
                    <span className="block text-xs font-urdu text-gray-500 leading-normal" lang="ur" dir="rtl">
                      {review.locationUr}
                    </span>
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-5 md:p-6 pt-0 flex-grow flex flex-col">
                <div className="flex items-center mb-3">
                  {renderStars(review.rating)}
                </div>
                <div className="text-gray-700 leading-relaxed space-y-2 text-[15px]">
                  <p>&ldquo;{review.reviewTextEn}&rdquo;</p>
                  <p className="font-urdu text-right leading-relaxed" lang="ur" dir="rtl">
                    &ldquo;{review.reviewTextUr}&rdquo;
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
