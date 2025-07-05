import styled from "@emotion/styled";

const Button = styled.div`
    display: block;
    width: 5rem;
    line-height: 2.5rem;
    padding: 0;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 15px;
    font-weight: 600;
    text-align: center;
    color: #FFF;
    border-radius: 5px;
    transition: all 0.2s ;
    background: #5DC8CD;
    cursor: pointer;

    &:hover {
        margin-top: 20px;
        margin-bottom: 5px;
    }

    box-shadow: 0px 5px 0px 0px #1E8185;
    &:hover {
        box-shadow: 0px 0px 0px 0px #1E8185;
    }
`;




type Props = {
    setIsExplain: (value: boolean) => void;
};

const IntroductionPage = ({ setIsExplain }: Props) => {


    return (
        <div>
            <h2>규칙 설명</h2>
            <p>대충 규칙 설명입니다.</p>
            <p>어쩌구 저쩌구해서 요로콤 조로콤 잘 해보세요!</p>
            <p>Good luck!</p>

            <Button onClick={() => setIsExplain(false)}> 시작 </Button>
        </div>
    )
}

export default IntroductionPage;