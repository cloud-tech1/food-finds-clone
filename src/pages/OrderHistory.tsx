
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, XCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  orderDate: string;
  deliveryTime: string;
  paymentMethod: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    restaurantName: "Spice Garden",
    restaurantImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    items: [
      { id: 1, name: "Butter Chicken", quantity: 1, price: 320 },
      { id: 2, name: "Naan Bread", quantity: 2, price: 60 }
    ],
    total: 440,
    status: "delivered",
    orderDate: "2024-01-15T14:30:00Z",
    deliveryTime: "25 mins",
    paymentMethod: "Cash on Delivery"
  },
  {
    id: "ORD002",
    restaurantName: "Pizza Palace",
    restaurantImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    items: [
      { id: 3, name: "Margherita Pizza", quantity: 1, price: 450 },
      { id: 4, name: "Garlic Bread", quantity: 1, price: 120 }
    ],
    total: 570,
    status: "preparing",
    orderDate: "2024-01-16T19:15:00Z",
    deliveryTime: "30 mins",
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD003",
    restaurantName: "Burger Hub",
    restaurantImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    items: [
      { id: 5, name: "Classic Burger", quantity: 2, price: 250 },
      { id: 6, name: "French Fries", quantity: 1, price: 120 }
    ],
    total: 620,
    status: "confirmed",
    orderDate: "2024-01-16T20:00:00Z",
    deliveryTime: "20 mins",
    paymentMethod: "UPI"
  },
  {
    id: "ORD004",
    restaurantName: "Thai Delight",
    restaurantImage: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    items: [
      { id: 7, name: "Pad Thai", quantity: 1, price: 320 }
    ],
    total: 320,
    status: "cancelled",
    orderDate: "2024-01-14T18:45:00Z",
    deliveryTime: "35 mins",
    paymentMethod: "Cash on Delivery"
  }
];

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders] = useState<Order[]>(mockOrders);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "preparing":
        return <Package className="h-4 w-4 text-orange-500" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filterOrders = (status?: string) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <img
            src={order.restaurantImage}
            alt={order.restaurantName}
            className="w-16 h-16 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg">{order.restaurantName}</h3>
                <p className="text-sm text-gray-600">Order #{order.id}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₹{order.total}</p>
                <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
              </div>
            </div>

            <div className="mb-3">
              {order.items.map((item, index) => (
                <p key={item.id} className="text-sm text-gray-600">
                  {item.name} x{item.quantity}
                  {index < order.items.length - 1 && ", "}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              
              <div className="flex space-x-2">
                {order.status === "delivered" && (
                  <Button size="sm" variant="outline">
                    Reorder
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-xl font-bold">Order History</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4 mt-6">
            {filterOrders("delivered").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="preparing" className="space-y-4 mt-6">
            {filterOrders("preparing").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="confirmed" className="space-y-4 mt-6">
            {filterOrders("confirmed").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4 mt-6">
            {filterOrders("cancelled").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
        </Tabs>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">When you place orders, they'll appear here</p>
            <Button
              onClick={() => navigate("/")}
              className="bg-red-500 hover:bg-red-600"
            >
              Start Ordering
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
