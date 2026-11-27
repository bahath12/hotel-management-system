import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye ,Star } from "lucide-react";

function HotelCard({ hotel, onDeleteClick }) {
  const { id, title, description, price, image } = hotel;

  const shortDesc =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  return (
    <div className="card hotel-card h-100 border-0 shadow-sm">
      {/* 1. Image */}
      <img
        src={image}
        alt={`${title} hotel`}
        className="card-img-top hotel-card-img"
        loading="lazy"
      />

      <div className="card-body d-flex flex-column">
        {/* Title + Price */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0 text-truncate" style={{ maxWidth: "70%" }} title={title}>
            {title}
          </h5>
          <span className="price-badge">₹{price}</span>
        </div>

        {/*  Rating */}
        <div className="d-flex align-items-center gap-1 mb-2 text-warning small fw-bold">
          <Star size={14} fill="currentColor" />
          <span>{hotel.rating || "N/A"}</span>
        </div>

        {/* 3. Short Description */}
        <p className="card-text text-muted small flex-grow-1">{shortDesc}</p>

        {/* 4. Buttons (View, Edit, Delete) */}
        <div className="d-flex gap-2 mt-3">
          <Link
            to={`/hotel/${id}`}
            className="btn btn-outline-primary btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
          >
            <Eye size={14} />
            View
          </Link>

          <Link
            to={`/edit/${id}`}
            className="btn btn-outline-secondary btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
          >
            <Pencil size={14} />
            Edit
          </Link>

          <button
            type="button"
            className="btn btn-outline-danger btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
            onClick={() => onDeleteClick(hotel)}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;