import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ProductCard } from '../components/ProductCard';
import { Product, Farmer } from '../utils/firestoreTypes'; // Import Farmer type
import { db } from '../utils/firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { ChooseFarmerModal } from '../components/ChooseFarmerModal';
import { NavigationBar } from "../components/NavigationBar"; // Added
import { Footer } from "../components/Footer"; // Added
import { toast } from "sonner"; // Import toast for notifications

// Placeholder product (remains the same)
const placeholderProduct: Product = {
  id: 'placeholder-1',
  productName: 'Super Kernal Basmati Rice',
  productNameUrdu: 'سپر کرنل باسمتی چاول',
  images: ['https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'],
  pricePerUnit: 220,
  unit: 'kg',
  category: 'Rice',
  description: 'High-quality Super Kernal basmati rice, known for its aroma and long grains.',
  availableStock: 1000,
  minOrderQuantity: 10,
  farmerName: 'Placeholder Farmer',
  farmerId: 'farmer-placeholder',
  createdAt: new Date(),
  updatedAt: new Date(),
};


import { useCartStore } from '../utils/cartStore'; // Import the cart store

const ShopPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Store all fetched products
  const cartAddItem = useCartStore(state => state.addItem); // Get addItem from cart store
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState<boolean>(false);
  // Store the whole product object for which the farmer is being selected
  const [productForModalContext, setProductForModalContext] = useState<Product | null>(null); 
  const [selectedFarmers, setSelectedFarmers] = useState<{ [productId: string]: Farmer }>({}); // Store full Farmer object

  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // 'all' means no filter
  const [sortOrder, setSortOrder] = useState<string>("default"); // 'default', 'price-asc', 'price-desc'

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, orderBy("productName")); 
        const querySnapshot = await getDocs(q);

        // --- New Detailed Logs ---
        console.log("Firestore query snapshot object:", querySnapshot);
        console.log("Is snapshot empty? (querySnapshot.empty):", querySnapshot.empty);
        console.log("Snapshot size (querySnapshot.size):", querySnapshot.size);
        console.log("Snapshot docs array (querySnapshot.docs):", querySnapshot.docs);
        // --- End New Detailed Logs ---

        const fetchedProducts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log("Document data (inside map):", doc.id, data); // Diagnostic log for each document
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
          } as Product;
        });

        console.log("Fetched products array (after map):", fetchedProducts); // Diagnostic log

        if (fetchedProducts.length > 0) {
          setAllProducts(fetchedProducts);
        } else {
          setAllProducts([]); // Set to empty array if DB is empty, placeholder handled by display logic
          console.log("No products found in Firestore (after mapping), using placeholder.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Displaying sample product.");
        setAllProducts([]); // Fallback on error, placeholder handled by display logic
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const handleOpenFarmerModal = (product: Product) => { // Expect Product object
    setProductForModalContext(product);
    setIsFarmerModalOpen(true);
  };

  const handleCloseFarmerModal = () => {
    setIsFarmerModalOpen(false);
    setProductForModalContext(null); // Clear product context on close
  };

  // This function is called when a farmer is selected in the modal
  const handleFarmerSelectedInPage = (farmer: Farmer) => { 
    if (!productForModalContext) {
      console.error("Product context not available for farmer selection.");
      toast.error("Could not select farmer: Product information missing.");
      handleCloseFarmerModal();
      return;
    }
    setSelectedFarmers(prev => ({ 
      ...prev, 
      [productForModalContext.id]: farmer // Store the whole farmer object
    }));
    toast.success(`Selected ${farmer.name} for ${productForModalContext.productName}`);
    handleCloseFarmerModal();
  };


  // This function is passed to the modal for its internal search (if it were to call back)
  // However, the modal now handles its own search and calls onFarmerSelect with the chosen farmer.
  // So, this specific handleModalFarmerSearch on ShopPage is likely not actively used for final selection if modal calls onFarmerSelect.
  const handleModalFarmerSearch_Placeholder = (city: string) => {
    // This function's logic might need to be re-evaluated based on modal's final search/select flow.
    // For now, it's a placeholder if the modal were to use its onFarmerSearch prop for something.
    console.log("Modal searched for city:", city, "for product:", productForModalContext?.productName);
    // If the modal itself isn't selecting, but just passing search criteria, this would be different.
    // But the modal's "Select Farmer" button calls onFarmerSelect, so this path is less critical for selection.
  };

  const handleModalUseCurrentLocation = () => {
    if (!productForModalContext) { // Updated to use productForModalContext
      toast.error("Product ID not selected. Cannot fetch location for farmer.");
      handleCloseFarmerModal();
      return;
    }

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      handleCloseFarmerModal();
      return;
    }

    toast.info("Fetching your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        toast.success(`Location found: Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        
        console.log("Fetched coordinates:", { latitude, longitude });
        // For now, we'll simulate selecting a farmer as before, but with coordinates in the name.
        // This simulation is now less relevant as the modal directly selects a real farmer.
        // Consider removing or adapting this simulation if modal provides real nearby farmers.
        if (productForModalContext) { // Ensure context is available
            toast.info(`Simulating selection of a farmer near your location for ${productForModalContext.productName}. Actual nearby farmer search TBD.`);
            // Example: setSelectedFarmers(prev => ({ ...prev, [productForModalContext.id]: { id: 'sim-loc-farmer', name: `Farmer near [${latitude.toFixed(2)}, ${longitude.toFixed(2)}]` } }));
        } else {
            toast.error("Product context lost during location search.");
        }
        handleCloseFarmerModal(); 
      },
      (error) => {
        let errorMessage = "Could not get your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable it in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred while fetching location.";
            break;
        }
        toast.error(errorMessage);
        console.error("Geolocation error:", error);
        handleCloseFarmerModal(); // Close modal on error
      },
      {
        enableHighAccuracy: true, // Request more accurate position
        timeout: 10000,         // 10 seconds to get a fix
        maximumAge: 0           // Do not use a cached position
      }
    );
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = allProducts.find(p => p.id === productId);
    const farmer = selectedFarmers[productId];

    if (!product) {
      toast.error("Product not found. Cannot add to cart.");
      return;
    }
    if (!farmer) {
      toast.error("Please select a farmer first.");
      return;
    }
    cartAddItem(product, quantity, farmer); // Use cart store's addItem
    toast.success(`${product.productName} (Farmer: ${farmer.name}) added to cart! Quantity: ${quantity}`);
  };
  
  const handleShopNow = (productId: string) => {
    navigate(`/DetailedProductPage?productId=${productId}`);
  };

  // Memoized calculation for displayed products based on filters and sorting
  const displayProducts = useMemo(() => {
    console.log('[ShopPage] Calculating displayProducts. All fetched products:', allProducts);
    console.log('[ShopPage] Current selectedCategory:', selectedCategory);
    console.log('[ShopPage] Current searchTerm:', searchTerm);
    console.log('[ShopPage] Current sortOrder:', sortOrder);
    let productsToDisplay = [...allProducts];

    // Apply search term filter
    if (searchTerm) {
      productsToDisplay = productsToDisplay.filter(product => 
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      productsToDisplay = productsToDisplay.filter(product => product.category === selectedCategory);
    }

    // Apply sorting
    if (sortOrder === "price-asc") {
      productsToDisplay.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    } else if (sortOrder === "price-desc") {
      productsToDisplay.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
    } else if (sortOrder === "default") {
      // Optional: Could revert to a default sort like by name if needed, already sorted by name from fetch
    }

    console.log('[ShopPage] Products after filtering and sorting:', productsToDisplay);
    return productsToDisplay;
  }, [allProducts, searchTerm, selectedCategory, sortOrder]);

  const currentProductForModalName = productForModalContext?.productName;

  return (
    <div className="flex flex-col min-h-screen bg-lime-50/70" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavigationBar />
      {/* Removed existing page-specific header */}

      <main className="flex-grow container mx-auto px-2 sm:px-4 py-8">
        <div className="mb-8 p-4 bg-white rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
          <Input 
            placeholder="Search products..." 
            className="w-full md:flex-grow md:max-w-xs rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Vegetables">Vegetables</SelectItem>
                <SelectItem value="Fruits">Fruits</SelectItem>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Wheat">Wheat</SelectItem>
                <SelectItem value="Rice">Rice</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            {/* The Apply button is currently decorative as filters apply on change */}
            <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors px-6">Apply</Button>
          </div>
        </div>

        {isLoading && <div className="text-center py-10 text-xl text-gray-700">Loading products...</div>}
        {error && <div className="text-center py-10 text-xl text-red-500">{error}</div>}
        
        {!isLoading && !error && displayProducts.length === 0 && (
          <div className="text-center py-10 px-4">
            <p className="text-xl text-gray-700">No products match your criteria.</p>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}

        {!isLoading && !error && displayProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {displayProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onChooseFarmer={() => handleOpenFarmerModal(product)} // Pass whole product
                onAddToCart={handleAddToCart}
                onShopNow={handleShopNow}
                selectedFarmerName={selectedFarmers[product.id]?.name}
              />
            ))}
          </div>
        )}
      </main>
      
      <ChooseFarmerModal 
        isOpen={isFarmerModalOpen}
        onClose={handleCloseFarmerModal}
        onFarmerSelect={handleFarmerSelectedInPage} // Connect to the new handler
        // onFarmerSearch prop is less critical if modal handles its own search & uses onFarmerSelect
        // onFarmerSearch={handleModalFarmerSearch_Placeholder} 
        onUseCurrentLocation={handleModalUseCurrentLocation}
        productName={currentProductForModalName} // Use new context state's name
      />
      <Footer />
    </div>
  );
};

export default ShopPage;
