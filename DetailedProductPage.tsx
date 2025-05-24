import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Product } from '../utils/firestoreTypes';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MinusIcon, PlusIcon } from 'lucide-react'; // For +/- icons
import { ChooseFarmerModal } from '../components/ChooseFarmerModal'; // Import the modal
import { Farmer } from '../utils/firestoreTypes'; // Assuming Farmer type
import { useCartStore } from '../utils/cartStore'; // Import the cart store
import { toast } from "sonner"; // Import toast for notifications

const DetailedProductPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState<boolean>(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  useEffect(() => {
    if (!productId) {
      setError('Product ID is missing in the URL.');
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      setProduct(null); // Reset product state on new fetch
      try {
        const productRef = doc(db, 'products', productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data() as Omit<Product, 'id'>;
          const fetchedProduct = {
            id: productSnap.id,
            ...productData,
            createdAt: productData.createdAt?.toDate ? productData.createdAt.toDate() : new Date(),
            updatedAt: productData.updatedAt?.toDate ? productData.updatedAt.toDate() : new Date(),
          } as Product;
          setProduct(fetchedProduct);
          // Initialize quantity based on fetched product
          setQuantity(fetchedProduct.minOrderQuantity > 0 ? fetchedProduct.minOrderQuantity : 1);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError('Failed to fetch product data. Please try again.');
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (changeType: 'increment' | 'decrement' | 'input', value?: number) => {
    if (!product) return;

    let newQuantity = quantity;

    if (changeType === 'increment') {
      newQuantity = quantity + 1;
    } else if (changeType === 'decrement') {
      newQuantity = quantity - 1;
    } else if (changeType === 'input' && value !== undefined) {
      newQuantity = Number(value);
    }

    // Validate against minOrderQuantity and availableStock
    const minOrder = product.minOrderQuantity > 0 ? product.minOrderQuantity : 1;
    if (newQuantity < minOrder) {
      newQuantity = minOrder;
    }
    if (product.availableStock !== undefined && newQuantity > product.availableStock) {
      newQuantity = product.availableStock;
    }
    // Prevent non-numeric or zero/negative values from input if minOrder is 1
    if (newQuantity <= 0 && minOrder === 1) {
        newQuantity = 1;
    }

    setQuantity(newQuantity);
  };

  const handleChooseFarmer = () => {
    setIsFarmerModalOpen(true);
  };

  const handleFarmerSelected = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsFarmerModalOpen(false);
    // Potentially clear quantity or other dependent states if needed upon farmer change
  };

  const handleAddToCart = () => {
    if (!product || !selectedFarmer) {
      toast.error("Please select a product and a farmer first.");
      return;
    }
    // Get the addItem action from the store
    const addItemToCart = useCartStore.getState().addItem;
    addItemToCart(product, quantity, selectedFarmer);

    toast.success(`${product.productName} added to cart!`, {
      description: `Quantity: ${quantity} ${product.unit} from ${selectedFarmer.name}`,
      action: {
        label: "View Cart",
        onClick: () => {
          // TODO: Implement navigation to cart page once MYA-13.3 & MYA-13.6 are done
          // For now, can just log or alert
          console.log("Navigate to cart page triggered from toast.");
          alert("Navigation to cart page will be implemented soon!");
        },
      },
    });
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-lime-50/50 py-8 px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        <header className="mb-8 text-center">
          <Skeleton className="h-10 w-3/4 mx-auto" />
        </header>
        <main className="container mx-auto max-w-4xl">
          <Card className="shadow-xl">
            <CardHeader>
              <Skeleton className="h-8 w-1/2 mb-2" />
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-48 w-full" /> 
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    // This case should ideally be covered by error state if product not found
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-700">Product not available.</h1>
      </div>
    );
  }

  // If we reach here, product is loaded
  return (
    <div className="min-h-screen bg-lime-50/50 py-8 px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-700" style={{ fontFamily: "'Georgia', serif" }}>
          {product.productName} {/* Display actual product name */}
        </h1>
      </header>
      <main className="container mx-auto max-w-4xl">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800" style={{ fontFamily: "'Georgia', serif"}}>
              {product.productName}
            </CardTitle>
            {product.category && (
                <CardDescription className="text-md text-lime-700 font-semibold pt-1">
                    Category: {product.category}
                </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Product Image */}
            {product.images && product.images.length > 0 ? (
              <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-md bg-gray-200 flex items-center justify-center">
                <img 
                  src={product.images[0]} 
                  alt={`Image of ${product.productName}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}

            {/* Product Information Section */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Georgia', serif"}}>
                  About this Product
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description || "No description available."}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-lime-100/70 p-4 rounded-lg shadow-sm">
                  <p className="text-2xl font-bold text-green-700">
                    PKR {product.pricePerUnit} 
                    <span className="text-sm font-normal text-gray-600">/ {product.unit}</span>
                  </p>
                </div>

                <div className="bg-sky-100/70 p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Available Stock:</span> {product.availableStock} {product.unit}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Min. Order:</span> {product.minOrderQuantity} {product.unit}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="pt-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity:
                  </label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleQuantityChange('decrement')}
                      disabled={quantity <= (product.minOrderQuantity > 0 ? product.minOrderQuantity : 1)}
                      className="border-gray-300 hover:bg-gray-100 active:bg-gray-200"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <Input 
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={(e) => handleQuantityChange('input', parseInt(e.target.value, 10))}
                      onBlur={(e) => { // Ensure validation on blur if user types invalid number
                        let val = parseInt(e.target.value, 10);
                        if (isNaN(val)) val = product.minOrderQuantity > 0 ? product.minOrderQuantity : 1;
                        handleQuantityChange('input', val);
                      }}
                      min={product.minOrderQuantity > 0 ? product.minOrderQuantity : 1}
                      max={product.availableStock}
                      className="w-20 text-center border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleQuantityChange('increment')}
                      disabled={product.availableStock !== undefined && quantity >= product.availableStock}
                      className="border-gray-300 hover:bg-gray-100 active:bg-gray-200"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                
                {/* Action Buttons: Choose Farmer & Add to Cart */}
                <div className="mt-8 pt-6 border-t border-gray-300 space-y-4">
                  <div>
                    <Button 
                      onClick={handleChooseFarmer}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors duration-150 ease-in-out shadow-md rounded-lg py-3 text-base"
                    >
                      {selectedFarmer ? `Change Farmer (Selected: ${selectedFarmer.name})` : "Choose Your Farmer"}
                    </Button>
                    {selectedFarmer && (
                      <p className="text-sm text-green-700 mt-2 text-center">
                        Selected Farmer: <span className="font-semibold">{selectedFarmer.name}</span> from {selectedFarmer.city}
                      </p>
                    )}
                  </div>

                  <Button 
                    onClick={handleAddToCart}
                    disabled={!selectedFarmer || !product}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-base rounded-lg shadow-lg transition-all duration-150 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 active:scale-100"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {product && (
        <ChooseFarmerModal 
          isOpen={isFarmerModalOpen}
          onClose={() => setIsFarmerModalOpen(false)}
          productName={product.productName}
          // These are mock handlers for now, actual farmer search/location logic would be needed
          onFarmerSearch={(city) => {
            console.log("Search farmers in", city, "for", product.productName);
            // Simulate selecting a farmer
            handleFarmerSelected({ 
              id: 'farmer-sim-123', 
              name: 'Simulated Farms', 
              city: city,
              rating: 4.5,
              specialty: [product.category || 'General Produce']
            });
          }}
          onUseCurrentLocation={() => {
            console.log("Use current location for", product.productName);
            // Simulate selecting a farmer
            handleFarmerSelected({ 
              id: 'farmer-loc-456', 
              name: 'Local Harvest Co.', 
              city: 'Your Town',
              rating: 4.8,
              specialty: [product.category || 'Fresh Goods']
            });
          }}
        />
      )}
    </div>
  );
};

export default DetailedProductPage;
