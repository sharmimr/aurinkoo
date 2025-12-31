import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Sales from "./Pages/Sales";
import About from "./Pages/About";
import RequestDemo from "./Pages/RequestDemo";
import NoPage from "./Pages/NoPage";
import SamplePage from "./Pages/SamplePage";
import SamplePageTwo from "./Pages/SamplePageTwo";
import SamplePageThree from "./Pages/SamplePageThree";
import SamplePageFour from "./Pages/SamplePageFour";
import SamplePageFive from "./Pages/SamplePageFive";
import SamplePageSix from "./Pages/SamplePageSix";
import SamplePageSeven from "./Pages/SamplePageSeven";
import Writing from "./Pages/Writing";
import Testing from "./Pages/Testing";
import Edtech from "./Pages/Edtech";
import Careers from "./Pages/Careers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tech" element={<Product />} />
          <Route path="sales" element={<Sales />} />
          <Route path="writing" element={<Writing />} />
          <Route path="testing" element={<Testing />} />
          <Route path="edtech" element={<Edtech />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />

          <Route path="contactUs" element={<RequestDemo />} />
          <Route path="samplepagetwo" element={<SamplePageTwo />} />
          <Route path="samplepagethree" element={<SamplePageThree />} />
          <Route path="samplepagefour" element={<SamplePageFour />} />
          <Route path="samplepagefive" element={<SamplePageFive />} />
          <Route path="samplepagesix" element={<SamplePageSix />} />
          <Route path="samplepageseven" element={<SamplePageSeven />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
