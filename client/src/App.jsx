import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import Error404 from './components/error404'
import Signup from './components/signup'
import Login from './components/login'
import Landingpage from './components/landingpage2'
import Layout from './components/layout'
import Protectedroutes from './components/utils/protectedroutes'
import {UserContextProvider} from './components/context/UserContextProvider'
import { ToastContainer } from 'react-toastify'
import Editprofile2 from './components/editprofile2'
import ProfilePage from './components/ProfilePage'
import BountiesPage from './components/BountiesPage'
import AddProject from './components/AddProject'
import bg1 from './assets/images/bg1.jpg'
import ExplorePage from './components/ExplorePage'
import ChatPage from './components/ChatPage'
import OpenProjectCard from './components/OpenProjectCard'
import SearchPage from './components/SearchPage'
import OpenProject from './components/OpenProject'


function App() {
  return (
    <>
      <UserContextProvider>
        
        <Routes>  
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/*" element={ <Error404/>}/>
          
          <Route element={<Layout/>}>

            <Route path= "/dev" element = {<ChatPage/>}/>
            <Route path="/" element={<Landingpage/>}/>
            
            <Route element={<Protectedroutes/>}>
                <Route path= "/chat" element = {<ChatPage/>}/>
                <Route path= "/search" element = {<SearchPage/>}/>
                <Route path= "/project/:projectId" element = {<OpenProject/>}/>
                <Route path="/user/:username" element={<ProfilePage/>}/>
                <Route path="/explore" element={<ExplorePage/>}/>                
                <Route path="/bounties" element={<BountiesPage/>}/>                
                <Route path="user/:username/edit" element={<Editprofile2/>}/>
            </Route>
          
          </Route>
        
        </Routes>
      
      </UserContextProvider>
      <ToastContainer/>
    </>
  )
}

export default App
