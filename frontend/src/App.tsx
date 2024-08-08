import { Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Download from "./components/Download/Download"
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/download" element={<Download />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/:fileid" element={<Download />} />
      </Routes>
    </>
  )
}

export default App
