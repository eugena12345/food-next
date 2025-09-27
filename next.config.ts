import type { NextConfig } from "next";

const path = require('path');

const nextConfig: NextConfig = {
  /* config options here */
    turbopack: {
    root: path.join(__dirname, './'), // Указывает текущую директорию как корень
  },

};

export default nextConfig;
