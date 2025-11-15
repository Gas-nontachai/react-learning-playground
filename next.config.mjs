import createMDX from '@next/mdx';
import nextIntlPlugin from 'next-intl/plugin';

const withMDX = createMDX({
  extension: /\.mdx?$/
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    typedRoutes: true
  }
};

const withNextIntl = nextIntlPlugin('./next-intl.config.ts');

export default withNextIntl(withMDX(nextConfig));
