import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import RouteChange from '../components/RouteChange';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <RouteChange />
      <Header mode="home" />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
