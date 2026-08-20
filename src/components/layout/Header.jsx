import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          Daily Dev
        </Link>

        <div className="header-actions">
          <button
            type="button"
            className="header-icon-button"
            aria-label="Search"
          >
            🔍
          </button>

          <Link
            to="/profile"
            className="header-profile"
            aria-label="Profile"
          >
            👤
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;