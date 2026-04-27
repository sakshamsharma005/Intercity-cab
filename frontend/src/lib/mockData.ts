export type Ride = {
  id: string;
  driverName: string;
  driverInitial: string;
  rating: number;
  car: string;
  fromCity: string;
  toCity: string;
  fromPoint: string;
  toPoint: string;
  departTime: string;
  arriveTime: string;
  pricePerSeat: number;
  seatsLeft: number;
  hasReturnMatch: boolean;
  returnDeparture?: string;
  trips: number;
};

export const POPULAR_ROUTES = [
  { from: "Delhi", to: "Jaipur", distance: "281 km", duration: "~5h" },
  { from: "Mumbai", to: "Pune", distance: "150 km", duration: "~3h" },
  { from: "Bangalore", to: "Chennai", distance: "346 km", duration: "~6h" },
  { from: "Hyderabad", to: "Vijayawada", distance: "275 km", duration: "~4.5h" },
  { from: "Ahmedabad", to: "Vadodara", distance: "112 km", duration: "~2h" },
  { from: "Kolkata", to: "Durgapur", distance: "180 km", duration: "~3.5h" },
];

export const RIDES: Ride[] = [
  {
    id: "r1",
    driverName: "Arjun Sharma",
    driverInitial: "AS",
    rating: 4.9,
    car: "Toyota Innova Crysta",
    fromCity: "Delhi",
    toCity: "Jaipur",
    fromPoint: "New Delhi (NDLS)",
    toPoint: "Jaipur Junction",
    departTime: "08:00 AM",
    arriveTime: "12:30 PM",
    pricePerSeat: 1200,
    seatsLeft: 3,
    hasReturnMatch: true,
    returnDeparture: "Tomorrow, 09:00 AM",
    trips: 142,
  },
  {
    id: "r2",
    driverName: "Priya Kapoor",
    driverInitial: "PK",
    rating: 4.8,
    car: "Honda City",
    fromCity: "Delhi",
    toCity: "Jaipur",
    fromPoint: "Gurugram Cyber Hub",
    toPoint: "Jaipur City Center",
    departTime: "09:15 AM",
    arriveTime: "01:45 PM",
    pricePerSeat: 950,
    seatsLeft: 2,
    hasReturnMatch: false,
    trips: 87,
  },
  {
    id: "r3",
    driverName: "Rahul Varma",
    driverInitial: "RV",
    rating: 4.7,
    car: "MG Hector",
    fromCity: "Delhi",
    toCity: "Jaipur",
    fromPoint: "Dwarka Sector 21",
    toPoint: "Amer Fort Plaza",
    departTime: "11:00 AM",
    arriveTime: "03:30 PM",
    pricePerSeat: 1550,
    seatsLeft: 4,
    hasReturnMatch: true,
    returnDeparture: "Tomorrow, 06:00 PM",
    trips: 213,
  },
  {
    id: "r4",
    driverName: "Neha Iyer",
    driverInitial: "NI",
    rating: 4.95,
    car: "Maruti Ertiga",
    fromCity: "Delhi",
    toCity: "Jaipur",
    fromPoint: "IGI Airport T3",
    toPoint: "Sindhi Camp Bus Stand",
    departTime: "02:30 PM",
    arriveTime: "07:15 PM",
    pricePerSeat: 1100,
    seatsLeft: 1,
    hasReturnMatch: true,
    returnDeparture: "Tomorrow, 10:00 AM",
    trips: 56,
  },
  {
    id: "r5",
    driverName: "Vikram Singh",
    driverInitial: "VS",
    rating: 4.6,
    car: "Hyundai Creta",
    fromCity: "Delhi",
    toCity: "Jaipur",
    fromPoint: "Karol Bagh Metro",
    toPoint: "Mansarovar",
    departTime: "06:45 PM",
    arriveTime: "11:30 PM",
    pricePerSeat: 850,
    seatsLeft: 3,
    hasReturnMatch: false,
    trips: 33,
  },
];
