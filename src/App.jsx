import Footer from "./components/Footer"
import Header from "./components/Header";
import HomePage from "./pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./pages/PhotoLibrary";
import { useState, createContext } from "react";

export const UserContext = createContext()


function App() {
 
  const [passedId, setPassedId] = useState(0);
  
function UseNewLId(id) {
  setPassedId(id)
 }

  return (
    <>
    <UserContext.Provider value={passedId}>
    <BrowserRouter>
    <Header/>
    <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/photolibrary" element={<Library UseNewLId={UseNewLId}/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
    </UserContext.Provider>
      
      
    </>
  )
}

export default App