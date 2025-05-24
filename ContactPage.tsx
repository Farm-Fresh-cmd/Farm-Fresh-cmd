import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { NavigationBar } from "../components/NavigationBar"; // Added
import { Footer } from "../components/Footer"; // Added

const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-lime-50/70" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavigationBar />
      <main className="flex-grow py-12 md:py-20"> {/* Adjusted to flex-grow and kept padding */}
        <div className="container mx-auto px-4">
          <header className="text-center mb-12 md:mb-16">
            <h1 
              className="text-4xl md:text-5xl font-bold text-green-700 mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question about our products, farmers, or just want to say hello, feel free to reach out.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Contact Information Section */}
            <div className="space-y-8">
              <Card className="bg-white shadow-lg border-gray-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-green-50 p-6">
                  <CardTitle 
                    className="text-2xl text-green-700 flex items-center gap-3"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    <MapPin className="h-7 w-7 text-amber-500" /> Our Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-gray-700 space-y-2 text-base">
                  <p className="font-semibold">Farm Fresh Main Office</p>
                  <p>123 Agri Avenue, Model Town</p>
                  <p>Lahore, Punjab 54000, Pakistan</p>
                  <p className="pt-2">
                    <a 
                      href="#" // Replace with a real map link if available
                      className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1.5 transition-colors group"
                    >
                      View on Map <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-gray-200 rounded-xl overflow-hidden">
                  <CardHeader className="bg-green-50 p-6">
                      <CardTitle 
                          className="text-2xl text-green-700 flex items-center gap-3"
                          style={{ fontFamily: "'Georgia', serif" }}
                      >
                          <Mail className="h-7 w-7 text-amber-500" /> Email Us
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-gray-700 text-base space-y-1">
                      <p>
                          General Inquiries: <a href="mailto:info@farmfresh.pk" className="text-amber-600 hover:text-amber-700">info@harvesthub.com</a>
                      </p>
                      <p>
                          Support: <a href="mailto:support@farmfresh.pk" className="text-amber-600 hover:text-amber-700">support@harvesthub.com</a>
                      </p>
                  </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-gray-200 rounded-xl overflow-hidden">
                  <CardHeader className="bg-green-50 p-6">
                      <CardTitle 
                          className="text-2xl text-green-700 flex items-center gap-3"
                          style={{ fontFamily: "'Georgia', serif" }}
                      >
                          <Phone className="h-7 w-7 text-amber-500" /> Call Us
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-gray-700 text-base space-y-1">
                      <p>Customer Service: <a href="tel:+923001234567" className="text-amber-600 hover:text-amber-700">+92 300 1234567</a></p>
                      <p>Bulk Orders: <a href="tel:+923217654321" className="text-amber-600 hover:text-amber-700">+92 321 7654321</a></p>
                  </CardContent>
              </Card>
            </div>

            {/* Contact Form Section */}
            <Card className="bg-white shadow-lg p-6 md:p-8 border-gray-200 rounded-xl">
              <CardHeader className="px-0 pt-0 mb-4">
                <CardTitle 
                  className="text-2xl md:text-3xl text-green-700 mb-1.5"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Send Us a Message
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium mb-1.5 block">Full Name</Label>
                    <Input type="text" id="name" placeholder="Enter your full name" className="border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium mb-1.5 block">Email Address</Label>
                    <Input type="email" id="email" placeholder="you@example.com" className="border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md" />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-gray-700 font-medium mb-1.5 block">Subject</Label>
                    <Input type="text" id="subject" placeholder="What is your message about?" className="border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium mb-1.5 block">Message</Label>
                    <Textarea id="message" placeholder="Write your message here..." rows={5} className="border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md" />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md text-base transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    onClick={(e) => e.preventDefault()} // Prevent actual form submission for now
                  >
                    <Send className="h-5 w-5" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

