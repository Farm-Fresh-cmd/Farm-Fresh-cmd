import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";
import { useCartStore } from '../utils/cartStore';
import { toast } from 'sonner';
import { firebaseApp } from "app"; // Import Firebase app instance
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore(state => state.items);
  const cartSubtotal = useCartStore(state => state.getCartSubtotal());
  const clearCart = useCartStore(state => state.clearCart);

  const [formData, setFormData] = useState({
    email: '',
    streetAddress: '',
    city: '',
    province: '',
    postalCode: '',
    orderNotes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation (example)
    if (!formData.streetAddress || !formData.city || !formData.province) {
      toast.error('Please fill in all required fields: Street, City, Province.');
      return;
    }

    const orderDetails = {
      customerInfo: formData,
      items: cartItems,
      subtotal: cartSubtotal,
      paymentMethod: 'Cash on Delivery',
      orderDate: new Date().toISOString(),
      status: 'Pending',
    };

    try {
      const db = getFirestore(firebaseApp);
      const docRef = await addDoc(collection(db, "orders"), orderDetails);
      console.log("Order Submitted to Firestore with ID: ", docRef.id);
      toast.success(`Order placed successfully! Order ID: ${docRef.id}`);
      
      clearCart(); // Clear the cart
      
      // Navigate to an order confirmation/thank you page
      navigate(`/OrderConfirmationPage/${docRef.id}`);

    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to place order. Please try again.");
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-lime-50/70">
        <NavigationBar />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">Your cart is empty.</h1>
          <p className="text-gray-500 mb-8">Please add items to your cart before proceeding to checkout.</p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link to="/ShopPage">Shop for Products</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-lime-50/70" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavigationBar />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-10 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center" style={{ fontFamily: "'Georgia', serif" }}>
          Checkout
        </h1>
        
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Customer Information Section */}
          <Card className="lg:col-span-2 shadow-lg rounded-xl">
            <CardHeader className="bg-gray-50 rounded-t-xl">
              <CardTitle className="text-xl md:text-2xl text-gray-800">Shipping Information</CardTitle>
              <CardDescription className="text-lime-700">Please provide your delivery details.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</Label>
                  <Input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="rounded-lg" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">Street Address <span className="text-red-500">*</span></Label>
                <Input type="text" name="streetAddress" id="streetAddress" value={formData.streetAddress} onChange={handleInputChange} required className="rounded-lg" placeholder="House #, Street Name, Area" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City <span className="text-red-500">*</span></Label>
                  <Input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} required className="rounded-lg" placeholder="e.g., Lahore" />
                </div>
                <div>
                  <Label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Province/State <span className="text-red-500">*</span></Label>
                  <Input type="text" name="province" id="province" value={formData.province} onChange={handleInputChange} required className="rounded-lg" placeholder="e.g., Punjab" />
                </div>
                <div>
                  <Label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code (Optional)</Label>
                  <Input type="text" name="postalCode" id="postalCode" value={formData.postalCode} onChange={handleInputChange} className="rounded-lg" placeholder="e.g., 54000" />
                </div>
              </div>
              <div>
                <Label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</Label>
                <Textarea name="orderNotes" id="orderNotes" value={formData.orderNotes} onChange={handleInputChange} className="rounded-lg" placeholder="Any special instructions for delivery..." />
              </div>
            </CardContent>
          </Card>

          {/* Order Summary Section */}
          <Card className="lg:col-span-1 shadow-lg rounded-xl sticky top-24">
            <CardHeader className="bg-gray-50 rounded-t-xl">
              <CardTitle className="text-xl md:text-2xl text-gray-800">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium text-gray-700">{item.productName} (x{item.quantity})</p>
                    <p className="text-xs text-gray-500">Farmer: {item.selectedFarmer.name}</p>
                  </div>
                  <p className="text-gray-600 font-medium">
                    PKR {((item.pricePerUnit / (item.minOrderQuantity || 1)) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center text-lg font-semibold">
                <p className="text-gray-800">Subtotal</p>
                <p className="text-green-700">PKR {cartSubtotal.toFixed(2)}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Payment Method</p>
                <p className="text-gray-600 bg-lime-100 p-3 rounded-md text-center border border-lime-300">Cash on Delivery</p>
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg rounded-lg shadow-md transition-transform duration-150 hover:scale-105">
                Place Order
              </Button>
            </CardContent>
          </Card>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
