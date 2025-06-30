
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
}

interface Restaurant {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  price: string;
  address: string;
  menu: MenuItem[];
}

const mockRestaurant: Restaurant = {
  id: 1,
  name: "Spice Garden",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
  cuisine: "Indian",
  rating: 4.5,
  deliveryTime: "25-30 min",
  price: "₹200 for two",
  address: "123 Main Street, Delhi",
  menu: [
    {
      id: 1,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken pieces",
      price: 320,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop",
      category: "Main Course",
      isVeg: false
    },
    {
      id: 2,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with aromatic spices",
      price: 280,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop",
      category: "Appetizers",
      isVeg: true
    },
    {
      id: 3,
      name: "Biryani",
      description: "Fragrant basmati rice with spiced chicken and herbs",
      price: 350,
      image: "https://images.unsplash.com/photo-1563379091339-03246c5d5455?w=300&h=200&fit=crop",
      category: "Main Course",
      isVeg: false
    },
    {
      id: 4,
      name: "Naan Bread",
      description: "Soft and fluffy Indian bread baked in tandoor",
      price: 60,
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop",
      category: "Breads",
      isVeg: true
    },
    {
      id: 5,
      name: "Dal Makhani",
      description: "Rich and creamy black lentils slow-cooked with butter",
      price: 240,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
      category: "Main Course",
      isVeg: true
    },
    {
      id: 6,
      name: "Gulab Jamun",
      description: "Sweet milk dumplings in cardamom syrup",
      price: 120,
      image: "https://images.unsplash.com/photo-1571167106827-95c8fc4e7e28?w=300&h=200&fit=crop",
      category: "Desserts",
      isVeg: true
    }
  ]
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant] = useState<Restaurant>(mockRestaurant);
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(restaurant.menu.map(item => item.category)))];

  const filteredMenu = selectedCategory === "All" 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [itemId, count]) => {
      const item = restaurant.menu.find(m => m.id === parseInt(itemId));
      return total + (item ? item.price * count : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            
            {getTotalItems() > 0 && (
              <Button
                onClick={() => navigate("/cart")}
                className="bg-red-500 hover:bg-red-600 flex items-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{getTotalItems()} items</span>
                <span>₹{getTotalPrice()}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-lg opacity-90">{restaurant.cuisine}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Details */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-semibold">{restaurant.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{restaurant.address}</span>
              </div>
              <Badge variant="secondary">{restaurant.price}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-red-500 hover:bg-red-600"
                    : "border-gray-300 hover:border-red-500"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {filteredMenu.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <Badge variant={item.isVeg ? "secondary" : "destructive"}>
                            {item.isVeg ? "Veg" : "Non-Veg"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        <p className="text-lg font-bold mt-2">₹{item.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {cartItems[item.id] ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold">{cartItems[item.id]}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(item)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
