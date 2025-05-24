import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { MapPin, Search } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig'; // Corrected path
import { Farmer } from '../utils/firestoreTypes'; // Import the Farmer interface

interface ChooseFarmerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFarmerSearch: (city: string) => void; // Placeholder for now, will evolve
  onFarmerSelect: (farmer: Farmer) => void; // Prop to call when a farmer is selected
  onUseCurrentLocation: () => void; // Placeholder for now
  productName?: string;
}

export const ChooseFarmerModal: React.FC<ChooseFarmerModalProps> = ({
  isOpen,
  onClose,
  onFarmerSearch,
  onFarmerSelect, // New prop
  onUseCurrentLocation,
  productName,
}) => {
  const [city, setCity] = React.useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Farmer[]>([]); // To store search results

  const handleSearch = async () => {
    if (!city.trim()) return;
    setIsSearching(true);
    setSearchResults([]); // Clear previous results
    console.log(`Searching for farmers in: ${city.trim()} for ${productName}`);

    try {
      const farmersRef = collection(db, 'Farmers'); // Corrected collection name to match Firestore
      // Query for exact city match (case-sensitive by default in Firestore)
      const q = query(farmersRef, where('city', '==', city.trim()));
      const querySnapshot = await getDocs(q);
      
      const fetchedFarmers: Farmer[] = [];
      querySnapshot.forEach((doc) => {
        fetchedFarmers.push({ id: doc.id, ...doc.data() } as Farmer);
      });
      
      setSearchResults(fetchedFarmers);
      console.log('Fetched Farmers:', fetchedFarmers); // Log the fetched farmers

      if (fetchedFarmers.length === 0) {
        console.log('No farmers found in', city.trim());
        // Optionally, display a message to the user in the modal
      }
      // The onFarmerSearch prop might need to be updated later to pass these results
      // onFarmerSearch(city.trim()); // Or onFarmerSearch(fetchedFarmers);

    } catch (error) {
      console.error("Error fetching farmers:", error);
      // Optionally, display an error message to the user
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocation = () => {
    onUseCurrentLocation();
    console.log(`Using current location for ${productName}`);
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-md sm:max-w-lg bg-white rounded-xl shadow-2xl">
        <DialogHeader className="pt-6 px-6">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-800 text-center" style={{ fontFamily: "'Georgia', serif"}}>
            Select Your Farmer
          </DialogTitle>
          {productName && (
            <DialogDescription className="text-center text-gray-600 mt-1">
              Choosing a farmer for: <span className="font-semibold text-green-700">{productName}</span>
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="px-6 py-4 space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Search by City:</p>
            <div className="flex space-x-2">
              <Input 
                type="text" 
                placeholder="Enter city name (e.g., Lahore)" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                className="flex-grow rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors px-4">
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <div>
            <Button 
              variant="outline"
              onClick={handleLocation}
              className="w-full border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 rounded-lg transition-colors flex items-center justify-center gap-2 group py-3"
            >
              <MapPin className="h-5 w-5 group-hover:text-green-600 transition-colors" /> Use Current Location
            </Button>
          </div>
        </div>

        {/* Display Search Results */}
        {isSearching && <p className="text-center text-gray-600 py-4">Searching...</p>}
        {!isSearching && searchResults.length > 0 && (
          <div className="mt-6 mb-4 px-6 max-h-60 overflow-y-auto space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Available Farmers:</h3>
            {searchResults.map((farmer) => (
              <div key={farmer.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-800">{farmer.name}</p>
                <p className="text-sm text-gray-600">{farmer.city}{farmer.village ? `, ${farmer.village}` : ''}</p>
                <p className="text-xs text-gray-500">Warehouse: {farmer.warehouseLocation}</p>
                <Button 
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white text-xs rounded-md py-1 px-2"
                  onClick={() => {
                    console.log("Selected farmer:", farmer);
                    onFarmerSelect(farmer); // Pass selected farmer back
                    onClose(); // Close modal after selection
                  }}
                >
                  Select Farmer
                </Button>
              </div>
            ))}
          </div>
        )}
        {!isSearching && city.trim() !== '' && searchResults.length === 0 && (
          <p className="text-center text-gray-600 py-4">No farmers found in {city.trim()}.</p>
        )}

        <DialogFooter className="px-6 pb-6 sm:justify-center">
          <DialogClose asChild>
            <Button type="button" variant="ghost" onClick={onClose} className="text-gray-700 hover:bg-gray-100 rounded-lg">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};