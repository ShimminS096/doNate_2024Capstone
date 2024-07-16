import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login_signup_pages/Login";
import Signup from "./pages/login_signup_pages/Signup";

import Donation from "./pages/donation_pages/Donation";
import Payment from "./pages/donation_pages/Payment";
import Done from "./pages/donation_pages/Done";
import BeneficiaryDetailPage from "./pages/donation_pages/BeneficiaryDetailPage";

import Mypage from "./pages/my_pages/Mypage";
import Myprofile from "./pages/my_pages/Myprofile";
import Myinterest from "./pages/my_pages/Myinterest";
import Mystatus from "./pages/my_pages/Mystatus";

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
          <Route path="/donation" element={<Donation />} />
          <Route
            path="/beneficiarydetailpage/:id"
            element={<BeneficiaryDetailPage />}
          />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/myinterest" element={<Myinterest />} />
          <Route path="/mysatus" element={<Mystatus />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
