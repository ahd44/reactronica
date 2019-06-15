export function buildSteps(clip, subdivision = 16, notesPerBar = 4) {
  const { bars, notes } = clip;
  const totalSteps = bars * subdivision;
  const emptyArray = [...new Array(totalSteps)].fill(null);

  const steps = emptyArray.map((_, i) => {
    const barKey = Math.ceil((i + 1) / subdivision);
    const noteKey =
      Math.ceil((i + 1) / notesPerBar) % notesPerBar || notesPerBar;
    const sixteenthsKey = (i % notesPerBar) + 1;
    const timeKey = `${barKey}.${noteKey}.${sixteenthsKey}`;
    // console.log(timeKey);

    const result = notes.filter((note) => {
      return note.start === timeKey;
    });

    if (result.length === 0) {
      return null;
    } else if (result.length === 1) {
      return result;
    }

    return result;
  });

  return steps;
}
