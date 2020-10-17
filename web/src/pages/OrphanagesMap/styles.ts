import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageMap = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;

  .map-popup .leaflet-popup-content-wrapper {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 28px;
    box-shadow: none;
  }

  .map-popup .leaflet-popup-content {
    color: #0089a5;
    font-size: 20px;
    font-weight: bold;
    margin: 8px 12px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      width: 40px;
      height: 40px;
      background-color: #15c3d6;
      box-shadow: 17.2868px 27.6589px 41.4884 rgba(23, 142, 166, 0.16);
      border-radius: 12px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .map-popup .leaflet-popup-tip-container {
    display: none;
  }

  aside {
    background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
    width: 440px;
    padding: 80px;
    /* z-index: 9; */

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    h2 {
      font-size: 42px;
      font-weight: 800;
      line-height: 42px;
      margin-top: 84px;
    }

    p {
      line-height: 28px;
      margin-top: 24px;
    }

    footer {
      display: flex;
      flex-direction: column;
      line-height: 24px;
      align-self: stretch;
    }
  }
`;

export const CreateOrphanage = styled(Link)`
  position: absolute;
  right: 48px;
  bottom: 48px;
  z-index: 999;

  width: 64px;
  height: 64px;
  background-color: #15c3d6;
  border-radius: 28px;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.4s;

  &&:hover {
    background-color: #17d6eb;
  }
`;

export const Marker = styled.image`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  /* &:hover {
    z-index: 1;
  } */
`;
