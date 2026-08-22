import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import RouteChange from '../components/RouteChange';

export default function SubpageLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <RouteChange />
      <Header mode="subpage" />
      <main className="flex-grow pt-16 lg:pt-20">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
