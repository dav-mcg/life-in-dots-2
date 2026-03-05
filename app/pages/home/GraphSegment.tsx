import { type PointerEventHandler, useCallback, useRef } from 'react';
import styled from 'styled-components';
import type GraphEntry from '~/data/GraphEntry';
import getIsGraphEntrySelected from '~/data/getIsGraphEntrySelected';
import useNeighborInfo from './GraphSegment.useNeighborInfo';
import type ZoomLevel from './ZoomLevel';
import usePosterContext from './usePosterContext';

export const getSizePx = (zoomLevel: ZoomLevel): number => {
  switch(zoomLevel) {
  case 'extra-small':
    return 6;

  case 'small':
    return 8;

  case 'regular':
    return 12;

  case 'large':
    return 16;

  case 'extra large':
    return 22;
  }
};

const Container = styled.div<{
  $value: GraphEntry,
  $isSelected: boolean,
  $isSelecting: boolean,
  $neighborInfo: ReturnType<typeof useNeighborInfo>,
  $zoomLevel: ZoomLevel,
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({$isSelecting}) => $isSelecting && `
    touch-action: none;
  `}
  user-select: none;

  --size: ${({$zoomLevel}) => getSizePx($zoomLevel)}px;

  width: var(--size);
  height: var(--size);
  font-size: var(--size);

  ${({$value}) => $value.isBirthWeek && `
    font-weight: 700;
  `}

  ${({$value}) => !$value.isBirthWeek && `
    font-size: calc(var(--size) * 2);
  `}

  ${({$value}) => $value.hasPassed && !$value.isBirthWeek && `
    color: #222222;
    font-size: calc(var(--size) * 1.5);
  `}
  
  ${({$value}) => $value.hasPassed && $value.isBirthWeek && `
    color: #000000;
  `}

  ${({$value}) =>  !$value.hasPassed  && !$value.isBirthWeek && `
    color: #333333;
  `}

  ${({$value}) =>  !$value.hasPassed  && $value.isBirthWeek && `
    color: #111111;
  `}

  ${({$isSelected}) => $isSelected && `
    background-color: orangered;
  `}

  ${({$isSelected, $neighborInfo}) => $isSelected && $neighborInfo?.topIsSelected === false && `
    border-top: 2px solid black;
  `}

  ${({$isSelected, $neighborInfo}) => $isSelected && $neighborInfo?.leftIsSelected === false && `
    border-left: 2px solid black;
  `}

  ${({$isSelected, $neighborInfo}) => $isSelected && $neighborInfo?.rightIsSelected === false && `
    border-right: 2px solid black;
  `}

  ${({$isSelected, $neighborInfo}) => $isSelected && $neighborInfo?.bottomIsSelected === false && `
    border-bottom: 2px solid black;
  `}
`;

type Props = {
  value: GraphEntry,
};

const GraphSegment = ({
  value,
}: Props) => {
  const {
    isSelecting,
    setValue: setPosterValue,
    value: posterValue,
    zoomLevel,
  } = usePosterContext();

  const selection = posterValue.selection;
  const isSelected = getIsGraphEntrySelected({
    graphEntry: value,
    selection: posterValue.selection,
  });
  const neighborInfo = useNeighborInfo(value);

  const handleSelectionContinue = useCallback(() => {
    if (!isSelecting || !selection) {
      return;
    }

    const newSelection = {
      ...selection,
      endWeek: value.weekNumber,
    };

    setPosterValue({
      ...posterValue,
      selection: newSelection,
    });
  }, [isSelecting, posterValue, selection, setPosterValue, value.weekNumber]);

  const handleSelectionStart = useCallback(() => {
    if (!isSelecting) {
      return;
    }

    const newSelection = {
      endWeek: value.weekNumber,
      startWeek: value.weekNumber,
    };

    setPosterValue({
      ...posterValue,
      selection: newSelection,
    });
  }, [isSelecting, posterValue, setPosterValue, value.weekNumber]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = useCallback((event) => {
    containerRef?.current?.releasePointerCapture(event.pointerId);

    handleSelectionStart();
  }, [handleSelectionStart]);

  const renderValue = () => {
    if (value.isBirthWeek) {
      return String(value.age);
    }

    if (value.hasPassed) {
      return '×';
    }

    return '∙';
  };

  return (
    <Container
      $isSelected={isSelected}
      $isSelecting={isSelecting}
      $neighborInfo={neighborInfo}
      $zoomLevel={zoomLevel}
      $value={value}
      onPointerMove={handleSelectionContinue}
      onPointerDown={handlePointerDown}
      ref={containerRef}
    >
      {renderValue()}
    </Container>
  );
};

export default GraphSegment;
