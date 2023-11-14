import styled from 'styled-components';

function Footer() {
  return (
    <footer>
      <FooterContainer>
        <LogoWrap>
          <LogoImg src="/img/footer_logo.png" />
        </LogoWrap>
        <DescriptionContainer>
          <CompanyTitle>
            COMPANY
            <CompanyDescription>
              <DescriptionSpan>(주)사조사조</DescriptionSpan>
              <DescriptionSpan>FE:이승현 박진 정동영</DescriptionSpan>
              <DescriptionSpan> BF:김동욱 안재훈 이수정</DescriptionSpan>
              <DescriptionSpan>사업자번호 : 202-30-90603</DescriptionSpan>
            </CompanyDescription>
          </CompanyTitle>
          <EtcTitle>
            ETC
            <EtcDescription>
              <DescriptionSpan>공지사항</DescriptionSpan>
              <DescriptionSpan>이용약관</DescriptionSpan>
              <DescriptionSpan>개인정보처리방침</DescriptionSpan>
              <DescriptionSpan>FAQ</DescriptionSpan>
              <DescriptionSpan>환불규정</DescriptionSpan>
              <DescriptionSpan>채용</DescriptionSpan>
            </EtcDescription>
          </EtcTitle>
          <ContactTitle>
            CONTACT
            <ContactDescription>
              <DescriptionSpan>고객센터 : 02-023-0906</DescriptionSpan>
              <DescriptionSpan>오전 11시~ 저녁 6시까지 운영</DescriptionSpan>
              <DescriptionSpan>주말 및 공휴일, 점심시간 (12:00~13:00) 제외</DescriptionSpan>
            </ContactDescription>
          </ContactTitle>
        </DescriptionContainer>
      </FooterContainer>
    </footer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  background-color: #2a2929;
  color: white;
  display: flex;
  flex-direction: column;
`;

const LogoWrap = styled.div`
  margin-top: 50px;
  margin-left: 8%;
  @media (max-width: 1000px) {
    margin-left: 16%;
  }
  @media (max-width: 910px) {
    margin-left: 14%;
  }
  @media (max-width: 780px) {
    margin-left: 18%;
  }
  @media (max-width: 620px) {
    margin-left: 16%;
  }
  @media (max-width: 430px) {
    margin-top: 24px;
    margin-left: 10%;
  }
`;

const LogoImg = styled.img`
  height: 120px;
  @media (max-width: 1150px) {
    height: 110px;
  }
  @media (max-width: 1000px) {
    height: 100px;
  }
  @media (max-width: 780px) {
    height: 74px;
  }
  @media (max-width: 430px) {
    height: 52px;
  }
`;

const DescriptionContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
  margin-top: 40px;
  @media (max-width: 1150px) {
    margin-top: 30px;
  }
  @media (max-width: 1000px) {
    margin-top: 20px;
    padding-bottom: 24px;
    justify-content: space-evenly;
  }
  @media (max-width: 780px) {
    margin-top: 4px;
    padding-bottom: 18px;
  }
  @media (max-width: 430px) {
    width: 100%;
  }
`;

const CompanyTitle = styled.div`
  font-size: 30px;
  @media (max-width: 1150px) {
    font-size: 28px;
  }
  @media (max-width: 1000px) {
    font-size: 24px;
  }
  @media (max-width: 780px) {
    font-size: 18px;
  }
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const CompanyDescription = styled.div`
  font-size: 14px;
  margin-top: 20px;
  @media (max-width: 1150px) {
    margin-top: 18px;
  }
  @media (max-width: 1000px) {
    margin-top: 6px;
    font-size: 12px;
  }
  @media (max-width: 780px) {
    font-size: 8px;
  }
  @media (max-width: 430px) {
    font-size: 6px;
  }
`;

const EtcTitle = styled.div`
  font-size: 30px;
  @media (max-width: 1150px) {
    font-size: 28px;
  }
  @media (max-width: 1000px) {
    font-size: 24px;
  }
  @media (max-width: 780px) {
    font-size: 18px;
  }
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const EtcDescription = styled.div`
  font-size: 14px;
  margin-top: 20px;
  @media (max-width: 1150px) {
    margin-top: 18px;
  }
  @media (max-width: 1000px) {
    margin-top: 6px;
    font-size: 12px;
  }
  @media (max-width: 780px) {
    font-size: 8px;
  }
  @media (max-width: 430px) {
    font-size: 6px;
  }
`;

const DescriptionSpan = styled.span`
  display: block;
  width: 100%;
`;

const ContactTitle = styled.div`
  font-size: 30px;
  @media (max-width: 1150px) {
    font-size: 28px;
  }
  @media (max-width: 1000px) {
    font-size: 24px;
  }
  @media (max-width: 780px) {
    font-size: 18px;
  }
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const ContactDescription = styled.div`
  font-size: 14px;
  margin-top: 20px;
  @media (max-width: 1150px) {
    margin-top: 18px;
  }
  @media (max-width: 1000px) {
    margin-top: 6px;
    font-size: 12px;
  }
  @media (max-width: 780px) {
    font-size: 8px;
  }
  @media (max-width: 430px) {
    font-size: 6px;
  }
`;
