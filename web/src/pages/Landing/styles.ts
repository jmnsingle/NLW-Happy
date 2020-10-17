import styled from 'styled-components';
import { Link } from 'react-router-dom';

import landing from '../../assets/images/landing.svg';

export const PageLanding = styled.div`
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentWhraper = styled.div.attrs(() => {
  "url('../../assets/images/landing.svg') no-repeat 80% center";
})`
  position: relative;

  width: 100%;
  max-width: 1100px;
  height: 100%;
  max-height: 680px;
  background: url(${landing}) no-repeat 80% center;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;

  main {
    max-width: 350px;
  }

  main h1 {
    font-size: 76px;
    font-weight: 900;
    line-height: 70px;
  }

  main p {
    margin-top: 40px;
    font-size: 24px;
    line-height: 34px;
  }
`;

export const Location = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  font-size: 24px;
  line-height: 34px;
  text-align: right;

  display: flex;
  flex-direction: column;

  strong {
    font-weight: 800;
  }
`;

export const EnterApp = styled(Link)`
  position: absolute;
  right: 0;
  bottom: 0;

  width: 88px;
  height: 88px;
  background-color: #ffd666;
  border-radius: 30px;
  transition: background-color 0.4s;

  display: flex;
  align-items: center;
  justify-content: center;

  &&:hover {
    background-color: #96feff;
  }
`;
