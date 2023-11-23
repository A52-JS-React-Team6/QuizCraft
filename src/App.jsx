import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SampleQuiz } from './components/SampleQuiz/SampleQuiz'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { Header } from './components/Header/Header';
import { Home } from './views/Home/Home';
// import { Forum } from './views/Forum/Forum';
import { About } from './views/About/About';
import { SignIn } from './views/SignIn/SignIn';
import { Registration } from './views/Registration/Registration';
// import { AuthProvider } from './context/AuthContext';
// import { EditProfileView } from './views/EditProfile/EditProfileView';
// import { ManageUsers } from './components/ManageUsers/ManageUsers';
import { Footer } from './components/Footer/Footer';


function App() {
  const [count, setCount] = useState(0)

  return (
    // <AuthProvider>
    <Container maxW='6xl' p='0'>
      <Header></Header>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sampleQuiz" element={<SampleQuiz />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/registration" element={< Registration />} />
          {/* <Route path="/edit-profile" element={<EditProfileView />} />
          <Route path="/manage-users" element={<ManageUsers />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </Container>
    // </AuthProvider>  
  )
}


export default App
