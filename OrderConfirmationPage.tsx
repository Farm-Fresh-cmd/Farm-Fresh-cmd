import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="flex flex-col min-h-screen bg-lime-50/70" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavigationBar />
      <main className="flex-grow container mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
        <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
          Thank You For Your Order!
        </h1>
        <p className="text-gray-600 mb-2 text-lg">
          Your order has been placed successfully.
        </p>
        {orderId && (
          <p className="text-gray-500 mb-8">
            Your Order ID is: <span className="font-semibold text-green-600">{orderId}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3 rounded-lg shadow-md transition-transform duration-150 hover:scale-105">
            <Link to="/ShopPage">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 text-lg px-8 py-3 rounded-lg shadow-md transition-transform duration-150 hover:scale-105">
            <Link to="/">Go to Homepage</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
