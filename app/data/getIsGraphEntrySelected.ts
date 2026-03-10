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
  if (!selection) {
    return false;
  }

  const result = graphEntry.weekNumber >= Math.min(selection.startWeek, selection.endWeek)
    && graphEntry.weekNumber <= Math.max(selection.startWeek, selection.endWeek);

  return result;
};

export default getIsGraphEntrySelected;
