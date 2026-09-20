import { lazy, Suspense } from "react";
import Portfolio from "./App";

const Spanda = lazy(() => import("./experiences/ExperiencePage"));
const Breath = lazy(() => import("./experiences/BreathPage"));
const Video = lazy(() => import("./experiences/VideoPlayerPage"));
const Legal = lazy(() => import("./experiences/LegalPage"));
const Cyma = lazy(() => import("./cyma/CymaPage"));

export default function SiteRouter() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const routes: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
    "/spanda": Spanda,
    "/breath": Breath,
    "/video": Video,
    "/legal": Legal,
    "/cyma": Cyma,
  };
  const Page = routes[path];
  if (!Page) return <Portfolio />;
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#07080f" }} />}>
      <Page />
    </Suspense>
  );
}