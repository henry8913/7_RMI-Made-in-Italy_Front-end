import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import {
  Home,
  About,
  Brands,
  BrandDetail,
  Restomods,
  RestomodDetail,
  Contact,
  Profile,
  NotFound,
  Blog,
  BlogPost,
  TestDrive,
  Wishlist,
  CustomRequest,
  Packages,
  PackageDetail,
  Jobs,
  FAQ,
  Login,
  Register,
  GoogleAuthCallback,
} from "./pages";

import {
  Restoration,
  Customization,
  Maintenance,
  Consulting
} from "./pages/services";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotta per il callback di autenticazione Google */}
        <Route path="/auth/google/success" element={<GoogleAuthCallback />} />
        
        {/* Rotte con layout comune (navbar e footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brands/:id" element={<BrandDetail />} />
          <Route path="restomods" element={<Restomods />} />
          <Route path="restomods/:id" element={<RestomodDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="test-drive" element={<TestDrive />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="custom-requests" element={<CustomRequest />} />
          <Route path="packages" element={<Packages />} />
          <Route path="packages/:id" element={<PackageDetail />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Rotte per i servizi */}
          <Route path="services/restoration" element={<Restoration />} />
          <Route path="services/customization" element={<Customization />} />
          <Route path="services/maintenance" element={<Maintenance />} />
          <Route path="services/consulting" element={<Consulting />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
