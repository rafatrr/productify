import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProfilePage from './pages/ProfilePage'
import CreatePage from './pages/CreatePage'
import EditProductPage from './pages/EditProductPage'
import  useAuthReq  from './hooks/useAuthReq'
import  useUserSync  from './hooks/useUserSync'

function App() {
  const { isSignedIn, isClerkLoaded } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded) return null;


  return (
    <div className=" min-h-screen bg-base-100 ">
      <Navbar />
      <main  className='max-w-5xl mx-auto px-4 py-8'>
        <Routes>
          <Route path="/" element={<div><HomePage/></div>} />
          <Route path="/product/:id" element={<div><ProductPage/></div>} />
          <Route path="/profile/" element={<div><ProfilePage/></div>} />
          <Route path="/create/" element={<div><CreatePage/></div>} />
          <Route path="/edit/:id" element={<div><EditProductPage/></div>} />




        </Routes>

      </main>
    
    
    </div> 
  )
}

export default App;