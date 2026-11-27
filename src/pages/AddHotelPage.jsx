import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import HotelForm from "../components/HotelForm";
import { addHotel } from "../redux/hotelSlice";

function AddHotelPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (hotelData) => {
    try {
      await dispatch(addHotel(hotelData)).unwrap();
      navigate("/");
    } catch (err) {
      
      throw new Error(err?.message || "Failed to add hotel.", { cause: err });
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Hotel — StayFinder</title>
        <meta
          name="description"
          content="Add a new hotel with image, price, and location."
        />
      </Helmet>

      <div className="mb-4">
        <Link to="/" className="text-muted small d-inline-flex align-items-center gap-1">
          <ArrowLeft size={14} />
          Back to Hotels
        </Link>
        <h2 className="mt-2 mb-1">Add New Hotel</h2>
        <p className="text-muted small mb-0">
          Fill in the details below to add a new hotel.
        </p>
      </div>

      <HotelForm
        onSubmit={handleSubmit}
        submitLabel="Add Hotel"
      />
    </>
  );
}

export default AddHotelPage;