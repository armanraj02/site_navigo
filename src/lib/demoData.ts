export const PASSENGER_DATA = {
  name: "Arman Raj",
  email: "arman@example.com",
  phone: "+91 98765 43210",
  city: "Mangaluru",
  favouriteStop: "State Bank",
  preferredLanguage: "English",
  recentJourneys: [
    { from: "State Bank", to: "Surathkal" },
    { from: "Kankanady", to: "Pumpwell" },
    { from: "Lalbagh", to: "Bejai" },
    { from: "Mangaluru Central", to: "Hampankatta" },
    { from: "KSRTC Bejai", to: "Nanthoor" }
  ],
  favouriteRoutes: [
    "State Bank → Surathkal",
    "Pumpwell → Deralakatte",
    "Kankanady → Udupi",
    "Hampankatta → Bajpe Airport"
  ],
  savedPlaces: {
    home: "Kadri",
    college: "NITK Surathkal",
    office: "Hampankatta"
  }
};

export const DRIVER_DATA = {
  name: "Ravi Shetty",
  driverId: "DRV1024",
  busId: "KA-19 F 4587",
  experience: "8 Years",
  status: "On Duty",
  shift: {
    route: "State Bank → Surathkal",
    shiftStart: "7:00 AM",
    nextBreak: "1:30 PM",
    currentSpeed: "36 km/h",
    gpsStatus: "Live",
    battery: "82%"
  }
};

export const MANGALURU_ROUTES = [
  {
    id: "route-45a",
    busId: "KA-19 F 4587",
    routeNo: "45A",
    driverName: "Ravi Shetty",
    driverInitials: "RS",
    originName: "State Bank",
    destinationName: "Surathkal",
    status: "On Time",
    distance: "18.4 km",
    arrivalTime: "12 mins",
    busType: "AC Electric",
    occupancy: "68%",
    capacity: "45 Seats",
    fare: "₹25",
    delay: "2 mins",
    speed: "34 km/h",
    currentStop: "Lalbagh",
    nextStop: "Pumpwell",
    origin: { lat: 12.8616, lng: 74.8430 }, // State Bank roughly
    currentLocation: { lat: 12.8858, lng: 74.8436 }, // Lalbagh roughly
    destination: { lat: 13.0035, lng: 74.7937 }, // Surathkal roughly
    path: [
      { lat: 12.8616, lng: 74.8430 },
      { lat: 12.8700, lng: 74.8460 },
      { lat: 12.8858, lng: 74.8436 },
      { lat: 12.9200, lng: 74.8300 },
      { lat: 13.0035, lng: 74.7937 }
    ]
  },
  {
    id: "route-36",
    busId: "KA-19 B 1122",
    routeNo: "36",
    driverName: "Suresh Gowda",
    driverInitials: "SG",
    originName: "Kankanady",
    destinationName: "Udupi",
    status: "Delayed",
    distance: "55.2 km",
    arrivalTime: "8 mins",
    busType: "Non-AC Standard",
    occupancy: "85%",
    capacity: "50 Seats",
    fare: "₹20",
    delay: "5 mins",
    speed: "42 km/h",
    currentStop: "Nanthoor",
    nextStop: "Kuloor",
    origin: { lat: 12.8744, lng: 74.8625 }, // Kankanady
    currentLocation: { lat: 12.8855, lng: 74.8660 }, // Nanthoor
    destination: { lat: 13.3409, lng: 74.7421 }, // Udupi
    path: [
      { lat: 12.8744, lng: 74.8625 },
      { lat: 12.8855, lng: 74.8660 },
      { lat: 13.1000, lng: 74.8000 },
      { lat: 13.3409, lng: 74.7421 }
    ]
  },
  {
    id: "route-47",
    busId: "KA-19 E 9988",
    routeNo: "47",
    driverName: "Mohammed Ali",
    driverInitials: "MA",
    originName: "Mangaluru Central",
    destinationName: "Bajpe Airport",
    status: "On Time",
    distance: "14.5 km",
    arrivalTime: "11 mins",
    busType: "AC Premium",
    occupancy: "42%",
    capacity: "35 Seats",
    fare: "₹30",
    delay: "0 mins",
    speed: "38 km/h",
    currentStop: "KSRTC Bejai",
    nextStop: "Kavoor",
    origin: { lat: 12.8661, lng: 74.8436 }, // Mangaluru Central
    currentLocation: { lat: 12.8897, lng: 74.8483 }, // KSRTC Bejai
    destination: { lat: 12.9613, lng: 74.8893 }, // Bajpe Airport
    path: [
      { lat: 12.8661, lng: 74.8436 },
      { lat: 12.8897, lng: 74.8483 },
      { lat: 12.9300, lng: 74.8700 },
      { lat: 12.9613, lng: 74.8893 }
    ]
  }
];

export const FLEET_KPI = {
  activeBuses: "124",
  passengersToday: "18,420",
  tripsCompleted: "842",
  averageDelay: "2 mins",
  onTimeRate: "98.2%",
  revenueToday: "₹4.86 Lakhs",
  electricBuses: "42",
  maintenanceAlerts: "3"
};

export const MANGALURU_STOPS = [
  { id: "S1", name: "State Bank", lat: 12.8616, lng: 74.8430, position: [0, 0, 0], routeIds: [] },
  { id: "S2", name: "Hampankatta", lat: 12.8687, lng: 74.8438, position: [0, 0, 0], routeIds: [] },
  { id: "S3", name: "Lalbagh", lat: 12.8858, lng: 74.8436, position: [0, 0, 0], routeIds: [] },
  { id: "S4", name: "Kankanady", lat: 12.8744, lng: 74.8625, position: [0, 0, 0], routeIds: [] },
  { id: "S5", name: "Pumpwell", lat: 12.8735, lng: 74.8685, position: [0, 0, 0], routeIds: [] },
  { id: "S6", name: "Nanthoor Circle", lat: 12.8855, lng: 74.8660, position: [0, 0, 0], routeIds: [] },
  { id: "S7", name: "KSRTC Bejai", lat: 12.8897, lng: 74.8483, position: [0, 0, 0], routeIds: [] },
  { id: "S8", name: "Mangaluru Central", lat: 12.8661, lng: 74.8436, position: [0, 0, 0], routeIds: [] },
  { id: "S9", name: "Surathkal", lat: 13.0035, lng: 74.7937, position: [0, 0, 0], routeIds: [] },
  { id: "S10", name: "NITK Surathkal", lat: 13.0108, lng: 74.7943, position: [0, 0, 0], routeIds: [] },
  { id: "S11", name: "Bajpe Airport", lat: 12.9613, lng: 74.8893, position: [0, 0, 0], routeIds: [] }
];
