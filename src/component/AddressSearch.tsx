import { useState } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    daum: any;
  }
}

const AddressSearch = () => {
  const [postcode, setPostcode] = useState<string>('');
  const [roadAddress, setRoadAddress] = useState<string>('');
  const [jibunAddress, setJibunAddress] = useState<string>('');

  const handleDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const roadAddr = data.roadAddress;
        const extraRoadAddr = data.bname && /[동|로|가]$/g.test(data.bname) ? data.bname : '';
        const buildingName = data.buildingName && data.apartment === 'Y' ? (extraRoadAddr !== '' ? `, ${data.buildingName}` : data.buildingName) : '';
        const expRoadAddr = roadAddr + buildingName;

        setPostcode(data.zonecode);
        setRoadAddress(roadAddr);
        setJibunAddress(data.jibunAddress);

      },
    }).open();
  };

  return (
    <div>
      <Input type="text" id="sample4_postcode" placeholder="우편번호" value={postcode} readOnly />
      <Button onClick={handleDaumPostcode}>우편번호찾기</Button><br />
      <Input type="text" id="sample4_roadAddress" placeholder="도로명주소" value={roadAddress} readOnly />
      <Input style={{marginRight: '0px'}} type="text" id="sample4_jibunAddress" placeholder="지번주소" value={jibunAddress} readOnly />
      <span id="guide" style={{ color: '#999', display: 'none' }}></span>
    </div>
  );
}

export default AddressSearch

const Input = styled.input`
  outline: 1px solid black;
  padding: 10px;
  margin-right: 20px;
`

const Button = styled.button`
  
`