import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "@/App";

// Never hit the network in tests: force GitHub API calls into their error path
vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      ok: false,
      statusText: "unavailable",
      json: async () => ({}),
    })
  )
);

const renderAt = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("routing", () => {
  it("renders the home page at /", () => {
    renderAt("/");
    expect(
      screen.getByRole("heading", { level: 1, name: /Piyush Yadav/ })
    ).toBeInTheDocument();
    // Home is an overview: hero CTA links to the projects page
    expect(screen.getByRole("link", { name: /View Projects/ })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  it.each([
    ["/projects", /Selected work/],
    ["/experience", /Experience/],
    ["/open-source", /Open Source/],
    ["/about", /About/],
    ["/contact", /Let's build something solid/],
  ])("renders %s directly with a single h1", (path, heading) => {
    renderAt(path);
    expect(
      screen.getByRole("heading", { level: 1, name: heading })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders the not-found page for unknown routes", () => {
    renderAt("/does-not-exist");
    expect(screen.getByRole("heading", { level: 1, name: "404" })).toBeInTheDocument();
  });

  it("sets a document title per page", () => {
    renderAt("/projects");
    expect(document.title).toBe("Projects - Piyush Yadav");
  });

  it("navigates between pages via the navbar without reloading", () => {
    renderAt("/");
    fireEvent.click(screen.getAllByRole("link", { name: /Experience/ })[0]);
    expect(window.location.pathname).toBe("/experience");
    expect(
      screen.getByRole("heading", { level: 1, name: /Experience/ })
    ).toBeInTheDocument();
    expect(document.title).toBe("Experience - Piyush Yadav");
  });

  it("marks the active nav item with aria-current", () => {
    renderAt("/about");
    const active = screen.getAllByRole("link", { name: /About/ })[0];
    expect(active).toHaveAttribute("aria-current", "page");
  });

  it("opens and closes the mobile menu with Escape", () => {
    renderAt("/");
    fireEvent.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
  });
});
