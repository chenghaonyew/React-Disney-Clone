import React from "react";
import styled from "styled-components";

const Login = (props) => {
  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="../images/cta-logo-one.svg" alt="" />
          <SignUp>GET ALL THERE</SignUp>
          <Description>
            Get Premier Access to Raya and the Lst Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $1.
          </Description>
          <CTALogoTwo src="../images/cta-logo-two.png" alt="" />
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 10px;
  height: 100%;
`;

const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/images/login-background.jpg");
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  // z-index equal to priority, -1 means low priority. everything added will be on top of the image
  z-index: -1;
`;

const CTA = styled.div`
  max-width: 1050px;
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const CTALogoOne = styled.img`
  margin-bottom: 12px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const SignUp = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.h2`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 20px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  max-width: 1000px;
  display: inline=block;
  vertical-align: bottom;
  min-height: 1px;
  width: 100%;
`;
