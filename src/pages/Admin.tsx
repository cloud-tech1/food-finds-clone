
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2, Users, ShoppingBag, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  deliveryTime: string;
  price: string;
  status: "active" | "inactive";
}

interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  available: boolean;
}

interface Order {
  id: string;
  customerName: string;
  restaurantName: string;
  items: string[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "delivered";
  orderDate: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: "Spice Garden",
      cuisine: "Indian",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      rating: 4.5,
      deliveryTime: "25-30 min",
      price: "₹200 for two",
      status: "active"
    },
    {
      id: 2,
      name: "Pizza Palace",
      cuisine: "Italian",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      rating: 4.3,
      deliveryTime: "30-35 min",
      price: "₹300 for two",
      status: "active"
    }
  ]);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      restaurantId: 1,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken pieces",
      price: 320,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop",
      isVeg: false,
      available: true
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      customerName: "John Doe",
      restaurantName: "Spice Garden",
      items: ["Butter Chicken", "Naan Bread"],
      total: 440,
      status: "pending",
      orderDate: "2024-01-16T20:00:00Z"
    }
  ]);

  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    cuisine: "",
    image: "",
    deliveryTime: "",
    price: ""
  });

  const [newMenuItem, setNewMenuItem] = useState({
    restaurantId: 0,
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    isVeg: true
  });

  const handleAddRestaurant = () => {
    if (!newRestaurant.name || !newRestaurant.cuisine) {
      toast.error("Please fill in all required fields");
      return;
    }

    const restaurant: Restaurant = {
      id: Date.now(),
      ...newRestaurant,
      rating: 4.0,
      status: "active"
    };

    setRestaurants([...restaurants, restaurant]);
    setNewRestaurant({ name: "", cuisine: "", image: "", deliveryTime: "", price: "" });
    toast.success("Restaurant added successfully!");
  };

  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.restaurantId) {
      toast.error("Please fill in all required fields");
      return;
    }

    const menuItem: MenuItem = {
      id: Date.now(),
      ...newMenuItem,
      available: true
    };

    setMenuItems([...menuItems, menuItem]);
    setNewMenuItem({
      restaurantId: 0,
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      isVeg: true
    });
    toast.success("Menu item added successfully!");
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success("Order status updated!");
  };

  const deleteRestaurant = (id: number) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
    toast.success("Restaurant deleted successfully!");
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast.success("Menu item deleted successfully!");
  };

  // Statistics
  const totalRestaurants = restaurants.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const activeRestaurants = restaurants.filter(r => r.status === "active").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <Badge className="bg-red-500">Admin</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRestaurants}</div>
              <p className="text-xs text-muted-foreground">
                {activeRestaurants} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +5% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="restaurants" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Restaurants Tab */}
          <TabsContent value="restaurants" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Restaurants</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-500 hover:bg-red-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Restaurant
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Restaurant</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new restaurant.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Restaurant Name</Label>
                      <Input
                        id="name"
                        value={newRestaurant.name}
                        onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
                        placeholder="Enter restaurant name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cuisine">Cuisine Type</Label>
                      <Input
                        id="cuisine"
                        value={newRestaurant.cuisine}
                        onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})}
                        placeholder="e.g., Indian, Italian, Chinese"
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newRestaurant.image}
                        onChange={(e) => setNewRestaurant({...newRestaurant, image: e.target.value})}
                        placeholder="Enter image URL"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryTime">Delivery Time</Label>
                      <Input
                        id="deliveryTime"
                        value={newRestaurant.deliveryTime}
                        onChange={(e) => setNewRestaurant({...newRestaurant, deliveryTime: e.target.value})}
                        placeholder="e.g., 25-30 min"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price Range</Label>
                      <Input
                        id="price"
                        value={newRestaurant.price}
                        onChange={(e) => setNewRestaurant({...newRestaurant, price: e.target.value})}
                        placeholder="e.g., ₹200 for two"
                      />
                    </div>
                    <Button onClick={handleAddRestaurant} className="w-full bg-red-500 hover:bg-red-600">
                      Add Restaurant
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id}>
                  <CardContent className="p-4">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{restaurant.name}</h3>
                        <Badge className={restaurant.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {restaurant.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                      <p className="text-sm">{restaurant.deliveryTime}</p>
                      <p className="text-sm font-medium">{restaurant.price}</p>
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteRestaurant(restaurant.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Menu Items Tab */}
          <TabsContent value="menu" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Menu Items</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-500 hover:bg-red-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Menu Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Menu Item</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new menu item.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="restaurant">Restaurant</Label>
                      <Select
                        value={newMenuItem.restaurantId.toString()}
                        onValueChange={(value) => setNewMenuItem({...newMenuItem, restaurantId: parseInt(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select restaurant" />
                        </SelectTrigger>
                        <SelectContent>
                          {restaurants.map((restaurant) => (
                            <SelectItem key={restaurant.id} value={restaurant.id.toString()}>
                              {restaurant.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="itemName">Item Name</Label>
                      <Input
                        id="itemName"
                        value={newMenuItem.name}
                        onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                        placeholder="Enter item name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newMenuItem.description}
                        onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                        placeholder="Enter item description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newMenuItem.price}
                        onChange={(e) => setNewMenuItem({...newMenuItem, price: parseInt(e.target.value)})}
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={newMenuItem.category}
                        onChange={(e) => setNewMenuItem({...newMenuItem, category: e.target.value})}
                        placeholder="e.g., Main Course, Appetizers"
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemImage">Image URL</Label>
                      <Input
                        id="itemImage"
                        value={newMenuItem.image}
                        onChange={(e) => setNewMenuItem({...newMenuItem, image: e.target.value})}
                        placeholder="Enter image URL"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isVeg"
                        checked={newMenuItem.isVeg}
                        onChange={(e) => setNewMenuItem({...newMenuItem, isVeg: e.target.checked})}
                      />
                      <Label htmlFor="isVeg">Vegetarian</Label>
                    </div>
                    <Button onClick={handleAddMenuItem} className="w-full bg-red-500 hover:bg-red-600">
                      Add Menu Item
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {menuItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="text-sm font-medium">₹{item.price}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant={item.isVeg ? "secondary" : "destructive"}>
                              {item.isVeg ? "Veg" : "Non-Veg"}
                            </Badge>
                            <Badge className={item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                              {item.available ? "Available" : "Out of Stock"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteMenuItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4 mt-6">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
                        <p className="text-sm text-gray-600">Restaurant: {order.restaurantName}</p>
                        <p className="text-sm">Items: {order.items.join(", ")}</p>
                        <p className="font-bold">Total: ₹{order.total}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          order.status === "delivered" ? "bg-green-100 text-green-800" :
                          order.status === "preparing" ? "bg-orange-100 text-orange-800" :
                          order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>
                          {order.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "confirmed")}
                        disabled={order.status !== "pending"}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "preparing")}
                        disabled={order.status !== "confirmed"}
                      >
                        Prepare
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                        disabled={order.status !== "preparing"}
                      >
                        Deliver
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
