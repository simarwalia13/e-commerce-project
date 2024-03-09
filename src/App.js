import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import FooterSection from "./Components/FooterSection";
// import Layout from "./Components/Layout";
import LayoutSection from "./Components/LayoutSection";
import ShopAll from "./Components/ShopAll";
import Furniture from "./Components/Furniture";
import Lights from "./Components/Lights";
import Rugs from "./Components/Rugs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/shopAll"
          element={
            <LayoutSection>
              <ShopAll />
            </LayoutSection>
          }
        />
        <Route
          path="/furniture"
          element={
            <LayoutSection>
              <Furniture />
            </LayoutSection>
          }
        />
        <Route
          path="/lighting"
          element={
            <LayoutSection>
              <Lights />
            </LayoutSection>
          }
        />
        <Route
          path="/rugs"
          element={
            <LayoutSection>
              <Rugs />
            </LayoutSection>
          }
        />
      </Routes>

      <FooterSection />
    </>
  );
}

export default App;
