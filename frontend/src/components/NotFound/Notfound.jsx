const Notfound = () => {
  return (
    <div>
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <p className="fs-3">
            <span className="text-danger">Oops!</span> Page not found.
          </p>
          <p className="lead">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <a href="/" className="btn btn-primary">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
