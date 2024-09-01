export default function Footer() {
    return (
      <>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 m-4 border-top">
          <p className="col-md-4 mb-0 ms-4 text-body-secondary">
            &copy; 2024 Flood Help, Inc.
          </p>
          <ul className="nav col-md-4 me-4 justify-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secondary">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link px-2 text-body-secondary">
                About
              </a>
            </li>
          </ul>
        </footer>
      </>
    );
  }
  