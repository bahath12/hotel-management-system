import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Home } from "lucide-react";

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — StayFinder</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      <div className="text-center py-5">
        <h1 className="display-1 fw-bold text-primary mb-2">404</h1>
        <h4 className="mb-2">Page Not Found</h4>
        <p className="text-muted mb-4">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="d-flex justify-content-center gap-2">
          <Link to="/" className="btn btn-primary d-inline-flex align-items-center gap-1">
            <Home size={16} />
            Go Home
          </Link>
          <button
            type="button"
            className="btn btn-outline-secondary d-inline-flex align-items-center gap-1"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;