import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import CreateListing from "./pages/CreateListing"

const App = () => {
  return (
    <BrowserRouter>
          <Header />
        <Routes>
           <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
           <Route path="/profile" element={<Profile />} />
           <Route path="/create-listing" element={<CreateListing />} />
           </Route>
           <Route path="/about" element={<About />} />
           <Route path="/sign-in" element={<SignIn />} />
           <Route path="/sign-up" element={<SignUp />} />
        </Routes>
       
    </BrowserRouter>
  )
}

export default App
