import { Outlet, Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import { Hotel } from "lucide-react";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />

      {/* Main Content Area */}
     
      <main className="flex-grow-1">
        <div className="container page-container pb-5">
          <Outlet />
        </div>
      </main>

     
      <footer className="bg-primary text-white py-4 mt-auto">
        <div className="container">
          <div className="row align-items-center">
            
            {/* Left: Logo & Copyright */}
            <div className="col-md-6 mb-3 mb-md-0 text-center text-md-start">
              <h5 className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 text-white mb-2">
                <Hotel size={20} /> StayFinder
              </h5>
              <p className="small text-white-50 mb-0">
                © {new Date().getFullYear()} StayFinder. All rights reserved.
              </p>
            </div>

            {/* Right: Links */}
            <div className="col-md-6 text-center text-md-end">
              <Link to="/" className="text-white text-decoration-none small me-3 hover-opacity">Hotels</Link>
              <Link to="/add" className="text-white text-decoration-none small me-3 hover-opacity">Add Hotel</Link>
              <Link to="/extras" className="text-white text-decoration-none small hover-opacity">Stats & Compare</Link>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;