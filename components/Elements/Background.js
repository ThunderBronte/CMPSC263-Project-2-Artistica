import { styled } from 'styled-components'
import React, { useState, useEffect } from 'react'



const Background = () => {

  return (
    <>
      <Page>
        <ContentContainer>
        </ContentContainer>
      </Page>
    </>
  )
};


const Page = styled.div`
  background-color: #DFDFDF;
  padding: 20px;
  padding-left: 10%;
  padding-right: 10%;
`;

const ContentContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  color: #25283D;
  
`;


export default Background;