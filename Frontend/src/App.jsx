import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton,useUser } from '@clerk/clerk-react'
import Homepage from './pages/Homepage'
import Problemspage from './pages/Problemspage'
import {Route,Routes} from "react-router" 
import { Navigate } from 'react-router'
import {Toaster} from "react-hot-toast"
function App() {
  
const {isSignedIn}=useUser();
  return (
    <>
    <Routes>
<Route path="/" element={<Homepage/>} />
<Route path="/problems" element={isSignedIn ? <Problemspage/>: <Navigate to={"/"}/>}/>
    </Routes>
    <Toaster position="top-right" toastOptions={{duration:3000}}/>
    </>
  )
}

export default App

