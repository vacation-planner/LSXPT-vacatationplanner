import styled from 'styled-components';
import LandingBackground from '../../images/LandingPage1.jpg';

// Landing Page
const ContentDiv = styled.div`
    background-image: url(${LandingBackground});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 500px;
    width: 100%;
    margin: 0px;
    padding: 0px;
    margin-top: 61px;
`;

const LandingPageHeader = styled.header`
    box-sizing: border-box;
    text-align: center;
    background-color: rgba(43, 43, 43, 0.322);
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 100px 0%;
    text-shadow: 1px 1px 2px black, 1px 0px 2px black, 0px 1px 2px black, 0 0 8px #333;
    height: 500px;
    color: white;
    font-size: 2.5rem;
`;

const LandingPageH2 = styled.h2`
    font-size: 4.5rem;
    margin-bottom: 10px;
    color: white;
`;

const LandingPageFooter = styled.footer`
    padding-top: 25px;
    font-size: 2.0rem;
    text-decoration: none;
`;

export {
    ContentDiv,
    LandingPageHeader,
    LandingPageH2,
    LandingPageFooter,
};