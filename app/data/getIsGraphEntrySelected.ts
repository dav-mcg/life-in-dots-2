import type GraphEntry from './GraphEntry';
import type Selection from './Selection';

type Input = {
  graphEntry: GraphEntry,
  selection: Selection | null,
};

const getIsGraphEntrySelected = ({
  selection,
  graphEntry,
}: Input) => {
  return  !!selection
    && graphEntry.weekNumber >= Math.min(selection.startWeek, selection.endWeek)
    && graphEntry.weekNumber <= Math.max(selection.startWeek, selection.endWeek);

};

export default getIsGraphEntrySelected;
