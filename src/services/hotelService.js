import axios from "axios";

const API_URL = "/api/hotels";


export async function getHotels({ 
  page = 1, limit = 6, search = "", minPrice = "", maxPrice = "", minRating = "" 
} = {}) {
  const params = new URLSearchParams();
  params.append("_page", page);
  params.append("_limit", limit);
  
  if (search) params.append("title_like", search);
  if (minPrice !== "") params.append("price_gte", minPrice);
  if (maxPrice !== "") params.append("price_lte", maxPrice);
  if (minRating !== "") params.append("rating_gte", minRating);

  const response = await axios.get(`${API_URL}?${params.toString()}`);
  return { data: response.data, totalCount: parseInt(response.headers["x-total-count"] || "0", 10) };
}

export async function getHotelById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}


export async function createHotel(hotel) {
  const response = await axios.post(API_URL, hotel);
  return response.data;
}


export async function updateHotel(hotel) {
  const response = await axios.put(`${API_URL}/${hotel.id}`, hotel);
  return response.data;
}


export async function deleteHotel(id) {
  await axios.delete(`${API_URL}/${id}`);
  return true;
}