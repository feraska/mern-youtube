import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addComment, fetchFailure, fetchStart, fetchSuccess } from '../redux/commentSlice';
import { api } from '../utils/constant';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;
const CommentButtons = styled.div`
  display: flex;
  gap: 10px;
`
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Comments = ({videoId}) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()

  //const [comments, setComments] = useState([]);
  const {comments} = useSelector((state) => state.comments)
  const dispatch = useDispatch()

  const [open,setOpen]= useState(false)
  const [comment,setComment] = useState({
    "userId":currentUser?._id,
    "videoId":videoId,
    "desc":""
  })
  useEffect(() => {
    const fetchComments = async () => {
      try {
        dispatch(fetchStart())
        const res = await api.get(`/comments/${videoId}`);
        dispatch(fetchSuccess(res.data))
        //setComments(res.data);
      } catch (err) {
        dispatch(fetchFailure())
      }
    };
    fetchComments();
  }, [videoId,dispatch]);
  const handleChange = (e) => {
    setComment((prev)=>({...prev,[e.target.name]:e.target.value}))
    
  }
  const handleClick = () => {
    if(!currentUser) {
      navigate("/signin")
    }
    if(!open) {
      setOpen(true)
    }
    
   
  }
  const handleComment = () => {
    try {
     api.post("/comments",comment,{withCredentials:true})
     dispatch(addComment(comment))
     setComment((prev)=>({...prev,["desc"]:""}))
     setOpen(false)
    } catch (err) {

    }
  }

  //TODO: ADD NEW COMMENT FUNCTIONALITY
 
    return (
        <Container>
        <NewComment onClick={handleClick} >
          <Avatar src={currentUser?.img?currentUser?.img:"/person.png"} />
          <Input placeholder="Add a comment..." name="desc" onChange={handleChange} value={comment.desc}/>
        </NewComment>
        {open&&
          <CommentButtons >
            <Button onClick={handleComment}>Comment</Button>
            <Button onClick={()=>setOpen(false)}>Cancel</Button>
          </CommentButtons>
}

        {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
      </Container>
    )
}



export default Comments;