import React, { lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
const  Card = lazy(()=>import( "../components/Card"));
import { api } from "../utils/constant";
//import Loading from "../components/Loading";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [loading,setLoading] = useState(false)
  const query = useLocation().search;
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      try {
      const res = await api.get(`/videos/search${query}`);
      setVideos(res.data);
      setLoading(false)
      } catch (err) {
        setLoading(false)

      }
    };
    fetchVideos();
  }, [query]);
  // if(loading) {
  //   return <Loading/>
  // }
  return <Container>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
  </Container>;
};

export default Search;