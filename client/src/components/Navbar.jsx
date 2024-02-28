import React, { lazy, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link,useNavigate  } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { logout } from '../redux/userSlice';
import { api } from "../utils/constant"
const  Upload = lazy(()=>('./Upload')) ;
const Container = styled.div`
     position: sticky;
     top: 0;
     background-color: ${({ theme }) => theme.bgLighter};
     height: 56px;
     z-index: 999;
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding: 0px 20px;
    position: relative;
`;
const Search = styled.div`
    width: 40%;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
`;
const Image = styled.img`
  
 
 
  
  width: 30px;
  height: 30px;
`;
const Label = styled.label`
font-size: 16px;
width: 100%;
cursor: pointer;
`
const Box = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  position: absolute;
  left: 0;
  top: 25px;
  z-index: 9999;
  width: 100%;
  max-height: 350px;
  margin-top: 15px;
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Data = styled.div`
  
  
 
 // a {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-decoration:none;
  color: black;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  padding-left: 15px;
//  }
  &:hover {
    background: #3498db;
    color: white;
    cursor: pointer;
    
  }
  
`

const Input = styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const Close = styled.span`
right: 30px;
position: absolute;
cursor: pointer;
&:hover {
  background-color: lightgray;
  border-radius: 50%;
}
`

const Navbar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [openAutoComplete,setOpenAutoComplete] = useState(false)
    const navigate = useNavigate()
    const [q, setQ] = useState("");
    const dispatch = useDispatch()
    const [videos,setVideos] = useState([])
    const searchRef = useRef()
    useEffect(()=> {
      const click = window.addEventListener("click",(e)=> {
        if(searchRef && !searchRef.current.contains(e.target)) {
          setOpenAutoComplete(false)
        }
      })
      
      return ()=>removeEventListener("click",click)
      
    },[]) 
    useEffect(()=> {
      const fetchData = async() => {
        try {
        const res = await api.get(`/videos?title=${q}`)
        setVideos(res.data)
        }
        catch (err) {
          console.log(err)
        }
      }
      fetchData()
    },[q])
    const logoutHandler = async() => {
      await api.get("/auth/logout")
      dispatch(logout())
    }
    return (
        <Container>
            <Wrapper>
                <Search ref={searchRef} onClick={()=>setOpenAutoComplete(true)}>
                  { q !==""&&
                    <Close onClick={()=>setQ("")}>X</Close>
                  }
                  {openAutoComplete&&
                    <Box>
                    {videos.map((video,i)=>(
                      <Data key={i} onClick={()=>
                        setQ(video.title)
                  
                      }
                        >
                          <Image src='/search.svg'/>
                          <Label>{video.title}</Label>
                        </Data>
                    ))}
                  </Box>
                  }
                  
                <Input
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}            />
            <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)} style={{cursor:'pointer'}}/>
                </Search>
                {currentUser ? (
            <User>
              <Button onClick={logoutHandler}>Log Out</Button>
              <VideoCallOutlinedIcon style={{cursor:'pointer'}} onClick={() => setOpen(true)} />
              <Avatar src={currentUser?.img?currentUser?.img:"/person.png"} />
              {currentUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
            </Wrapper>
            {open && <Upload setOpen={setOpen} />}
        </Container>
    )
}


export default Navbar;