import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { emails, footerSolutions } from "../data";
import { Icon } from "./Icon";
import { useOverlays } from "./overlays";

const navItems = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Business Analysis", to: "/business-analysis" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const { openCall } = useOverlays();

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <header className={menuOpen ? "nav open" : "nav"}>
        <NavLink className="brand" to="/" onClick={closeMenu}>
          <span className="monogram">A&amp;R</span>
          <span className="brand-name">A&amp;R Systems</span>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="btn btn-secondary" type="button" onClick={() => { closeMenu(); openCall(); }}>
            Book an introductory call
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-intro">
            <NavLink className="brand" to="/">
              <span className="monogram monogram-footer">A&amp;R</span>
              <span className="brand-name">A&amp;R Systems</span>
            </NavLink>
            <p>
              AI-powered software for a more efficient business. Less repetitive work. More time for
              what matters.
            </p>
          </div>
          <div className="footer-col">
            <p className="footer-label">SOLUTIONS</p>
            {footerSolutions.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => {
                  const slug = item.to.split("#")[1];
                  if (pathname === "/products" && hash === `#${slug}`) {
                    window.dispatchEvent(new CustomEvent("open-product", { detail: slug }));
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <p className="footer-label">COMPANY</p>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/business-analysis">Business analysis</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>
          </div>
          <div className="footer-talk">
            <p className="footer-label">LET’S TALK</p>
            <p>What could your business stop doing manually?</p>
            <NavLink className="text-link" to="/contact">
              Start a conversation
              <Icon name="arrow-up-right" />
            </NavLink>
            <a className="footer-mail" href={`mailto:${emails.info}`}>
              {emails.info}
            </a>
          </div>
        </div>
        <div className="footer-legal">
          <p>© 2026 A&amp;R Systems. All rights reserved.</p>
          <p className="footer-mark">BUILT FOR REAL BUSINESS WORK.</p>
        </div>
      </footer>
    </div>
  );
}

export function FounderCard({
  name,
  role,
  bio,
}: {
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <article className="card founder-card">
      <h2>{name}</h2>
      {role ? <p className="role">{role}</p> : null}
      <p className="body-copy">{bio}</p>
    </article>
  );
}

