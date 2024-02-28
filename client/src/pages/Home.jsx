import { lazy, useEffect, useState } from "react";
const Card = lazy(()=>import( "../components/Card"))
import styled from "styled-components";
import { api } from "../utils/constant";
//import Loading from "../components/Loading";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Home = ({type}) => {
  const [videos, setVideos] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const fetchVideos = async () => {
      try {
      setLoading(true)
      const res = await api.get(`/videos/${type}`,{withCredentials:true});
      setVideos(res.data);
      setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    };
    fetchVideos();
  }, [type]);
  // if(loading) {
  //   return <Loading/>
  // }
    return(
        (
            <Container>
            {videos?.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
          </Container>
        )
    )
}
export default Home