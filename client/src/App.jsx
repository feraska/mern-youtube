import React, { Suspense, lazy, useEffect, useState } from 'react'
import styled, { ThemeProvider } from "styled-components"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
const Home = lazy( ()=>import( "./pages/Home") )
const SignIn = lazy(()=>import('./pages/SignIn'))
const Video = lazy(()=>import('./pages/Video')) 
const Menu = lazy(()=>import('./components/Menu')) 
const  Navbar = lazy(()=>import('./components/Navbar')) 
import { darkTheme, lightTheme } from './utils/Theme'
const Loading = lazy(()=>import('./components/Loading'))  
const Search = lazy(()=>import('./pages/Search')) 
const Container = styled.div`
  display: flex;
`
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`
const Wrapper = styled.div`
  padding: 22px 96px;
`
const Layout = () => {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(()=>{
    if(!localStorage.getItem("bc")) {
      localStorage.setItem("bc",true)
    }
    if(localStorage.getItem("bc") === "true") {
      setDarkMode(true)
    }
    if(localStorage.getItem("bc") === "false") {
      setDarkMode(false)
    }
    
  },[])
  return ( 
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      
    <Container>
    
      <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
    
      <Main>
        <Navbar/>
        <Wrapper>
        <Outlet/>
        </Wrapper>
      </Main>
     
    </Container>
    
    </ThemeProvider>
   
  )
}
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        
      <Layout/>,
      
      
      children:[
        {
          path:"/",
          element:(
            <Suspense fallback={<Loading/>}>
          <Home type={"random"}/>,
          </Suspense>
          )
        },
        {
          path:"/trends",
          element:(
            <Suspense fallback={<Loading/>}>
          <Home type={"trend"}/>,
          </Suspense>
          )
        },
        {
          path:"/subscriptions",
          element:(
            <Suspense fallback={<Loading/>}>
          <Home type={"sub"}/>,
          </Suspense>
          )
        },
        {
          path:"/search",
          element:(
            <Suspense fallback={<Loading/>}>
          <Search/>,
          </Suspense>
          )
        },
        
        {
          path:"/signin",
          element:(
            <Suspense fallback={<Loading/>}>
          <SignIn/>
          </Suspense>
          )
        },
        {
          path:"/video/:id",
          element:(
            <Suspense fallback={<Loading/>}>
          <Video />
          </Suspense>
          )
        }
      ]
    },
    
  ]);

  return (
 
    <RouterProvider router={router} />
  
    
  )
}

export default App
