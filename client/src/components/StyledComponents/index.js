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
`;

export {
    ContentDiv,
};