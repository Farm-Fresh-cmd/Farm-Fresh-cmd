import React from 'react';
import { useCartStore, CartItem } from '../utils/cartStore';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ShoppingBag, MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';

const CartPage: React.FC = () => {
  const items = useCartStore(state => state.items);
  const cartSubtotal = useCartStore(state => state.getCartSubtotal());
  const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
  const removeItem = useCartStore(state => state.removeItem);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-lime-50/50 py-8 px-4 flex flex-col items-center justify-center text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <ShoppingBag className="w-24 h-24 text-gray-400 mb-6" />
        <h1 className="text-3xl font-bold text-gray-700 mb-2" style={{ fontFamily: "'Georgia', serif" }}>Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform duration-150 hover:scale-105">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lime-50/50 py-8 px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-green-700" style={{ fontFamily: "'Georgia', serif" }}>Shopping Cart</h1>
      </header>

      <main className="container mx-auto max-w-4xl">
        <Card className="shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-2xl text-gray-800" style={{ fontFamily: "'Georgia', serif"}}>Order Summary</CardTitle>
            <CardDescription className="text-lime-700">Review items in your cart.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {items.map((item: CartItem) => (
                <div key={item.id} className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4 hover:bg-lime-100/30 transition-colors duration-150">
                  {/* Log the productImage URL */}
                  {console.log(`CartItem ${item.productName} - productImage URL:`, item.productImage)}
                  <div className="w-24 h-24 md:w-20 md:h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 shadow">
                    <img 
                      src={item.productImage || 'https://via.placeholder.com/100'} 
                      alt={item.productName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                    <p className="text-sm text-gray-500">
                      Farmer: <span className="font-medium text-lime-600">{item.selectedFarmer.name}</span>{item.selectedFarmer.city ? `, ${item.selectedFarmer.city}` : ''}
                    </p>
                    <p className="text-sm text-gray-500">Unit Price: PKR {item.pricePerUnit} / {item.unit}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end mt-4 md:mt-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8 border-gray-300 hover:bg-gray-100 active:bg-gray-200"
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="text-md font-semibold text-gray-700 w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8 border-gray-300 hover:bg-gray-100 active:bg-gray-200"
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        // TODO: Optionally disable if quantity reaches product.availableStock, needs access to full product details or cart item enrichment
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      PKR {((item.pricePerUnit / (item.minOrderQuantity || 1)) * item.quantity).toFixed(2)}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-100/50 flex items-center gap-1 px-2 py-1 h-auto"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2Icon className="h-4 w-4" /> Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-0"/>

            <div className="p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-semibold text-gray-700">Subtotal</p>
                <p className="text-2xl font-bold text-green-700">PKR {cartSubtotal.toFixed(2)}</p>
              </div>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg rounded-lg shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-100">
                <Link to="/CheckoutPage">Proceed to Checkout</Link>
              </Button>
               <p className="text-xs text-center text-gray-500 mt-3">
                 Shipping and taxes calculated at checkout.
               </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button variant="outline" asChild className="border-lime-600 text-lime-700 hover:bg-lime-100 hover:text-lime-800 transition-colors shadow-sm">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
