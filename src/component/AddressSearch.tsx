import { useState } from 'react';
import styled from 'styled-components';

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

        setPostcode(data.zonecode);
        setRoadAddress(roadAddr);
        setJibunAddress(data.jibunAddress);
      },
    }).open();
  };

  return (
    <div>
      <Input type="text" id="sample4_postcode" placeholder="우편번호" value={postcode} readOnly />
      <Button onClick={handleDaumPostcode}>주소 검색</Button>
      <br />
      <Input type="text" id="sample4_roadAddress" placeholder="도로명주소" value={roadAddress} readOnly />
      <Input type="text" id="sample4_jibunAddress" placeholder="지번주소" value={jibunAddress} readOnly />
    </div>
  );
};

export default AddressSearch;

const Input = styled.input`
  outline: 1px solid black;
  padding: 10px;
  margin-right: 20px;
`;

const Button = styled.button``;
