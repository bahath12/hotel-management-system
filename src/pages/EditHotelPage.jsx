import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

import HotelForm from "../components/HotelForm";
import { updateHotel } from "../redux/hotelSlice";
import { getHotelById } from "../services/hotelService";

function EditHotelPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotels } = useSelector((state) => state.hotels);

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadHotel() {
      const fromStore = hotels.find((h) => h.id === id);
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
    return () => {
      cancelled = true;
    };
  }, [id, hotels]);

  const handleSubmit = async (hotelData) => {
    try {
      await dispatch(updateHotel(hotelData)).unwrap();
      navigate("/");
    } catch (err) {
     throw new Error(err?.message || "Failed to update hotel.", { cause: err });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="text-center py-5">
        <h4>Hotel not found</h4>
        <Link to="/" className="btn btn-primary btn-sm mt-2">
          Back to Hotels
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit {hotel.title} — StayFinder</title>
        <meta
          name="description"
          content={`Edit details of ${hotel.title}.`}
        />
      </Helmet>

      <div className="mb-4">
        <Link to="/" className="text-muted small d-inline-flex align-items-center gap-1">
          <ArrowLeft size={14} />
          Back to Hotels
        </Link>
        <h2 className="mt-2 mb-1">Edit Hotel</h2>
        <p className="text-muted small mb-0">
          Update the details of <strong>{hotel.title}</strong>.
        </p>
      </div>

      <HotelForm
        initialData={hotel}
        onSubmit={handleSubmit}
        submitLabel="Update Hotel"
      />
    </>
  );
}

export default EditHotelPage;