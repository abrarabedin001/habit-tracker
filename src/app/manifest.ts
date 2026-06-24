import type { MetadataRoute } from "next";

/** PWA manifest. Next.js auto-injects <link rel="manifest"> from this route. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Personal Tracker",
    short_name: "Tracker",
    description: "Track your habits and build streaks.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f4f5",
    theme_color: "#f5b301",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
