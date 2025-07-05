import { useState } from "react";
import IntroductionPage from "./introduction";
import JackBoard from "./jackboard";
import TitleHeader from "./titleHeader";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { motion } from "framer-motion";

const Container = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 1rem;
  border: 0.1rem solid #a5ada6;

  align-items: center;
  display: block;
  justify-content: center;
`;
const motionStyle = css`
  position: absolute;
  width: 100%;
`;

const JackMain = () => {

    const [isExplain, setIsExplain] = useState(true);
    
    return (
        <>
            <TitleHeader />

            <Container>
                {isExplain
                ? (
                    <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                    >
                        <IntroductionPage setIsExplain={setIsExplain}/>
                    </motion.div>)
                    
                : (
                    <motion.div
                    key="jack"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                    >
                        <JackBoard />
                    </motion.div>)
                }
            </Container>
            
        </>
        
    )
}

export default JackMain;