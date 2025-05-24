import React, { useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Removed CardTitle, CardDescription as they are not directly used here for now
import { AlertCircle, CheckCircle2, User, Home, MapPin, Warehouse, ListChecks, PhoneIcon as Phone } from "lucide-react"; // Added more icons

// Province options
const provinceOptions = [
  { value: "punjab", en: "Punjab", ur: "پنجاب" },
  { value: "sindh", en: "Sindh", ur: "سندھ" },
  { value: "khyber_pakhtunkhwa", en: "Khyber Pakhtunkhwa", ur: "خیبر پختونخوا" },
  { value: "balochistan", en: "Balochistan", ur: "بلوچستان" },
  { value: "gilgit_baltistan", en: "Gilgit-Baltistan", ur: "گلگت بلتستان" },
  { value: "azad_kashmir", en: "Azad Kashmir", ur: "آزاد کشمیر" },
  { value: "islamabad_capital_territory", en: "Islamabad Capital Territory", ur: "اسلام آباد دارالحکومت" },
];

// Product options
const productOptions = [
  { id: "wheat", en: "Wheat", ur: "گندم" },
  { id: "rice", en: "Rice", ur: "چاول" },
  { id: "cotton", en: "Cotton", ur: "کپاس" },
  { id: "sugarcane", en: "Sugarcane", ur: "گنا" },
  { id: "maize", en: "Maize (Corn)", ur: "مکئی" },
  { id: "mangoes", en: "Mangoes", ur: "آم" },
  { id: "oranges", en: "Oranges (Citrus)", ur: "مالٹے (ترشاوا پھل)" },
  { id: "potatoes", en: "Potatoes", ur: "آلو" },
  { id: "onions", en: "Onions", ur: "پیاز" },
  { id: "tomatoes", en: "Tomatoes", ur: "ٹماٹر" },
  { id: "other_vegetables", en: "Other Vegetables", ur: "دیگر سبزیاں" },
  { id: "other_fruits", en: "Other Fruits", ur: "دیگر پھل" },
  { id: "dairy_products", en: "Dairy Products", ur: "دودھ کی مصنوعات" },
  { id: "poultry", en: "Poultry", ur: "پولٹری" },
];

interface FormFieldProps {
  id: string;
  enLabel: string;
  urLabel: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholderEn?: string;
  placeholderUr?: string;
  icon?: React.ElementType;
  isTextarea?: boolean;
  required?: boolean;
}

const BilingualFormField: React.FC<FormFieldProps> = ({
  id,
  enLabel,
  urLabel,
  name,
  value,
  onChange,
  type = "text",
  placeholderEn,
  placeholderUr,
  icon: IconComponent,
  isTextarea = false,
  required = true,
}) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-medium text-gray-800">
      <span className="block">{enLabel}{required && <span className="text-red-500">*</span>}</span>
      <span className="block text-right font-urdu" lang="ur" dir="rtl">
        {urLabel}{required && <span className="text-red-500">*</span>}
      </span>
    </label>
    <div className="relative flex items-center">
      {IconComponent && <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-green-600" />}
      {isTextarea ? (
        <Textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`${placeholderEn || enLabel} / ${placeholderUr || urLabel}`}
          required={required}
          className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${IconComponent ? 'pl-10' : 'px-3'} py-2.5 peer`}
          rows={3}
        />
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`${placeholderEn || enLabel} / ${placeholderUr || urLabel}`}
          required={required}
          className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${IconComponent ? 'pl-10' : 'px-3'} py-2.5 peer`}
        />
      )}
    </div>
  </div>
);

const JoinFarmerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    province: "",
    city: "",
    village: "",
    warehouseLocation: "",
    products: [] as string[], // Ensure products is typed as string array
    whatsappNumber: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allFieldsFilled = 
      formData.fullName &&
      formData.fatherName &&
      formData.province &&
      formData.city &&
      // formData.village && // Village can be optional based on typical rural addresses
      formData.warehouseLocation &&
      formData.products.length > 0 &&
      formData.whatsappNumber;

    if (allFieldsFilled) {
      setIsSubmitted(true);
      console.log("Form data:", formData);
      // Reset form after successful submission for potential next entry
      setFormData({
        fullName: "",
        fatherName: "",
        province: "",
        city: "",
        village: "",
        warehouseLocation: "",
        products: [],
        whatsappNumber: "",
      });
    } else {
      alert("Please fill all required fields. / براہ کرم تمام مطلوبہ خانے پُر کریں۔");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProvinceChange = (value: string) => {
    setFormData(prev => ({ ...prev, province: value }));
  };

  const handleProductChange = (productId: string) => {
    setFormData(prev => {
      const currentProducts = prev.products;
      if (currentProducts.includes(productId)) {
        return { ...prev, products: currentProducts.filter(id => id !== productId) };
      } else {
        return { ...prev, products: [...currentProducts, productId] };
      }
    });
  };
  
  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-lime-50/70" style={{ fontFamily: "'Inter', sans-serif" }}>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
          .font-urdu {
            font-family: 'Noto Nastaliq Urdu', serif;
          }
        `}</style>
        <NavigationBar />
        <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-12 md:py-20">
          <Card className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 
              className="text-2xl md:text-3xl font-bold text-green-700 mb-3"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Registration Successful!
              <span className="block mt-1 text-xl md:text-2xl font-urdu" lang="ur" dir="rtl">رجسٹریشن کامیاب!</span>
            </h2>
            <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed">
              Thank you for registering with FarmFresh. We will contact you soon on your WhatsApp number.
              <br />
              <span className="font-urdu" lang="ur" dir="rtl">
                فارم فریش کے ساتھ رجسٹر کرنے کا شکریہ۔ ہم جلد ہی آپ سے آپ کے واٹس ایپ نمبر پر رابطہ کریں گے۔
              </span>
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)} 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-base transition-colors duration-200"
            >
              Register Another Farmer
              <span className="block mt-0.5 text-sm font-urdu" lang="ur" dir="rtl">ایک اور کسان رجسٹر کریں</span>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-lime-50/70" style={{ fontFamily: "'Inter', sans-serif" }}>
       <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        .font-urdu {
          font-family: 'Noto Nastaliq Urdu', serif;
        }
      `}</style>
      <NavigationBar />
      <main className="flex-grow container mx-auto px-4 py-10 md:py-16">
        <Card className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="bg-green-600 p-6 md:p-8">
            <h1 
              className="text-2xl md:text-3xl font-bold text-white text-center tracking-tight leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Register as a FarmFresh Partner Farmer
              <br />
              <span className="block mt-1 text-xl md:text-2xl font-normal font-urdu" lang="ur" dir="rtl">فارم فریش کے ساتھ بطور کسان رجسٹر ہوں</span>
            </h1>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="mb-6 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-md flex items-start gap-3 text-[15px]">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-yellow-600" />
              <div>
                <strong className="font-semibold">Important / <span className="font-urdu" lang="ur" dir="rtl">اہم</span>:</strong>
                <span className="block">All fields marked with <span className="text-red-500">*</span> are required.</span>
                <span className="block font-urdu" lang="ur" dir="rtl">تمام خانے جن پر <span className="text-red-500">*</span> کا نشان ہے، پُر کرنا ضروری ہیں۔</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-7 md:space-y-8">
              <BilingualFormField
                id="fullName"
                enLabel="Full Name"
                urLabel="پورا نام"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholderEn="Enter your full name"
                placeholderUr="اپنا پورا نام درج کریں"
                icon={User}
              />

              <BilingualFormField
                id="fatherName"
                enLabel="Father's Name"
                urLabel="والد کا نام"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholderEn="Enter father's name"
                placeholderUr="والد کا نام درج کریں"
                icon={User} 
              />
              
              <div className="space-y-1.5">
                <label htmlFor="province" className="block text-sm font-medium text-gray-800">
                  <span className="block">Province<span className="text-red-500">*</span></span>
                  <span className="block text-right font-urdu" lang="ur" dir="rtl">صوبہ<span className="text-red-500">*</span></span>
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Select value={formData.province} onValueChange={handleProvinceChange} name="province">
                    <SelectTrigger className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 pl-10 py-2.5 text-gray-700">
                      <SelectValue placeholder="Select Province / صوبہ منتخب کریں" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinceOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.en} / <span className="font-urdu" lang="ur" dir="rtl">{option.ur}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <BilingualFormField
                id="city"
                enLabel="City"
                urLabel="شہر"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholderEn="Enter your city"
                placeholderUr="اپنا شہر درج کریں"
                icon={MapPin}
              />

              <BilingualFormField
                id="village"
                enLabel="Village (Optional)"
                urLabel="گاؤں (اختیاری)"
                name="village"
                value={formData.village}
                onChange={handleInputChange}
                placeholderEn="Enter your village (if applicable)"
                placeholderUr="اپنا گاؤں درج کریں (اگر قابل اطلاق ہو)"
                icon={Home}
                required={false} // Made village optional
              />

              <BilingualFormField
                id="warehouseLocation"
                enLabel="Warehouse Location / Address"
                urLabel="گودام کا پتہ"
                name="warehouseLocation"
                value={formData.warehouseLocation}
                onChange={handleInputChange}
                placeholderEn="Full address of your warehouse or storage"
                placeholderUr="اپنے گودام یا اسٹوریج کا مکمل پتہ"
                icon={Warehouse}
                isTextarea
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-800">
                  <span className="block">Products You Have<span className="text-red-500">*</span></span>
                  <span className="block text-right font-urdu" lang="ur" dir="rtl">آپ کے پاس کون کون سی اشیاء ہیں؟<span className="text-red-500">*</span></span>
                </label>
                <div className="relative flex items-center">
                  <ListChecks className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <div className="pl-10 w-full p-3 border border-gray-300 rounded-lg shadow-sm space-y-3">
                    <p className="text-xs text-gray-500">Select all that apply / تمام قابل اطلاق منتخب کریں</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                      {productOptions.map(product => (
                        <div key={product.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Checkbox 
                            id={`product-${product.id}`} 
                            checked={formData.products.includes(product.id)}
                            onCheckedChange={() => handleProductChange(product.id)}
                          />
                          <label 
                            htmlFor={`product-${product.id}`} 
                            className="text-sm font-medium text-gray-700 cursor-pointer select-none leading-tight"
                          >
                            {product.en}
                            <span className="block text-xs font-urdu text-gray-600" lang="ur" dir="rtl">{product.ur}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <BilingualFormField
                id="whatsappNumber"
                enLabel="WhatsApp Number"
                urLabel="واٹس ایپ نمبر"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                type="tel"
                placeholderEn="03XX-XXXXXXX"
                placeholderUr="XXXXXXX-03XX"
                icon={Phone}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-lg text-base md:text-lg transition-all duration-300 ease-in-out transform hover:shadow-lg flex items-center justify-center gap-2"
              >
                Submit Registration
                <span className="block font-urdu text-sm md:text-base leading-none" lang="ur" dir="rtl">رجسٹریشن جمع کرائیں</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default JoinFarmerPage;
