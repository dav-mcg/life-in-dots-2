import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import type GraphEntry from '~/data/GraphEntry';
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
    isSelecting,
    setValue,
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

  const renderGraphSegment = (entry: GraphEntry) => {
    const selection = value.selection;
    const isSelected = !!selection
          && entry.weekNumber >= Math.min(selection.startWeek, selection.endWeek)
          && entry.weekNumber <= Math.max(selection.startWeek, selection.endWeek);

    const handleSelectionContinue = () => {
      if (!isSelecting || !selection) {
        return;
      }

      const newSelection = {
        ...selection,
        endWeek: entry.weekNumber,
      };

      setValue({
        ...value,
        selection: newSelection,
      });
    };

    const handleSelectionStart = () => {
      if (!isSelecting) {
        return;
      }

      const newSelection = {
        endWeek: entry.weekNumber,
        startWeek: entry.weekNumber,
      };

      setValue({
        ...value,
        selection: newSelection,
      });
    };

    return (
      <GraphSegment
        isSelected={isSelected}
        isSelecting={isSelecting}
        onSelectionContinue={handleSelectionContinue}
        onSelectionStart={handleSelectionStart}
        key={entry.weekNumber}
        value={entry}
        zoomLevel={zoomLevel}
      />
    );
  };

  return (
    <Container
      $zoomLevel={zoomLevel}
    >
      {
        value.graphData.map(renderGraphSegment)
      }
    </Container>
  );
};

export default Graph;
