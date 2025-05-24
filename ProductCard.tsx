import React, { useState } from 'react';
import { Product } from '../utils/firestoreTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Users, ArrowRight } from 'lucide-react'; // Removed AlertTriangle for now

interface ProductCardProps {
  product: Product;
  onChooseFarmer: (productId: string) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onShopNow: (productId: string) => void;
  selectedFarmerName?: string | null; // Added to display selected farmer
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onChooseFarmer, 
  onAddToCart, 
  onShopNow, 
  selectedFarmerName 
}) => {
  const [quantity, setQuantity] = useState<number>(product.minOrderQuantity || 10);

  const handleQuantityChange = (value: string) => {
    const numQuantity = parseInt(value, 10);
    if (!isNaN(numQuantity)) {
      setQuantity(Math.max(product.minOrderQuantity || 10, Math.min(numQuantity, 10000)));
    }
  };

  const handleActualAddToCart = () => {
    if (!selectedFarmerName) { // Check if farmer is selected via prop
      alert("Please choose a farmer first.");
      return;
    }
    onAddToCart(product.id, quantity);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white">
      <CardHeader className="p-0 relative">
        <img 
          src={(product.imageUrl ? product.imageUrl : 'https://via.placeholder.com/400x300.png?text=No+Image')} 
          alt={product.productName} 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.category && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
            {product.category}
          </span>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-bold text-gray-800 mb-1" style={{ fontFamily: "'Georgia', serif" }}>
          {product.productName}
        </CardTitle>
        <p className="text-2xl font-semibold text-green-700 mb-2">
          PKR {product.pricePerUnit} <span className="text-sm font-normal text-gray-500">/ {product.unit}</span>
        </p>
        <p className="text-xs text-gray-600 mb-3 h-10 overflow-y-auto">
          {product.description}
        </p>
        
        {selectedFarmerName && (
          <div className="my-2 p-2 bg-lime-100 border border-lime-300 rounded-md text-sm text-lime-800">
            <p>Selected Farmer: <span className="font-semibold">{selectedFarmerName}</span></p>
          </div>
        )}

        <div className="mt-2 mb-3">
          <label htmlFor={`quantity-${product.id}`} className="block text-sm font-medium text-gray-700 mb-1">Quantity ({product.unit}):</label>
          <Select 
            defaultValue={String(quantity)}
            onValueChange={handleQuantityChange}
          >
            <SelectTrigger id={`quantity-${product.id}`} className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500">
              <SelectValue placeholder="Select quantity" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100, 200, 500, 1000, 5000, 10000].map(q => {
                if (q >= (product.minOrderQuantity || 10) && q <= 10000) {
                  return <SelectItem key={q} value={String(q)}>{q} {product.unit}</SelectItem>;
                }
                return null;
              })}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">Min order: {product.minOrderQuantity || 10} {product.unit}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t border-gray-200 bg-gray-50/50">
        <div className="w-full space-y-2">
          <Button 
            variant={selectedFarmerName ? "secondary" : "default"} // Style changes if farmer is selected
            className={`w-full rounded-lg transition-colors flex items-center justify-center gap-2 group ${selectedFarmerName ? 'bg-lime-200 hover:bg-lime-300 text-lime-800' : 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900'}`}
            onClick={() => onChooseFarmer(product.id)} // Calls prop to open modal
          >
            <Users className={`h-5 w-5 ${selectedFarmerName ? "text-green-700" : ""}`} /> 
            {selectedFarmerName ? selectedFarmerName : "Choose Farmer"}
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="w-full border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 rounded-lg transition-colors flex items-center justify-center gap-2 group"
              onClick={() => onShopNow(product.id)} 
            >
              Details <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
            </Button>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
              onClick={handleActualAddToCart}
              disabled={!selectedFarmerName} // Enable/disable based on prop
            >
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
