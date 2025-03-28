import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BarChart3, Users, Package, DollarSign, CalendarDays, Settings, LogOut, ChevronDown, ChevronUp, PlusCircle, Search, Filter } from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

// Mock data for charts
const revenueData = [
  { name: "Jan", revenue: 20000 },
  { name: "Feb", revenue: 25000 },
  { name: "Mar", revenue: 18000 },
  { name: "Apr", revenue: 24000 },
  { name: "May", revenue: 30000 },
  { name: "Jun", revenue: 38000 },
  { name: "Jul", revenue: 42000 },
  { name: "Aug", revenue: 35000 },
  { name: "Sep", revenue: 28000 },
  { name: "Oct", revenue: 32000 },
  { name: "Nov", revenue: 36000 },
  { name: "Dec", revenue: 45000 }
];

const bookingsData = [
  { name: "Jan", bookings: 120 },
  { name: "Feb", bookings: 135 },
  { name: "Mar", bookings: 110 },
  { name: "Apr", bookings: 145 },
  { name: "May", bookings: 160 },
  { name: "Jun", bookings: 190 },
  { name: "Jul", bookings: 210 },
  { name: "Aug", bookings: 180 },
  { name: "Sep", bookings: 155 },
  { name: "Oct", bookings: 170 },
  { name: "Nov", bookings: 185 },
  { name: "Dec", bookings: 220 }
];

// Mock data for recent bookings
const recentBookings = [
  {
    id: "ORD-12345",
    customer: "John Smith",
    tour: "Adventure Trek in the Swiss Alps",
    date: "June 15, 2023",
    travelers: 2,
    total: 2598,
    status: "Confirmed"
  },
  {
    id: "ORD-12346",
    customer: "Emma Johnson",
    tour: "Mediterranean Coastal Cruise",
    date: "July 10, 2023",
    travelers: 4,
    total: 6396,
    status: "Pending"
  },
  {
    id: "ORD-12347",
    customer: "Michael Davis",
    tour: "Tokyo Culinary and Culture Tour",
    date: "August 5, 2023",
    travelers: 1,
    total: 1899,
    status: "Confirmed"
  },
  {
    id: "ORD-12348",
    customer: "Sophia Williams",
    tour: "Safari Adventure in the Serengeti",
    date: "September 20, 2023",
    travelers: 2,
    total: 4998,
    status: "Cancelled"
  },
  {
    id: "ORD-12349",
    customer: "Daniel Brown",
    tour: "Ancient Temples of Cambodia",
    date: "October 8, 2023",
    travelers: 3,
    total: 2697,
    status: "Confirmed"
  }
];

// Mock data for tours
const tours = [
  {
    id: "tour-1",
    title: "Adventure Trek in the Swiss Alps",
    destination: "Swiss Alps, Switzerland",
    price: 1299,
    duration: "7 days",
    bookings: 127,
    status: "Active"
  },
  {
    id: "tour-2",
    title: "Ancient Temples of Cambodia",
    destination: "Siem Reap, Cambodia",
    price: 899,
    duration: "5 days",
    bookings: 95,
    status: "Active"
  },
  {
    id: "tour-3",
    title: "Mediterranean Coastal Cruise",
    destination: "Santorini, Greece",
    price: 1599,
    duration: "10 days",
    bookings: 214,
    status: "Active"
  },
  {
    id: "tour-4",
    title: "Safari Adventure in the Serengeti",
    destination: "Serengeti, Tanzania",
    price: 2499,
    duration: "8 days",
    bookings: 89,
    status: "Active"
  },
  {
    id: "tour-5",
    title: "Tokyo Culinary and Culture Tour",
    destination: "Tokyo, Japan",
    price: 1899,
    duration: "6 days",
    bookings: 152,
    status: "Inactive"
  }
];

