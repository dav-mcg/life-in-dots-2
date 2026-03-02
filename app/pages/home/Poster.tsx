import styled from 'styled-components';
import type PosterData from '~/data/PosterData';
import useFeatureFlag from '~/utils/featureFlags/useFeatureFlag';
import Graph from './Graph';
import type ZoomLevel from './ZoomLevel';

const getMaxWidthPx = (zoomLevel: ZoomLevel) : number => {
  switch(zoomLevel) {
  case 'extra-small':
    return 600;

  case 'small':
    return 800;

  case 'regular':
    return 1000;

  case 'large':
    return 1250;

  case 'extra large':
    return 1750;
  }
};

const Container = styled.div<{
  $zoomLevel: ZoomLevel;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  width: 100%;
  max-width: ${({$zoomLevel}) => getMaxWidthPx($zoomLevel)}px;

  background-color: #4d007f;
  color: white;
  padding: 8px;
  padding-top: 16px;
  border-radius: 32px;
`;

const Birthday = styled.div`
  font-size: 16px;
  line-height: 16px;

  margin-top: -8px
`;

const Name = styled.div`
  font-size: 40px;
  line-height: 40px;
`;

type Props = {
  isSelecting: boolean;
  onChange: (newValue: PosterData) => void;
  onChangeIsSelecting: (newIsSelecting: boolean) => void;
  value: PosterData;
  zoomLevel: ZoomLevel,
};

const Poster = ({
  isSelecting,
  onChange,
  onChangeIsSelecting,
  value,
  zoomLevel,
}: Props) => {
  const isShowingBirthdayDayOfWeek = useFeatureFlag('Show Birthday Day Of Week');
  const isShowingSparkles = useFeatureFlag('Sparkles');

  return (
    <Container
      $zoomLevel={zoomLevel}
    >
      <Name>{isShowingSparkles && '✨'}{value.name}{isShowingSparkles && '✨'}</Name>
      <Birthday>{value.birthday.format(`${isShowingBirthdayDayOfWeek ? 'dddd ':''}D MMMM YYYY`)}</Birthday>
      <Graph
        isSelecting={isSelecting}
        onChange={onChange}
        onChangeIsSelecting={onChangeIsSelecting}
        value={value}
        zoomLevel={zoomLevel}
      />
    </Container>
  );
};

export default Poster;
