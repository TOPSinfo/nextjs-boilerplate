// components/Layout.tsx
import Head from 'next/head';

interface LayoutProps {
  title: string;
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
      {/* Add other meta tags here */}
    </Head>
    <main>{children}</main>
  </>
);

export default Layout;