const AdminDashboard = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Giả định điều kiện admin
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    setIsPageLoaded(true);
    // Trong thực tế, bạn sẽ kiểm tra quyền admin ở đây
    // Ví dụ: kiểm tra token, role từ hệ thống xác thực
    setIsAdmin(true); // Tạm thời luôn là admin để test
  }, []);
  
  // Nếu không phải admin, chuyển hướng về trang đăng nhập
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="flex h-[calc(100vh-80px)]">
          {/* Sidebar */}
          <div className="w-64 bg-secondary/50 border-r border-border p-4 hidden md:block">
            <div className="space-y-1 mb-8">
              <button
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeTab === "dashboard" ? "bg-primary text-white" : "hover:bg-secondary/80"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <BarChart3 className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </button>
              
              <button
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeTab === "tours" ? "bg-primary text-white" : "hover:bg-secondary/80"
                }`}
                onClick={() => setActiveTab("tours")}
              >
                <Package className="h-5 w-5 mr-3" />
                <span>Tours</span>
              </button>
              
              <button
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeTab === "bookings" ? "bg-primary text-white" : "hover:bg-secondary/80"
                }`}
                onClick={() => setActiveTab("bookings")}
              >
                <CalendarDays className="h-5 w-5 mr-3" />
                <span>Bookings</span>
              </button>
              
              <button
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeTab === "customers" ? "bg-primary text-white" : "hover:bg-secondary/80"
                }`}
                onClick={() => setActiveTab("customers")}
              >
                <Users className="h-5 w-5 mr-3" />
                <span>Customers</span>
              </button>
              
              <button
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeTab === "settings" ? "bg-primary text-white" : "hover:bg-secondary/80"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </button>
            </div>
            
            <div className="pt-4 border-t border-border">
              <button className="flex items-center w-full px-3 py-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
                  <div className="flex gap-2">
                    <div className="relative">
                      <select className="pl-3 pr-8 py-2 border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary appearance-none bg-background">
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>This year</option>
                        <option>All time</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                    </div>
                    
                    <Button>Export</Button>
                  </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">Total Revenue</p>
                        <h3 className="text-3xl font-semibold mt-1">$345,897</h3>
                        <p className="text-green-600 text-sm mt-1 flex items-center">
                          <ChevronUp className="h-4 w-4 mr-1" />
                          12.5% from last month
                        </p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-full">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">Total Bookings</p>
                        <h3 className="text-3xl font-semibold mt-1">1,824</h3>
                        <p className="text-green-600 text-sm mt-1 flex items-center">
                          <ChevronUp className="h-4 w-4 mr-1" />
                          8.2% from last month
                        </p>
                      </div>
                      <div className="bg-amber-100 p-3 rounded-full">
                        <CalendarDays className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">Active Tours</p>
                        <h3 className="text-3xl font-semibold mt-1">32</h3>
                        <p className="text-green-600 text-sm mt-1 flex items-center">
                          <ChevronUp className="h-4 w-4 mr-1" />
                          3 new this month
                        </p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">Customers</p>
                        <h3 className="text-3xl font-semibold mt-1">1,453</h3>
                        <p className="text-green-600 text-sm mt-1 flex items-center">
                          <ChevronUp className="h-4 w-4 mr-1" />
                          5.3% from last month
                        </p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="font-display text-lg font-medium mb-4">Revenue Overview</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`$${value}`, 'Revenue']}
                            labelStyle={{ color: '#111' }}
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              border: 'none'
                            }}
                          />
                          <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="font-display text-lg font-medium mb-4">Booking Trends</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={bookingsData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [value, 'Bookings']}
                            labelStyle={{ color: '#111' }}
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              border: 'none'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="bookings" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
                
                {/* Recent Bookings */}
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-lg font-medium">Recent Bookings</h3>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("bookings")}>
                      View All
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-secondary/40 text-left">
                          <th className="px-4 py-3 text-sm font-medium rounded-l-lg">Booking ID</th>
                          <th className="px-4 py-3 text-sm font-medium">Customer</th>
                          <th className="px-4 py-3 text-sm font-medium">Tour</th>
                          <th className="px-4 py-3 text-sm font-medium">Date</th>
                          <th className="px-4 py-3 text-sm font-medium">Travelers</th>
                          <th className="px-4 py-3 text-sm font-medium">Total</th>
                          <th className="px-4 py-3 text-sm font-medium rounded-r-lg">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((booking, index) => (
                          <tr 
                            key={booking.id} 
                            className={`hover:bg-secondary/20 ${
                              index < recentBookings.length - 1 ? 'border-b border-border' : ''
                            }`}
                          >
                            <td className="px-4 py-3">{booking.id}</td>
                            <td className="px-4 py-3">{booking.customer}</td>
                            <td className="px-4 py-3 max-w-[200px] truncate">{booking.tour}</td>
                            <td className="px-4 py-3">{booking.date}</td>
                            <td className="px-4 py-3">{booking.travelers}</td>
                            <td className="px-4 py-3">${booking.total.toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <span 
                                className={`inline-block px-2 py-1 rounded-full text-xs ${
                                  booking.status === 'Confirmed' 
                                    ? 'bg-green-100 text-green-700' 
                                    : booking.status === 'Pending'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {booking.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}
            
            {/* Tours Tab */}
            {activeTab === "tours" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h1 className="font-display text-2xl font-semibold">Tours</h1>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search tours..."
                        className="pl-9 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-full"
                      />
                    </div>
                    
                    <Button variant="outline" className="flex-shrink-0">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                    
                    <Button className="flex-shrink-0">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Tour
                    </Button>
                  </div>
                </div>
                
                <Card className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-secondary/40 text-left">
                          <th className="px-4 py-3 text-sm font-medium rounded-l-lg">Tour Name</th>
                          <th className="px-4 py-3 text-sm font-medium">Destination</th>
                          <th className="px-4 py-3 text-sm font-medium">Price</th>
                          <th className="px-4 py-3 text-sm font-medium">Duration</th>
                          <th className="px-4 py-3 text-sm font-medium">Bookings</th>
                          <th className="px-4 py-3 text-sm font-medium">Status</th>
                          <th className="px-4 py-3 text-sm font-medium rounded-r-lg">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tours.map((tour, index) => (
                          <tr 
                            key={tour.id} 
                            className={`hover:bg-secondary/20 ${
                              index < tours.length - 1 ? 'border-b border-border' : ''
                            }`}
                          >
                            <td className="px-4 py-3 font-medium">{tour.title}</td>
                            <td className="px-4 py-3">{tour.destination}</td>
                            <td className="px-4 py-3">${tour.price.toLocaleString()}</td>
                            <td className="px-4 py-3">{tour.duration}</td>
                            <td className="px-4 py-3">{tour.bookings}</td>
                            <td className="px-4 py-3">
                              <span 
                                className={`inline-block px-2 py-1 rounded-full text-xs ${
                                  tour.status === 'Active' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-amber-100 text-amber-700'
                                }`}
                              >
                                {tour.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                <button className="text-red-600 hover:text-red-800">Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Showing 1-5 of 32 tours</p>
                    
                    <div className="flex gap-1">
                      <button className="px-3 py-1 border border-input rounded-lg hover:bg-secondary/40 disabled:opacity-50" disabled>
                        Previous
                      </button>
                      <button className="px-3 py-1 bg-primary text-white rounded-lg">1</button>
                      <button className="px-3 py-1 border border-input rounded-lg hover:bg-secondary/40">2</button>
                      <button className="px-3 py-1 border border-input rounded-lg hover:bg-secondary/40">3</button>
                      <button className="px-3 py-1 border border-input rounded-lg hover:bg-secondary/40">
                        Next
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            
            {/* Other Tabs Placeholder */}
            {(activeTab === "bookings" || activeTab === "customers" || activeTab === "settings") && (
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="font-display text-2xl font-medium mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                </h2>
                <p className="text-muted-foreground">This section is under development.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
