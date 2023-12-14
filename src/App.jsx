import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SampleQuiz } from './components/SampleQuiz/SampleQuiz'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './views/Home/Home';
import { About } from './views/About/About';
import { SignIn } from './views/SignIn/SignIn';
import { Registration } from './views/Registration/Registration';
import { Footer } from './components/Footer/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CreateQuiz } from './components/CreateQuiz/CreateQuiz';
import  { QuizResults } from './components/QuizResults/QuizResults';
// import { StudentDashboard } from './components/StudentDashboard/StudentDashboard';
// import { NavBarNew } from './components/NavBarNew/NavBar';
import { NavBar } from './components/NavBar/NavBar'
import { EditProfile } from './components/EditProfile/EditProfile';
import { ManageQuizzes } from './components/ManageQuizzes/ManageQuizzes'
import { AdminView } from './views/Admin/Admin';
import { StudentDashboard } from './components/StudentDashboard/StudentDashboard';
import { StudentScoreBoard } from './components/StudentScoreBoard/StudentScoreBoard'
import { RealQuiz } from './components/RealQuiz/RealQuiz'
import { EducatorDashboard } from './components/EducatorDashboard/EducatorDashboard';
import { Dashboard } from './views/Dashboard/Dashboard';

function App() {

  return (
    <AuthProvider>
    <Container minW='6xl' p='0' minH='100vh' bg='blue.800' color="white">
      <BrowserRouter>
      <Header>
      </Header>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz-results" element={<QuizResults />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/registration" element={< Registration />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path="/manage-quizzes" element={<ManageQuizzes />} />
          <Route path="/admin-page" element={<AdminView />} />
          <Route path="*" element={<Home />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/scoreboard" element={<StudentScoreBoard />} />
          <Route path="/real-quiz" element={<RealQuiz />} />
          <Route path="/educator-dashboard" element={<EducatorDashboard />} />
          <Route path="/sample-quiz" element={<SampleQuiz/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </Container>
    </AuthProvider>  
  )
}


export default App
