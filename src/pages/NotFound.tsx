import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";

const NotFound = () => {
  const location = useLocation();

  usePageMeta("Page not found - Piyush Yadav");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-20">
      <div className="card p-10 text-center max-w-md">
        <p className="kicker mb-4">// 404</p>
        <h1 className="mb-3 text-5xl font-semibold tracking-tight">404</h1>
        <p className="mb-8 text-muted-foreground leading-relaxed">
          This page doesn't exist. It may have been moved, or the path is
          mistyped.
        </p>
        <Link to="/" className="btn-secondary">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
