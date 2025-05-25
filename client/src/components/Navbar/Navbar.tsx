import Communicate from '../Communicate';
import DesktopNav from './DesktopNav';
import ResponsiveNav from './ResponsiveNav';
const Navbar = () => {
  return (
    <nav className=' fixed left-0 right-0 z-20'>
      <DesktopNav />
      <ResponsiveNav />
      <Communicate />
    </nav>
  );
};

export default Navbar;
