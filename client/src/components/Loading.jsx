import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
   display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px;
    animation: skeleton 1s ease infinite alternate;
`
const Image = styled.img`
   
    @keyframes skeleton {
  to {
    opacity: 0.5;
  }
}
`;
const Loading = () => {
    return (
      <Container>
        <Image src='/loading.gif'/>
        </Container>
    )
}

export default Loading;