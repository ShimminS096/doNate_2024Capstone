import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login_signup_pages/Login";
import Signup from "./pages/login_signup_pages/Signup";

import DonationFirstStep from "./pages/donation_pages/DonationFirstStep";
import BeneficiaryDetailPage from "./pages/donation_pages/BeneficiaryDetailPage";

import MyPage from "./pages/my_pages/MyPage";
import MyProfile from "./pages/my_pages/MyProfile";
import MyInterest from "./pages/my_pages/MyInterest";
import MyStatus from "./pages/my_pages/MyStatus";

import Notfound from "./pages/Notfound";

import Header from "./layouts/Header";

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/donation" element={<DonationFirstStep />} />
          <Route
            path="/beneficiarydetailpage/:id"
            element={<BeneficiaryDetailPage />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myinterest" element={<MyInterest />} />
          <Route path="/mysatus" element={<MyStatus />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
