import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SampleQuiz } from './components/SampleQuiz/SampleQuiz'
import { ChakraProvider, Flex } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChakraProvider>
        <Flex justifyContent="center" alignItems="center" minHeight="100vh"> 
          <SampleQuiz />
        </Flex> 
      </ChakraProvider>
    </>
  )
}

export default App
