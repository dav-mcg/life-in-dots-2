import { useState } from 'react';
import styled from 'styled-components';
import usePosterData from '~/data/usePosterData';
import Poster from './Poster';
import Controls from './Controls';
import useZoomLevel from '~/data/useZoomLevel';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Page = () => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [numberOfDisplayedColumns, setNumberOfDisplayedColumns] = useState<number | null>(null);
  const [posterData, setPosterData] = usePosterData();
  const [zoomLevel, setZoomLevel] = useZoomLevel();

  return (
    <Container>
      <Poster
        isSelecting={isSelecting}
        numberOfDisplayedColumns={numberOfDisplayedColumns}
        onChange={setPosterData}
        onChangeNumberOfDisplayedColumns={setNumberOfDisplayedColumns}
        onChangeIsSelecting={setIsSelecting}
        value={posterData}
        zoomLevel={zoomLevel}
      />
      <Controls
        isSelecting={isSelecting}
        onChangeIsSelecting={setIsSelecting}
        onChangeZoomLevel={setZoomLevel}
        onUpdatePosterData={setPosterData}
        posterData={posterData}
        zoomLevel={zoomLevel}
      />
    </Container>
  );
};

export default Page;
