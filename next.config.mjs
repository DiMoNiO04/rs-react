import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: './dist',
  sassOptions: {
    includePaths: [path.join(path.dirname(fileURLToPath(import.meta.url)), 'src/styles')],
    // prependData: '@import "/styles/settings/index";',
  },
};

export default nextConfig;
