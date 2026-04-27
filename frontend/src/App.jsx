//import Navbar from './components/Navbar'
//import FilterSidebar from './components/FilterSidebar'
//import RideCard from './components/RideCard'

/*const rides = [
  {
    driver: "Arjun Sharma", car: "Toyota Innova Crysta", rating: "4.9",
    departure: "08:00 AM", arrival: "12:30 PM",
    from: "New Delhi (NDLS)", to: "Jaipur Junction",
    price: "1,200", seats: 3, hasReturn: true, isPrimary: true,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    driver: "Priya Kapoor", car: "Honda City", rating: "4.8",
    departure: "09:15 AM", arrival: "01:45 PM",
    from: "Gurugram Cyber Hub", to: "Jaipur City Center",
    price: "950", seats: 2, hasReturn: false, isPrimary: false,
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    driver: "Rahul Varma", car: "MG Hector", rating: "4.7",
    departure: "11:00 AM", arrival: "03:30 PM",
    from: "Dwarka Sector 21", to: "Amer Fort Plaza",
    price: "1,550", seats: 4, hasReturn: true, isPrimary: true,
    avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg"
  },
]

export default function App() {
  return (
    <div className="bg-surface min-h-screen text-on-surface antialiased">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">Available Journeys</span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface">Delhi to Jaipur</h1>
              <p className="text-secondary mt-2">Showing 14 premium intercity rides for Tue, 24 Oct</p>
            </div>
            <div className="flex items-center gap-4 p-2 bg-surface-container-low rounded-xl">
              <button className="px-4 py-2 bg-surface-container-lowest shadow-sm rounded-lg text-sm font-semibold text-primary">Cheapest</button>
              <button className="px-4 py-2 text-sm font-medium text-secondary hover:text-on-surface">Earliest</button>
              <button className="px-4 py-2 text-sm font-medium text-secondary hover:text-on-surface">Fastest</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FilterSidebar />
          <div className="lg:col-span-9 space-y-6">
            {rides.map((ride, i) => <RideCard key={i} {...ride} />)}
          </div>
        </div>
      </main>
      <footer className="w-full border-t border-slate-200 bg-slate-50 mt-20">
        <div className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-6 md:mb-0">
            © 2024 Editorial Mobility. Premium Intercity Travel.
          </div>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Partner Program', 'Contact Us'].map(link => (
              <a key={link} href="#" className="text-xs uppercase tracking-widest text-slate-500 hover:text-primary transition-all">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
} */