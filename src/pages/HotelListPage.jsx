import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, SlidersHorizontal } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { fetchHotels, removeHotel } from "../redux/hotelSlice";
import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 6;

function FilterPanel({ 
  search, setSearch, 
  minPrice, setMinPrice, 
  maxPrice, setMaxPrice, 
  minRating, setMinRating, 
  setCurrentPage 
}) {
  
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="filter-sidebar p-3 bg-white rounded shadow-sm border">
      <h5 className="mb-3 d-flex align-items-center gap-2">
        <SlidersHorizontal size={18} /> Filters
      </h5>

      {/* Search */}
      <div className="mb-4">
        <label className="form-label small fw-semibold text-muted">Search by Title</label>
        <div className="input-group input-group-sm">
          <span className="input-group-text bg-white"><Search size={14} /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Hotel name..."
            value={search}
            onChange={(e) => handleFilterChange(setSearch, e.target.value)}
          />
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-3">
        <label className="form-label small fw-semibold text-muted">Price Range (₹)</label>
        <div className="d-flex gap-2 align-items-center">
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => handleFilterChange(setMinPrice, e.target.value)}
            min="0"
          />
          <span className="text-muted">-</span>
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => handleFilterChange(setMaxPrice, e.target.value)}
            min="0"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-3">
        <label className="form-label small fw-semibold text-muted">Minimum Rating</label>
        <select 
          className="form-select form-select-sm" 
          value={minRating} 
          onChange={(e) => handleFilterChange(setMinRating, e.target.value)}
        >
          <option value="">Any Rating</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>
      
      {/* Clear Button */}
      <button 
        className="btn btn-outline-secondary btn-sm w-100 mt-2"
        onClick={() => { 
          setSearch(""); 
          setMinPrice(""); 
          setMaxPrice(""); 
          setMinRating(""); 
          setCurrentPage(1); 
        }}
      >
        Clear Filters
      </button>
    </div>
  );
}

function HotelListPage() {
  const dispatch = useDispatch();
  const { hotels, totalCount, loading, error } = useSelector((state) => state.hotels);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    dispatch(
      fetchHotels({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search,
        minPrice,
        maxPrice,
        minRating,
      })
    );
  }, [dispatch, currentPage, search, minPrice, maxPrice, minRating]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await dispatch(removeHotel(deleteTarget.id));
    setDeleteTarget(null);
    setToastMessage(`"${deleteTarget.title}" deleted successfully!`);
    setTimeout(() => setToastMessage(""), 3000);
    dispatch(fetchHotels({ page: currentPage, limit: ITEMS_PER_PAGE, search, minPrice, maxPrice, minRating }));
  };

  return (
    <>
      <Helmet>
        <title>Hotels — StayFinder</title>
        <meta name="description" content="Browse and manage hotels." />
      </Helmet>

      {/* Toast */}
      {toastMessage && (
        <div className="toast show position-fixed top-0 end-0 m-3 bg-success text-white" role="alert">
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToastMessage("")}></button>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Hotels</h2>
          <p className="text-muted mb-0 small">{totalCount} hotels found</p>
        </div>
        
        <button 
          className="btn btn-primary d-lg-none d-flex align-items-center gap-2"
          onClick={() => setShowMobileFilter(!showMobileFilter)}
        >
          <SlidersHorizontal size={16} /> Filter
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-4 d-none d-lg-block">
          <FilterPanel 
            search={search} setSearch={setSearch} 
            minPrice={minPrice} setMinPrice={setMinPrice} 
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            minRating={minRating} setMinRating={setMinRating}
            setCurrentPage={setCurrentPage} 
          />
        </div>

        {showMobileFilter && (
          <div className="col-12 d-lg-none mb-3">
            <FilterPanel 
              search={search} setSearch={setSearch} 
              minPrice={minPrice} setMinPrice={setMinPrice} 
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              minRating={minRating} setMinRating={setMinRating}  
              setCurrentPage={setCurrentPage} 
            />
          </div>
        )}

        <div className="col-12 col-lg-8">
          {error && <div className="alert alert-danger">Error: {error}</div>}

          {loading && (
            <div className="text-center py-5 bg-white rounded shadow-sm border">
              <div className="spinner-border text-primary mb-3" role="status"></div>
              <p className="text-muted small mb-0">Fetching hotels...</p>
            </div>
          )}

          {!loading && !error && hotels.length === 0 && (
            <div className="text-center py-5 text-muted bg-white rounded shadow-sm border">
              <h5>No hotels found</h5>
              <p className="small mb-0">Try changing search or price range.</p>
            </div>
          )}

          {!loading && !error && hotels.length > 0 && (
            <>
              <div className="row g-3">
                {hotels.map((hotel) => (
                  <div className="col-12 col-md-6 col-xl-4" key={hotel.id}>
                    <HotelCard hotel={hotel} onDeleteClick={setDeleteTarget} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Hotel</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteTarget(null)}></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">Are you sure you want to delete <strong>{deleteTarget.title}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HotelListPage;