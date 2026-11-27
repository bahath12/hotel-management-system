import { useState } from "react";
import { Upload, X } from "lucide-react";
import { validateHotelForm } from "../utils/validation";
import { fileToBase64 } from "../utils/imageHelper";

function HotelForm({ initialData, onSubmit, submitLabel = "Save Hotel" }) {
  const [values, setValues] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    latitude: initialData?.latitude?.toString() || "",
    longitude: initialData?.longitude?.toString() || "",
    price: initialData?.price?.toString() || "",
    image: initialData?.image || "",
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [imageError, setImageError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
   
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError("");
    try {
      const base64 = await fileToBase64(file);
      setValues((prev) => ({ ...prev, image: base64 }));
      setImagePreview(base64);
      if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
    } catch (err) {
      setImageError(err.message);
    }
  };

  const handleRemoveImage = () => {
    setValues((prev) => ({ ...prev, image: "" }));
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateHotelForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        ...initialData, 
        ...values,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
        price: Number(values.price),
      });
    } catch (err) {
      setImageError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="hotel-form" noValidate>
      <div className="row g-3">
        {/* Image Upload */}
        <div className="col-12">
          <label className="form-label fw-semibold">
            Hotel Image <span className="text-danger">*</span>
          </label>

          {imagePreview ? (
            <div className="position-relative d-inline-block">
              <img
                src={imagePreview}
                alt="Hotel preview"
                className="form-image-preview rounded"
              />
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                onClick={handleRemoveImage}
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="imageUpload"
              className="upload-box d-flex flex-column align-items-center justify-content-center text-muted"
            >
              <Upload size={28} />
              <span className="mt-2 small">Click to upload image</span>
              <span className="small text-muted">(Max 2MB)</span>
            </label>
          )}

          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="d-none"
            onChange={handleImageChange}
          />

          {(imageError || errors.image) && (
            <div className="text-danger small mt-1">
              {imageError || errors.image}
            </div>
          )}
        </div>

        {/* Title */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">
            Hotel Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={values.title}
            onChange={handleChange}
            placeholder="e.g. Ocean Breeze Resort"
          />
          {errors.title && (
            <div className="invalid-feedback d-block">{errors.title}</div>
          )}
        </div>

        {/* Price */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">
            Price (₹ per night) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            name="price"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            value={values.price}
            onChange={handleChange}
            placeholder="e.g. 4500"
            min="1"
          />
          {errors.price && (
            <div className="invalid-feedback d-block">{errors.price}</div>
          )}
        </div>

        {/* Description */}
        <div className="col-12">
          <label className="form-label fw-semibold">
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            name="description"
            rows="4"
            className={`form-control ${
              errors.description ? "is-invalid" : ""
            }`}
            value={values.description}
            onChange={handleChange}
            placeholder="Describe the hotel..."
          />
          {errors.description && (
            <div className="invalid-feedback d-block">
              {errors.description}
            </div>
          )}
        </div>

        {/* Latitude */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">
            Latitude <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            step="any"
            name="latitude"
            className={`form-control ${errors.latitude ? "is-invalid" : ""}`}
            value={values.latitude}
            onChange={handleChange}
            placeholder="e.g. 15.2993"
          />
          {errors.latitude && (
            <div className="invalid-feedback d-block">{errors.latitude}</div>
          )}
          <div className="form-text">Between -90 and 90</div>
        </div>

        {/* Longitude */}
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold">
            Longitude <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            step="any"
            name="longitude"
            className={`form-control ${errors.longitude ? "is-invalid" : ""}`}
            value={values.longitude}
            onChange={handleChange}
            placeholder="e.g. 74.124"
          />
          {errors.longitude && (
            <div className="invalid-feedback d-block">{errors.longitude}</div>
          )}
          <div className="form-text">Between -180 and 180</div>
        </div>

        {/* Buttons */}
        <div className="col-12 d-flex gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

export default HotelForm;