import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { 
  MapPin, Star, Wifi, Dumbbell, Waves, Wind, Flame, 
  Coffee,ChevronRight 
} from "lucide-react";
import HotelMap from "../components/HotelMap";
import { getHotelById } from "../services/hotelService";

function HotelDetailsPage() {
  const { id } = useParams();
  const { hotels } = useSelector((state) => state.hotels);
  
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadHotel() {
      const fromStore = hotels.find((h) => String(h.id) === String(id));
      if (fromStore) {
        setHotel(fromStore);
        setLoading(false);
        return;
      }
      try {
        const data = await getHotelById(id);
        if (!cancelled) setHotel(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadHotel();
    return () => { cancelled = true; };
  }, [id, hotels]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (!hotel) return <div className="text-center py-5"><h4>Hotel not found</h4><Link to="/" className="btn btn-primary mt-2">Back to Hotels</Link></div>;

  const galleryImages = [
    hotel.image,
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80"
  ];

  return (
    <>
      <Helmet>
        <title>{hotel.title} — StayFinder</title>
        <meta name="description" content={hotel.description.substring(0, 150)} />
      </Helmet>

      <div className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Hotels</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{hotel.title}</li>
          </ol>
        </nav>

        {/* Image Gallery Layout (Main Image + 3 Small Images) */}
        <div className="row g-2 mb-4">
          {/* Main Big Image (Left) */}
          <div className="col-12 col-md-6">
            <img 
              src={galleryImages[0]} 
              alt="Main Hotel" 
              className="img-fluid rounded w-100 h-100 object-fit-cover" 
              style={{ minHeight: "350px" }}
            />
          </div>
          
          {/* 3 Small Images (Right) */}
          <div className="col-12 col-md-6">
            <div className="row g-2 h-100">
              <div className="col-6">
                <img src={galleryImages[1]} alt="Room 1" className="img-fluid rounded w-100" style={{ height: "170px", objectFit: "cover" }} />
              </div>
              <div className="col-6">
                <img src={galleryImages[2]} alt="Room 2" className="img-fluid rounded w-100" style={{ height: "170px", objectFit: "cover" }} />
              </div>
              <div className="col-12 mt-2">
                <div className="position-relative">
                  <img src={galleryImages[3]} alt="View" className="img-fluid rounded w-100" style={{ height: "170px", objectFit: "cover" }} />
                  <div className="position-absolute bottom-0 end-0 bg-dark text-white px-3 py-1 m-2 rounded small opacity-75">
                    +14 Photos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs (Summary, Room, Facility, Policy) */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item"><button className="nav-link active fw-bold">Summary</button></li>
          <li className="nav-item"><button className="nav-link text-muted">Room</button></li>
          <li className="nav-item"><button className="nav-link text-muted">Facility</button></li>
          <li className="nav-item"><button className="nav-link text-muted">Policy</button></li>
        </ul>

        <div className="row g-4">
          {/* LEFT SIDE: Hotel Info */}
          <div className="col-12 col-lg-7">
            <h2 className="mb-2">{hotel.title}</h2>
            
            {/* Rating */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex text-warning">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(hotel.rating || 4) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-muted small">{hotel.rating || 4.5} Rating</span>
            </div>

            <p className="text-muted">{hotel.description}</p>

            {/* Facilities List */}
            <h5 className="mt-4 mb-3">Amenities</h5>
            <div className="row g-3">
              {/* Facility 1 */}
              <div className="col-6 col-md-4 d-flex align-items-center gap-2">
                <Waves size={20} className="text-primary" /> <span className="small">Swimming Pool</span>
              </div>
              {/* Facility 2 */}
              <div className="col-6 col-md-4 d-flex align-items-center gap-2">
                <Coffee size={20} className="text-primary" /> <span className="small">Bar / Cafe</span>
              </div>
              {/* Facility 3 */}
              <div className="col-6 col-md-4 d-flex align-items-center gap-2">
                <Wifi size={20} className="text-primary" /> <span className="small">Free WiFi</span>
              </div>
              {/* Facility 4 */}
              <div className="col-6 col-md-4 d-flex align-items-center gap-2">
                <Dumbbell size={20} className="text-primary" /> <span className="small">Gym</span>
              </div>
              {/* Facility 5 */}
              <div className="col-6 col-md-4 d-flex align-items-center gap-2">
                <Wind size={20} className="text-primary" /> <span className="small">Air Conditioning</span>
              </div>
              {/* Facility 6 */}
              <div className="col-6 col-md-4 d-flex align-items-center gap-2">
                <Flame size={20} className="text-primary" /> <span className="small">Bonfire</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Map */}
          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center gap-2 mb-3">
                  <MapPin size={18} className="text-primary" /> Location
                </h5>
                
                {/* Map Component */}
                <div style={{ height: "250px" }} className="rounded overflow-hidden mb-3">
                   <HotelMap latitude={Number(hotel.latitude)} longitude={Number(hotel.longitude)} title={hotel.title} />
                </div>

                <div className="d-flex justify-content-between align-items-center small text-muted">
                  <span>{hotel.latitude}, {hotel.longitude}</span>
                  <a href={`https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}`} target="_blank" rel="noreferrer" className="text-decoration-none">
                    View on Map <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelDetailsPage;