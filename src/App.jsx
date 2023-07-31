import Footer from "./components/Footer"
import Header from "./components/Header";
import HomePage from "./pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./pages/PhotoLibrary";


function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
        
          <Route path="/" element={<HomePage/>}/>
          <Route path="/photolibrary" element={<Library/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
      
      
      
    </>
  )
}

export default App
