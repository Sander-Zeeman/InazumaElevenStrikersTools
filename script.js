import cRenderer from "./src/renderer.js"
import cLoader from "./src/loader.js"
import cRandomizer from "./src/randomizer.js"

const cContainer = document.getElementById("main-selection-container")
if (!cContainer) {
  throw new Error("No main container")
}

const cDatasetSelection = document.getElementById("main-config-datasets")
if (!cDatasetSelection) {
  throw new Error("No dataset selection widget")
}

const cRandomizeButton = document.getElementById("main-config-button")
if (!cRandomizeButton) {
  throw new Error("No randomize button widget")
}

const RANDOMIZE_TIME = 2000

function setEnabledStateOfAllInputs(iState) {
  cRandomizeButton.disabled = !iState
  cDatasetSelection.disabled = !iState
}

function fillDatasetOptions() {
  while (cDatasetSelection.firstChild) {
    cDatasetSelection.removeChild(cDatasetSelection.lastChild)
  }

  const cFileNames = [
    "Inazuma Eleven Strikers",
    "Inazuma Eleven GO Strikers 2013 Xtreme"
  ]
  for (let lFileName of cFileNames) {
    let lOption = document.createElement("option")
    let lInnerText = document.createTextNode(lFileName)
    lOption.appendChild(lInnerText)
    lOption.value = ".\\assets\\datasets\\" + lFileName + ".json"
    cDatasetSelection.appendChild(lOption)
  }
}

function main() {
  setEnabledStateOfAllInputs(false)
  cRenderer.render(cContainer)

  const lStartTime = Date.now()

  const lSelectedDataset = cDatasetSelection.selectedOptions[0].value
  if (!lSelectedDataset) {
    throw new Error("No dataset selected")
  }

  cLoader.load(lSelectedDataset, "Position").then(lData => {
    const lSelectedTeam = cRandomizer.choose(lData, {
      GK: 2,
      DF: 5,
      MF: 4,
      FW: 5
    })

    setTimeout(function() {
      cRenderer.render(cContainer, lSelectedTeam)
      setEnabledStateOfAllInputs(true)
    }, RANDOMIZE_TIME - (Date.now() - lStartTime))
  }).catch(err => {
    cRenderer.render(cContainer, [])
    setEnabledStateOfAllInputs(true)
  })
}

cRenderer.render(cContainer, [])

fillDatasetOptions()

cRandomizeButton.addEventListener("click", main)
