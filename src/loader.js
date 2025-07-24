const gObjToJSONMap = {
  "Number": "index",
  "Team": "team",
  "Position": "position",
  "Name": "name"
}

function load(iPath, iGroupBy) {
  console.log("Loading " + iPath)
  return fetch("..\\" + iPath)
    .then(lResponse => lResponse.json())
    .then(lData => {
      console.log(lData)
      let lMap = {}
      for (let iPlayer of lData.players) {
        let lKey = iPlayer[gObjToJSONMap[iGroupBy]]
        if (!lMap.hasOwnProperty(lKey)) {
          lMap[lKey] = []
        }
        lMap[lKey].push({
          Name: iPlayer.name,
          Team: iPlayer.team,
          Position: iPlayer.position,
          Number: iPlayer.index,
          Emblem: "./assets/images/" + iPlayer.team.replaceAll(" ", "_") + ".png"
        })
      }
      return lMap
    })
}

export default { load }
