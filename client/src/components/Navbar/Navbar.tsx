import Communicate from '../Communicate';
import DesktopNav from './DesktopNav';
import ResponsiveNav from './ResponsiveNav';
const Navbar = () => {
  return (
    <nav className='bg-brand-primary fixed left-0 right-0 z-20'>
      <DesktopNav />
      {/* Responsive nav */}
      <ResponsiveNav />
      <Communicate />
    </nav>
  );
};

export default Navbar;
