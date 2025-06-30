
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Clock, Star, ShoppingCart, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for restaurants
const mockRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "25-30 min",
    price: "₹200 for two",
    offer: "20% OFF",
    featured: true
  },
  {
    id: 2,
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    cuisine: "Italian",
    rating: 4.3,
    deliveryTime: "30-35 min",
    price: "₹300 for two",
    offer: "Free Delivery",
    featured: true
  },
  {
    id: 3,
    name: "Burger Hub",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "20-25 min",
    price: "₹250 for two",
    offer: "15% OFF",
    featured: false
  },
  {
    id: 4,
    name: "Sushi Express",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    cuisine: "Japanese",
    rating: 4.6,
    deliveryTime: "35-40 min",
    price: "₹400 for two",
    offer: "Buy 1 Get 1",
    featured: true
  },
  {
    id: 5,
    name: "Taco Bell",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    cuisine: "Mexican",
    rating: 4.1,
    deliveryTime: "25-30 min",
    price: "₹180 for two",
    offer: "30% OFF",
    featured: false
  },
  {
    id: 6,
    name: "Thai Delight",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    cuisine: "Thai",
    rating: 4.4,
    deliveryTime: "30-35 min",
    price: "₹350 for two",
    offer: "Free Delivery",
    featured: true
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  const cuisines = ["All", "Indian", "Italian", "American", "Japanese", "Mexican", "Thai"];

  useEffect(() => {
    let filtered = mockRestaurants;
    
    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCuisine !== "All") {
      filtered = filtered.filter(restaurant => restaurant.cuisine === selectedCuisine);
    }
    
    setFilteredRestaurants(filtered);
  }, [searchQuery, selectedCuisine]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Zomato Clone</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for restaurants or food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Delhi</span>
              </div>
              
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </div>

              {isLoggedIn ? (
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              ) : (
                <Button variant="default" size="sm" className="bg-red-500 hover:bg-red-600">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for restaurants or food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Discover the best food & drinks
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Order from your favorite restaurants
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-0 focus:ring-2 focus:ring-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cuisine Filter */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">What's on your mind?</h3>
          <div className="flex flex-wrap gap-3">
            {cuisines.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`${
                  selectedCuisine === cuisine
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "border-gray-300 hover:border-red-500 hover:text-red-500"
                }`}
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            {searchQuery ? `Results for "${searchQuery}"` : "Restaurants near you"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {restaurant.featured && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      Featured
                    </Badge>
                  )}
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    {restaurant.offer}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-gray-800 group-hover:text-red-500 transition-colors">
                      {restaurant.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <span className="font-medium">{restaurant.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No restaurants found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <h3 className="text-xl font-bold">Zomato Clone</h3>
              </div>
              <p className="text-gray-400">
                Discover the best food & drinks in your city.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Team</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Restaurants</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Partner With Us</li>
                <li>Apps For You</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Learn More</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Security</li>
                <li>Terms</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Zomato Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
