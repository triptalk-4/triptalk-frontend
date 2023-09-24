import styled from 'styled-components';

function Footer() {
  return (
    <footer>
      <FooterContainer>
        <LogoImg src="img/footer_logo.png" />
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
  width: 100%;
  height: 442px;
  background-color: #2a2929;
  color: white;
  padding-left: 100px;
`;

const LogoImg = styled.img`
  margin-top: 80px;
  width: 300px;
  height: 70px;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
`;

const CompanyTitle = styled.div`
  font-size: 25px;
  margin: 30px 120px 0 0;
`;

const CompanyDescription = styled.div`
  font-size: 16px;
  margin-top: 20px;
`;

const EtcTitle = styled.div`
  font-size: 25px;
  margin: 30px 120px 0 0;
`;

const EtcDescription = styled.div`
  font-size: 16px;
  margin-top: 20px;
`;

const DescriptionSpan = styled.span`
  display: block;
  width: 100%;
`;

const ContactTitle = styled.div`
  font-size: 25px;
  margin-top: 30px;
`;

const ContactDescription = styled.div`
  font-size: 16px;
  margin-top: 20px;
`;
