// Form validation — simple, reusable
// Returns an object of errors. Empty object = no errors.

export function validateHotelForm(values) {
  const errors = {};

  // Title
  if (!values.title || !values.title.trim()) {
    errors.title = "Hotel title is required.";
  } else if (values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  // Description
  if (!values.description || !values.description.trim()) {
    errors.description = "Description is required.";
  } else if (values.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters.";
  }

  // Latitude
  const lat = Number(values.latitude);
  if (values.latitude === "" || isNaN(lat)) {
    errors.latitude = "Latitude is required.";
  } else if (lat < -90 || lat > 90) {
    errors.latitude = "Latitude must be between -90 and 90.";
  }

  // Longitude
  const lng = Number(values.longitude);
  if (values.longitude === "" || isNaN(lng)) {
    errors.longitude = "Longitude is required.";
  } else if (lng < -180 || lng > 180) {
    errors.longitude = "Longitude must be between -180 and 180.";
  }

  // Price
  const price = Number(values.price);
  if (values.price === "" || isNaN(price)) {
    errors.price = "Price is required.";
  } else if (price <= 0) {
    errors.price = "Price must be a positive number.";
  }

  // Image
  if (!values.image) {
    errors.image = "Hotel image is required.";
  }

  return errors;
}