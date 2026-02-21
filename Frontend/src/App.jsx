import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton,useUser } from '@clerk/clerk-react'
import Homepage from './pages/Homepage'
import Problemspage from './pages/Problemspage'
import ProblemPage from './pages/ProblemPage'
import DashboardPage from './pages/DashboardPage'
import {Route,Routes} from "react-router" 
import { Navigate } from 'react-router'
import {Toaster} from "react-hot-toast"
function App() {
  
const {isSignedIn,isLoaded}=useUser();
if(!isLoaded) return null
  return (
    <>
    <Routes>
<Route path="/" element={!isSignedIn ? <Homepage/>:<Navigate to={"/dashboard"}/>} />
<Route path="/dashboard" element={isSignedIn ? <DashboardPage/>:<Navigate to={"/"}/>} />
<Route path="/problems" element={isSignedIn ? <Problemspage/>: <Navigate to={"/"}/>}/>
<Route path="/problems/:id" element={isSignedIn ? <ProblemPage/>: <Navigate to={"/"}/>}/>
    </Routes>
    <Toaster position="top-right" toastOptions={{duration:3000}}/>
    </>
  )
}

export default App

