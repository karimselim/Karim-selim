import styled from 'styled-components';

export const LoaderContainer = styled.div`
  background-color: black;
  color: white;
  padding: 0;
  margin: 0;
  box-sizing: content-box;
  font-family: 'Aeonik', sans-serif;
  font-weight: normal;
  position: absolute;
  top: 0;
  left: 0;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Link = styled.a`
  color: #000;
  text-decoration: none;
  font-weight: 700;
`;

export const Heading = styled.h2`
  font-family: SaolDisplay;
  text-transform: uppercase;
  color: #ffe9db;
`;

export const Contain = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: black;
`;

export const Reveal = styled.div`
  display: flex;
  font-size: 3.5rem;
  max-width: 50rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Header = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 0;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.a`
  font-size: 2.25em;
  text-decoration: none;
`;

export const Loadings = styled.div`
  background-color: #a20021;
  height: 100vh;
  width: 100vw;
  position: absolute;
  color: white;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  overflow: hidden;
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background-color: white;
  width: 250px;
  height: 35px;
  display: flex;
`;

export const Loader1 = styled.div`
  position: relative;
  background-color: black;
  width: 170px;
`;

export const Loader2 = styled.div`
  position: relative;
  background-color: black;
  width: 80px;
`;

export const Counter = styled.div`
  position: fixed;
  bottom: 0;
  left: 1%;
  color: white;
  display: flex;
  height: 130px;
  border: none;
  overflow: hidden;
  align-items: flex-end;
`;

export const Counter1 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 130px;
  position: relative;
  box-sizing: content-box;
  align-items: center;
  justify-content: space-between;
`;

export const Counter2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 130px;
  position: relative;
  box-sizing: content-box;
  align-items: center;
  justify-content: space-between;
`;

export const Counter3 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 130px;
  position: relative;
  box-sizing: content-box;
  align-items: center;
  justify-content: space-between;
`;

export const Number = styled.span`
  font-size: 8em;
  -webkit-text-stroke: 3px white;
  max-height: 130px;
`;
