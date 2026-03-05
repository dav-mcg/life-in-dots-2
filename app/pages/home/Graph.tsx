import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useFeatureFlag from '~/utils/featureFlags/useFeatureFlag';
import useResizeObserver from '~/utils/useResizeObserver';
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
  const isHighlightingOutline = useFeatureFlag('Outline Highlight');
  const {
    setIsSelecting,
    value,
    zoomLevel,
  } = usePosterContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    setNumberOfDisplayedColumns,
  } = usePosterContext();

  const countColumns = useCallback(() => {
    if (!isHighlightingOutline) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const firstGraphEntry = container.getElementsByTagName('div')[0];

    if (!firstGraphEntry) {
      return;
    }

    const containerStyle = getComputedStyle(container);

    const containerWidth = Math.ceil(
      container.clientWidth
      - parseFloat(containerStyle.paddingLeft)
      - parseFloat(containerStyle.paddingRight)
    );
    const graphEntryWidth = firstGraphEntry.clientWidth;
    const newNumberOfColumns = Math.max(
      Math.floor(containerWidth / graphEntryWidth),
      1
    );

    setNumberOfDisplayedColumns(newNumberOfColumns);
  }, [isHighlightingOutline, setNumberOfDisplayedColumns]);

  useEffect(countColumns, [countColumns]);
  useResizeObserver(containerRef, countColumns);

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
      ref={isHighlightingOutline ? containerRef : null}
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
