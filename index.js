import React from "react";
import { NavigationBar } from "components/NavigationBar";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom"; 
import { ShoppingBasket, Users, Tractor, Star, Newspaper, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Importing icons

export default function App() {
  const navigate = useNavigate();

  // Placeholder data for reviews
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      location: "Green Valley, CA",
      rating: 5,
      comment: "The freshest vegetables I've ever had! Supporting local farmers and eating healthy has never been easier. Highly recommend Farm Fresh!"
    },
    {
      id: 2,
      name: "David L.",
      location: "Oakwood, TX",
      rating: 4,
      comment: "Great selection of dairy products and the fruits are amazing. The direct-from-farmer model is fantastic."
    },
    {
      id: 3,
      name: "Emily R.",
      location: "Willow Creek, OR",
      rating: 5,
      comment: "I love knowing where my food comes from. The quality is top-notch and the service is excellent. Farm Fresh is a game changer!"
    }
  ];

  // Placeholder data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: "The Benefits of Eating Seasonally",
      date: "May 10, 2025",
      excerpt: "Discover why eating seasonal produce is not only better for your health but also for the environment and local economy...",
      imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
      link: "/blog/eating-seasonally"
    },
    {
      id: 2,
      title: "Meet Our Farmer: John from Green Acres Farm",
      date: "May 5, 2025",
      excerpt: "Get to know John, one of our dedicated local farmers, and learn about his passion for sustainable agriculture...",
      imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
      link: "/blog/meet-farmer-john"
    },
    {
      id: 3,
      title: "Tips for Storing Your Fresh Produce",
      date: "April 28, 2025",
      excerpt: "Learn the best ways to store your fruits and vegetables to keep them fresh longer and reduce food waste...",
      imageUrl: "https://images.unsplash.com/photo-1615485214032-db908ba5581b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
      link: "/blog/storing-produce"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationBar />
      {/* Hero Section */}
      <main 
        className="flex-grow flex items-center justify-center bg-cover bg-center pt-16" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
      >
        <div className="bg-black bg-opacity-60 text-white p-10 md:p-16 rounded-xl shadow-2xl text-center max-w-3xl mx-auto my-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Fresh From Local Farms
          </h1>
          <p className="text-lg md:text-xl font-sans mb-8">
            Discover the taste of real, locally sourced produce, dairy, and grains, delivered directly from our trusted farmers to your table. Experience freshness, support local communities, and enjoy healthier food.
          </p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white font-sans font-semibold rounded-lg text-lg md:text-xl px-8 py-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate("/categories")}
          >
            Explore Products
          </Button>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-green-800 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 bg-green-600 rounded-full mb-4">
                <ShoppingBasket size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-sans font-semibold text-green-700 mb-2">1. Browse Fresh Picks</h3>
              <p className="text-gray-600 font-sans text-sm">
                Explore a wide variety of seasonal vegetables, fruits, dairy, and grains directly from local farms.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 bg-green-600 rounded-full mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-sans font-semibold text-green-700 mb-2">2. Connect & Order</h3>
              <p className="text-gray-600 font-sans text-sm">
                Choose your preferred farmer, fill your cart, and place your order with just a few clicks.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 bg-green-600 rounded-full mb-4">
                <Tractor size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-sans font-semibold text-green-700 mb-2">3. Enjoy Farm-to-Table</h3>
              <p className="text-gray-600 font-sans text-sm">
                Receive your fresh, high-quality products delivered straight to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-12 md:py-20 bg-green-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-green-800 mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i} className="text-gray-300" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans italic mb-4 leading-relaxed">"{review.comment}"</p>
                <p className="font-sans font-semibold text-green-700">{review.name}</p>
                <p className="font-sans text-sm text-gray-500">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/News Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Newspaper size={40} className="mx-auto text-green-700 mb-3" />
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-green-800">
              From Our Fields & Farmers
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-green-50 rounded-xl shadow-lg overflow-hidden flex flex-col">
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover"/>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-sans font-semibold text-green-700 mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 font-sans mb-1">{post.date}</p>
                  <p className="text-gray-600 font-sans text-sm mb-4 flex-grow">{post.excerpt}</p>
                  <Link 
                    to={post.link} 
                    className="mt-auto self-start inline-flex items-center text-green-600 hover:text-green-800 font-sans font-semibold group">
                    Read More 
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-green-50 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-serif font-semibold mb-4">Farm Fresh</h3>
              <p className="font-sans text-sm text-green-200">
                Connecting you directly with local farmers for the freshest produce, dairy, and grains.
              </p>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-green-100 mb-4">Quick Links</h4>
              <ul className="space-y-2 font-sans text-sm">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/shop" className="hover:text-white">Shop All Products</Link></li>
                <li><Link to="/categories" className="hover:text-white">Product Categories</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog & News</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-green-100 mb-4">Support</h4>
              <ul className="space-y-2 font-sans text-sm">
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-green-100 mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <Link to="#" className="hover:text-white"><Facebook size={24} /></Link>
                <Link to="#" className="hover:text-white"><Twitter size={24} /></Link>
                <Link to="#" className="hover:text-white"><Instagram size={24} /></Link>
                <Link to="#" className="hover:text-white"><Linkedin size={24} /></Link>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 pt-8 text-center font-sans text-sm text-green-200">
            <p>&copy; {new Date().getFullYear()} Farm Fresh. All rights reserved. Built with passion for local farming.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

