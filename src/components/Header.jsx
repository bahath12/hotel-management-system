import { Link, NavLink } from "react-router-dom";
import { Hotel, PlusCircle, BarChart3 } from "lucide-react";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
      <div className="container-fluid px-4"> 
        
        {/* Logo  */}
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold text-white" to="/">
          <Hotel size={30} />
          <span className="fs-4">StayFinder</span> {/* ✅ Font konjam perusa */}
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links (Right Side) */}
        <div className="collapse navbar-collapse" id="mainNav">
         
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "nav-link text-white fs-5" + (isActive ? " fw-bold border-bottom border-2 border-white" : " opacity-75")
                }
              >
                Hotels
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink
                to="/extras"
                className={({ isActive }) =>
                  `btn btn-sm d-flex align-items-center gap-2 px-4 py-2 fw-semibold fs-6 ${
                    isActive ? "btn-warning text-dark" : "btn-outline-light"
                  }`
                }
              >
                <BarChart3 size={18} />
                Stats & Compare
              </NavLink>
            </li>

            <li className="nav-item">
              <Link to="/add" className="btn btn-light text-primary btn-sm d-flex align-items-center gap-2 fw-semibold px-4 py-2 fs-6">
                <PlusCircle size={18} />
                Add Hotel
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;