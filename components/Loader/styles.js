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
  background-color: #120002;
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

export const Haze = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at center, rgba(120, 0, 10, 0.25) 0, rgba(0, 0, 0, 0.85) 85%);
  animation: loaderFlicker 2.36s steps(1) infinite;
  @keyframes loaderFlicker {
    0%, 100% { opacity: 1; }
    41% { opacity: 0.55; }
    43% { opacity: 1; }
    77% { opacity: 0.7; }
    79% { opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Whispers = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 62%;
  text-align: center;
  font-family: presicav, serif;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #b0141e;
  font-size: clamp(0.8rem, 1.6vw, 1.3rem);
  pointer-events: none;
  @media (max-width: 767px) {
    font-size: 1.2rem;
    letter-spacing: 0.2em;
    top: 60%;
  }
  span {
    position: absolute;
    left: 0;
    right: 0;
    opacity: 0;
    animation: whisperIn 1.36s ease-in-out forwards;
    text-shadow: 0 0 14px rgba(176, 20, 30, 0.7);
  }
  span:nth-child(1) { animation-delay: 0.21s; }
  span:nth-child(2) { animation-delay: 1.43s; }
  span:nth-child(3) { animation-delay: 2.64s; }
  @keyframes whisperIn {
    0% { opacity: 0; filter: blur(6px); }
    30%, 70% { opacity: 1; filter: blur(0); }
    100% { opacity: 0; filter: blur(5px); }
  }
`;

export const Number = styled.span`
  font-size: 8em;
  -webkit-text-stroke: 3px #b0141e;
  color: transparent;
  max-height: 130px;
`;
