/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "hqrfpjhnhqvexdjovvkf.supabase.co",
        pathname:
          "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
};
