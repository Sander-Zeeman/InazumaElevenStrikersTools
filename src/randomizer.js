function shuffle(iArray) {
  let lCurrent = iArray.length;
  while (lCurrent != 0) {
    let lRandom = Math.floor(Math.random() * lCurrent);
    lCurrent--;
    [
      iArray[lCurrent], iArray[lRandom]
    ] = [
      iArray[lRandom], iArray[lCurrent]
    ];
  }
}

function choose(iData, iDistribution) {
  let lGKs = iData.GK
  let lDFs = iData.DF
  let lMFs = iData.MF
  let lFWs = iData.FW

  shuffle(lGKs)
  shuffle(lDFs)
  shuffle(lMFs)
  shuffle(lFWs)

  let lSelection = lGKs.slice(0, iDistribution.GK).concat(
    lDFs.slice(0, iDistribution.DF),
    lMFs.slice(0, iDistribution.MF),
    lFWs.slice(0, iDistribution.FW)
  )
  shuffle(lSelection)
  return lSelection
}

export default { choose }
