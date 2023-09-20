import styled from 'styled-components';

export default function LookMap() {
  return (
    <Container>
      <Map src="img/pngwing.com.png" alt="커밍순" />
      <MapText>
        현재 <BoldSpan>컨텐츠가 준비중</BoldSpan>입니다. <br />
        <SmallSpan>빠른 시일내에 찾아뵙겠습니다.</SmallSpan>
      </MapText>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const Map = styled.img`
  max-width: 100%;
  height: auto;
  padding: 0 50px 50px;
`;

const MapText = styled.p`
  text-align: center;
  font-size: 45px;
  line-height: 1.2;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const SmallSpan = styled.span`
  font-size: 25px;
`;
