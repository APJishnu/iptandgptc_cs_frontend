import nextPwa from "next-pwa";

const nextConfig = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default nextConfig;
