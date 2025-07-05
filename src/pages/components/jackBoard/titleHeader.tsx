import styled from "@emotion/styled";


const TitleLogo = styled.div`
    height: 1.5rem;
    background: #d7d9d0

`;

const Logo = styled.div`
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
`;

const TitleHeader = () => {
    return (
        <TitleLogo>
            <Logo>JackBoard</Logo>
        </TitleLogo>
    )
}

export default TitleHeader;