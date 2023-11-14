import styled, { css } from 'styled-components';
import { BiTime } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import { GRAY_COLOR } from '../../color/color';
import ViewComments from './ViewComments';
import PostImgs from '../Carousel/PostImgs';
import moment from 'moment';

interface PlannerDetails {
  userId: number;
  plannerDetailId: number;
  date: string;
  placeResponse: PlaceResponse;
  description: string;
  imagesUrl: string[];
}

interface PlaceResponse {
  placeName: string;
  roadAddress: string;
  addressName: string;
  latitude: number;
  longitude: number;
}

export default function PostBox({ data }: { data: PlannerDetails }) {
  const scheduleDate = moment(data.date, 'YYYY-MM-DDTHH:mm:ss').add(9, 'hours').format('YYYY-MM-DD HH:mm');

  return (
    <PostBoxContainer>
      <Postdiv>
        <PostImgs imagesUrl={data.imagesUrl} />

        <PostInfo>
          <PostText>
            <PostInfoTime>
              <Time />
              {scheduleDate}
            </PostInfoTime>
            <PostInfoAddress>
              <Location />
              {data.placeResponse.addressName}
            </PostInfoAddress>
            <PostInfoDescription>{data.description}</PostInfoDescription>
          </PostText>
          <PostBorder></PostBorder>
          <ViewComments plannerDetailId={data.plannerDetailId} />
        </PostInfo>
      </Postdiv>
    </PostBoxContainer>
  );
}

const PostBoxContainer = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Postdiv = styled.div`
  width: 100%;
  display: flex;
`;

const PostInfo = styled.div`
  width: 40%;
  height: 400px;
  background-color: white;
  border-left: 1px solid #d6d6d6;
`;

const PostText = styled.div`
  padding: 15px 10px;
  height: 105px;
  overflow: auto;
`;

const IconStyle = css`
  font-size: 15px;
  padding-right: 5px;
  color: #000;
`;

const Time = styled(BiTime)`
  ${IconStyle}
`;

const Location = styled(GrLocation)`
  ${IconStyle}
`;

const FontStyle = css`
  display: flex;
  align-items: center;
`;

const PostInfoTime = styled.div`
  ${FontStyle}
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const PostInfoAddress = styled.div`
  ${FontStyle}
  font-size: 13px;
  font-weight: 500;
`;

const PostInfoDescription = styled.div`
  ${FontStyle}
  margin-top: 10px;
  font-size: 15px;
  font-weight: 700;

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostBorder = styled.div`
  border: 1px solid ${GRAY_COLOR};
`;
