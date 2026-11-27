import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination mb-0">
        {/* Previous */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
        </li>

        {/* Page numbers */}
        {pages.map((p) => (
          <li
            key={p}
            className={`page-item ${p === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(p)}>
              {p}
            </button>
          </li>
        ))}

        {/* Next */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;