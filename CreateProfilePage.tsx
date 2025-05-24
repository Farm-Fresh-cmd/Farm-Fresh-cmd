import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";
import { useCurrentUser, firebaseApp } from "app"; // Assuming firebaseApp is exported for Firestore init
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'sonner';

interface ProfileData {
  fullName: string;
  businessName?: string;
  primaryRole: string;
  detailedAddress?: string;
  city: string;
  province: string;
  phoneNumber: string;
  profilePictureUrl?: string;
  profileComplete: boolean;
}

const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: userLoading } = useCurrentUser();
  const [profileData, setProfileData] = useState<Partial<ProfileData>>({
    fullName: '',
    businessName: '',
    primaryRole: '',
    detailedAddress: '',
    city: '',
    province: '',
    phoneNumber: '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      toast.error("You must be logged in to create a profile.");
      navigate('/LoginPage'); // Redirect to login if not authenticated
    }
  }, [user, userLoading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setProfileData(prev => ({ ...prev, primaryRole: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePictureFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      toast.error("User not found. Please log in again.");
      setIsLoading(false);
      return;
    }

    // Basic Validation
    if (!profileData.fullName || !profileData.primaryRole || !profileData.city || !profileData.province || !profileData.phoneNumber) {
      toast.error("Please fill in all required fields: Full Name, Role, City, Province, and Phone Number.");
      setIsLoading(false);
      return;
    }

    try {
      const db = getFirestore(firebaseApp);
      let profilePictureUrl = profileData.profilePictureUrl || '';

      if (profilePictureFile) {
        const storage = getStorage(firebaseApp);
        //Sanitize filename - for simplicity, using user ID and original extension
        const fileExtension = profilePictureFile.name.split('.').pop();
        const sanitizedFileName = `profile_${user.uid}.${fileExtension}`;
        const storageRef = ref(storage, `profilePictures/${sanitizedFileName}`);
        await uploadBytes(storageRef, profilePictureFile);
        profilePictureUrl = await getDownloadURL(storageRef);
      }
      
      const finalProfileData: ProfileData = {
        fullName: profileData.fullName!,
        businessName: profileData.businessName,
        primaryRole: profileData.primaryRole!,
        detailedAddress: profileData.detailedAddress,
        city: profileData.city!,
        province: profileData.province!,
        phoneNumber: profileData.phoneNumber!,
        profilePictureUrl: profilePictureUrl,
        profileComplete: true, // Mark profile as complete
      };

      await setDoc(doc(db, "userProfiles", user.uid), finalProfileData);
      toast.success("Profile created/updated successfully!");
      navigate('/ShopPage'); // Or to a dashboard page

    } catch (error) {
      console.error("Error creating profile: ", error);
      toast.error("Failed to create profile. Please try again.");
    }
    setIsLoading(false);
  };
  
  if (userLoading) {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading user...</p></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-lime-50/70" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavigationBar />
      <main className="flex-grow container mx-auto px-4 py-10 md:py-12">
        <Card className="max-w-2xl mx-auto shadow-xl rounded-xl">
          <CardHeader className="bg-gray-50 rounded-t-xl">
            <CardTitle className="text-2xl md:text-3xl text-green-700 text-center" style={{ fontFamily: "'Georgia', serif" }}>Complete Your Profile</CardTitle>
            <CardDescription className="text-center text-lime-700">Help us get to know you better.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="font-medium">Full Name <span className="text-red-500">*</span></Label>
                <Input type="text" name="fullName" id="fullName" value={profileData.fullName} onChange={handleInputChange} required className="rounded-lg" />
              </div>
              
              <div>
                <Label htmlFor="businessName" className="font-medium">Business Name (Optional)</Label>
                <Input type="text" name="businessName" id="businessName" value={profileData.businessName} onChange={handleInputChange} className="rounded-lg" />
              </div>

              <div>
                <Label htmlFor="primaryRole" className="font-medium">Primary Role <span className="text-red-500">*</span></Label>
                <Select name="primaryRole" value={profileData.primaryRole} onValueChange={handleRoleChange} required>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Farmer">Farmer</SelectItem>
                    <SelectItem value="Bulk Buyer">Bulk Buyer</SelectItem>
                    <SelectItem value="Restaurant Owner">Restaurant Owner</SelectItem>
                    <SelectItem value="Grocer">Grocer</SelectItem>
                    <SelectItem value="Caterer">Caterer</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="detailedAddress" className="font-medium">Detailed Address (Optional)</Label>
                <Textarea name="detailedAddress" id="detailedAddress" value={profileData.detailedAddress} onChange={handleInputChange} className="rounded-lg" placeholder="e.g., Street, Area, Nearest Landmark" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city" className="font-medium">City <span className="text-red-500">*</span></Label>
                  <Input type="text" name="city" id="city" value={profileData.city} onChange={handleInputChange} required className="rounded-lg" />
                </div>
                <div>
                  <Label htmlFor="province" className="font-medium">Province/Region <span className="text-red-500">*</span></Label>
                  <Input type="text" name="province" id="province" value={profileData.province} onChange={handleInputChange} required className="rounded-lg" />
                </div>
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="font-medium">Phone Number <span className="text-red-500">*</span></Label>
                <Input type="tel" name="phoneNumber" id="phoneNumber" value={profileData.phoneNumber} onChange={handleInputChange} required className="rounded-lg" placeholder="e.g., 03001234567" />
              </div>

              <div>
                <Label htmlFor="profilePicture" className="font-medium">Profile Picture (Optional)</Label>
                <Input type="file" name="profilePicture" id="profilePicture" onChange={handleFileChange} className="rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200" />
                {profileData.profilePictureUrl && <img src={profileData.profilePictureUrl} alt="Profile Preview" className="mt-2 h-20 w-20 object-cover rounded-full" />}
                {profilePictureFile && !profileData.profilePictureUrl && <p className="text-sm text-gray-500 mt-1">New image selected: {profilePictureFile.name}</p>}
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg rounded-lg shadow-md transition-transform duration-150 hover:scale-105" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CreateProfilePage;
