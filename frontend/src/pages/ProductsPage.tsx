import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "../components/Icon";
import { useOverlays } from "../components/overlays";
import { products, type Product } from "../data";

export function ProductsPage() {
  const { hash } = useLocation();
  const { openEnquiry } = useOverlays();
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Products · A&R Systems";
  }, []);

  useEffect(() => {
    const openProduct = (slug: string) => {
      if (!products.some((product) => product.slug === slug)) return;
      setOpenSlug(slug);
      const frame = requestAnimationFrame(() => {
        document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return frame;
    };

    const slug = decodeURIComponent(hash.replace(/^#/, ""));
    const frame = slug ? openProduct(slug) : undefined;
    const onOpen = (event: Event) => {
      openProduct((event as CustomEvent<string>).detail);
    };
    window.addEventListener("open-product", onOpen);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("open-product", onOpen);
    };
  }, [hash]);

  const featured = products.filter((product) => !product.enquireDirectly);
  const custom = products.find((product) => product.enquireDirectly);

  const toggle = (slug: string) => setOpenSlug((current) => (current === slug ? null : slug));

  const enquire = (product: Product) =>
    openEnquiry({
      subject: product.name,
      backLabel: "Back to Products",
      backTo: "/products",
      messageLabel: "Project brief",
      messagePlaceholder: "What would you like to validate or build?",
      successTo: "/contact",
      note: "We’ll review your brief and discuss scope and next steps.",
    });

  return (
    <section className="page">
      <div className="page-intro">
        <h1>Put AI to work in your business.</h1>
        <p className="lede">
          From ready-to-use AI products to custom workflow automation, we help your business work
          smarter.
        </p>
      </div>
      <div className="card-grid two">
        {featured.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            open={openSlug === product.slug}
            onToggle={() => toggle(product.slug)}
          />
        ))}
      </div>
      {custom ? (
        <ProductCard
          product={custom}
          open={openSlug === custom.slug}
          onToggle={() => toggle(custom.slug)}
          onEnquire={() => enquire(custom)}
        />
      ) : null}
    </section>
  );
}

function ProductCard({
  product,
  open,
  onToggle,
  onEnquire,
}: {
  product: Product;
  open: boolean;
  onToggle: () => void;
  onEnquire?: () => void;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const [slotHeight, setSlotHeight] = useState<number>();
  const expanded = open && slotHeight != null;

  const toggle = () => {
    if (!open && rootRef.current) setSlotHeight(rootRef.current.offsetHeight);
    onToggle();
  };

  useLayoutEffect(() => {
    if (open && slotHeight == null && rootRef.current) {
      setSlotHeight(rootRef.current.offsetHeight);
    }
    if (!open && slotHeight != null) setSlotHeight(undefined);
  }, [open, slotHeight]);

  return (
    <article
      ref={rootRef}
      className={`product-card${expanded ? " is-open" : ""}${product.enquireDirectly ? " custom-card" : ""}`}
      id={product.slug}
      style={expanded ? { height: slotHeight } : undefined}
    >
      <div className="card card-shell">
      <div className="card-preview">
        <div className="product-top">
          <span className="icon-well">
            <Icon name={product.icon} />
          </span>
          <span className="meta">{product.category}</span>
        </div>
        <h2>{product.name}</h2>
        <p>{product.summary}</p>
        <div className="io">
          <span>
            <i className="dot" />
            {product.input}
          </span>
          <span className="io-out">
            <Icon name="corner-down-right" />
            {product.output}
          </span>
        </div>
        <span className="text-link">
          {expanded ? "Show less" : product.cta}
          <Icon name="arrow-up-right" />
        </span>
        <button
          className="card-hit"
          type="button"
          aria-expanded={expanded}
          aria-label={`${expanded ? "Hide" : "Show"} details for ${product.name}`}
          onClick={toggle}
        />
      </div>
      {expanded ? (
        <div className="card-more">
          <div className="workflow-box">
            <h3>From input to outcome</h3>
            <p>{product.workflow}</p>
          </div>
          {product.helps.length > 0 ? (
            <>
              <h3 className="detail-heading">What this product helps with</h3>
              <ul className="helps">
                {product.helps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
          <p className="detail-note">
            Built around your tools, business rules, and the moments that need human oversight.
          </p>
          {onEnquire ? (
            <button className="text-link" type="button" onClick={onEnquire}>
              {product.cta}
              <Icon name="arrow-up-right" />
            </button>
          ) : null}
        </div>
      ) : null}
      </div>
    </article>
  );
}
