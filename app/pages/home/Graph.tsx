import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import GraphSegment, { getSizePx as getGraphSegmentSizePx } from './GraphSegment';
import type ZoomLevel from './ZoomLevel';
import usePosterContext from './usePosterContext';

const Container = styled.div<{
  $zoomLevel: ZoomLevel,
}>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill,  minmax(${({$zoomLevel}) => getGraphSegmentSizePx($zoomLevel)}px, 1fr));
  
  background-color: white;
  padding: 12px;

  --extra-side-padding: calc(
    100%
    - round(down, 100% - 12px*2, ${({$zoomLevel}) => getGraphSegmentSizePx($zoomLevel)}px)
  );

  padding-left: calc(var(--extra-side-padding) / 2);
  padding-right: calc(var(--extra-side-padding) / 2);

  border-radius: 24px;
`;

const Graph = () => {
  const {
    setIsSelecting,
    value,
    zoomLevel,
  } = usePosterContext();

  const handleSelectionEnd = useCallback(() => {
    setIsSelecting(false);
  }, [setIsSelecting]);

  useEffect(() => {
    document.addEventListener('pointerup', handleSelectionEnd);

    return () => document.removeEventListener('pointerup', handleSelectionEnd);
  }, [handleSelectionEnd]);

  return (
    <Container
      $zoomLevel={zoomLevel}
    >
      {
        value.graphData.map((entry) => {
          return (
            <GraphSegment
              key={entry.weekNumber}
              value={entry}
            />
          );
        })
      }
    </Container>
  );
};

export default Graph;
