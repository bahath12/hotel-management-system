import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { BarChart3, Scale } from "lucide-react";
import { fetchHotels } from "../redux/hotelSlice";

function ExtrasPage() {
  const dispatch = useDispatch();
  const { hotels, loading } = useSelector((state) => state.hotels);

  const [hotel1, setHotel1] = useState("");
  const [hotel2, setHotel2] = useState("");

  useEffect(() => {
    dispatch(fetchHotels({ page: 1, limit: 1000 })); 
  }, [dispatch]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  const totalHotels = hotels.length;
  const avgPrice = totalHotels > 0 ? Math.round(hotels.reduce((sum, h) => sum + h.price, 0) / totalHotels) : 0;
  const maxPrice = totalHotels > 0 ? Math.max(...hotels.map(h => h.price)) : 0;
  const minPrice = totalHotels > 0 ? Math.min(...hotels.map(h => h.price)) : 0;

  const budgetCount = hotels.filter(h => h.price < 3000).length;
  const midCount = hotels.filter(h => h.price >= 3000 && h.price <= 6000).length;
  const luxuryCount = hotels.filter(h => h.price > 6000).length;

  const selectedHotel1 = hotels.find(h => String(h.id) === hotel1);
  const selectedHotel2 = hotels.find(h => String(h.id) === hotel2);

  return (
    <>
      <Helmet>
        <title>Stats & Compare — StayFinder</title>
        <meta name="description" content="View hotel statistics and compare hotels side-by-side." />
      </Helmet>

      <div className="mb-4">
        <h2 className="mb-1">Stats & Compare</h2>
        <p className="text-muted small">Extra feature to showcase data insights and comparison.</p>
      </div>

      <div className="row g-4">
        {/* LEFT: Dashboard Stats */}
        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center gap-2 mb-4">
                <BarChart3 size={20} className="text-primary" /> Dashboard Stats
              </h5>
              
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="p-3 bg-light rounded text-center">
                    <h3 className="text-primary mb-0">{totalHotels}</h3>
                    <small className="text-muted">Total Hotels</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded text-center">
                    <h3 className="text-success mb-0">₹{avgPrice}</h3>
                    <small className="text-muted">Average Price</small>
                  </div>
                </div>
              </div>

              {/* Price Distribution */}
              <h6 className="fw-semibold mb-3">Price Categories</h6>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Budget (Below ₹3000)</span>
                  <span>{budgetCount} hotels</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-success" style={{ width: `${(budgetCount / totalHotels) * 100}%` }}></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Mid-Range (₹3000 - ₹6000)</span>
                  <span>{midCount} hotels</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-warning" style={{ width: `${(midCount / totalHotels) * 100}%` }}></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Luxury (Above ₹6000)</span>
                  <span>{luxuryCount} hotels</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-danger" style={{ width: `${(luxuryCount / totalHotels) * 100}%` }}></div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top">
                <div className="d-flex justify-content-between small">
                  <span className="text-muted">Cheapest Hotel:</span>
                  <span className="fw-bold">₹{minPrice}</span>
                </div>
                <div className="d-flex justify-content-between small mt-2">
                  <span className="text-muted">Most Expensive:</span>
                  <span className="fw-bold">₹{maxPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Compare Hotels */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center gap-2 mb-4">
                <Scale size={20} className="text-primary" /> Compare Hotels
              </h5>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <label className="form-label small fw-semibold text-muted">Select Hotel 1</label>
                  <select className="form-select" value={hotel1} onChange={(e) => setHotel1(e.target.value)}>
                    <option value="">Choose...</option>
                    {hotels.map(h => <option key={h.id} value={h.id}>{h.title}</option>)}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold text-muted">Select Hotel 2</label>
                  <select className="form-select" value={hotel2} onChange={(e) => setHotel2(e.target.value)}>
                    <option value="">Choose...</option>
                    {hotels.map(h => <option key={h.id} value={h.id}>{h.title}</option>)}
                  </select>
                </div>
              </div>

              {/* Comparison Table */}
              {selectedHotel1 && selectedHotel2 ? (
                <div className="table-responsive">
                  <table className="table table-bordered align-middle text-center small">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: "30%" }}>Feature</th>
                        <th style={{ width: "35%" }}>{selectedHotel1.title}</th>
                        <th style={{ width: "35%" }}>{selectedHotel2.title}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-semibold text-start">Image</td>
                        <td><img src={selectedHotel1.image} alt={selectedHotel1.title} className="img-fluid rounded" style={{ height: "60px", objectFit: "cover" }} /></td>
                        <td><img src={selectedHotel2.image} alt={selectedHotel2.title} className="img-fluid rounded" style={{ height: "60px", objectFit: "cover" }} /></td>
                      </tr>
                      <tr>
                        <td className="fw-semibold text-start">Price per Night</td>
                        <td className={selectedHotel1.price < selectedHotel2.price ? "text-success fw-bold" : ""}>
                          ₹{selectedHotel1.price}
                        </td>
                        <td className={selectedHotel2.price < selectedHotel1.price ? "text-success fw-bold" : ""}>
                          ₹{selectedHotel2.price}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold text-start">Location (Lat, Lng)</td>
                        <td className="text-muted">{selectedHotel1.latitude}, {selectedHotel1.longitude}</td>
                        <td className="text-muted">{selectedHotel2.latitude}, {selectedHotel2.longitude}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold text-start">Description</td>
                        <td className="text-muted text-truncate" style={{ maxWidth: "200px" }} title={selectedHotel1.description}>{selectedHotel1.description}</td>
                        <td className="text-muted text-truncate" style={{ maxWidth: "200px" }} title={selectedHotel2.description}>{selectedHotel2.description}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted bg-light rounded">
                  <Scale size={32} className="mb-2 opacity-50" />
                  <p className="small mb-0">Select two hotels from the dropdowns above to compare them.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExtrasPage;