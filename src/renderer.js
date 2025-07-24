const gPositionToColorMap = {
  "GK": "orange",
  "DF": "green",
  "MF": "blue",
  "FW": "red"
}

function clear_container(iContainer) {
  while (iContainer.firstChild) {
    iContainer.removeChild(iContainer.lastChild)
  }
}

function render_loading_anim(iContainer) {
  const cSpinnerDiv = document.createElement("div")
  cSpinnerDiv.className = "spinner"

  const cWrapperDiv = document.createElement("div")
  cWrapperDiv.className = "spinnerWrapper"

  cWrapperDiv.appendChild(cSpinnerDiv)
  iContainer.appendChild(cWrapperDiv)
}

function create_name_for_card(iName) {
  const cNameSpan = document.createElement("span")
  cNameSpan.className = "main-selection-player-name"
  const cNameText = document.createTextNode(iName)
  cNameSpan.appendChild(cNameText)
  return cNameSpan
}

function create_team_for_card(iTeam) {
  const cTeamSpan = document.createElement("span")
  cTeamSpan.className = "main-selection-player-team"
  const cTeamText = document.createTextNode(iTeam)
  cTeamSpan.appendChild(cTeamText)
  return cTeamSpan
}

function create_position_for_card(iPosition) {
  const cPosSpan = document.createElement("span")
  cPosSpan.className = "main-selection-player-pos"
  cPosSpan.style.color = gPositionToColorMap[iPosition]
  const cPosText = document.createTextNode(iPosition)
  cPosSpan.appendChild(cPosText)
  return cPosSpan
}

function create_number_for_card(iNumber) {
  const cNumberSpan = document.createElement("span")
  cNumberSpan.className = "main-selection-player-number"
  const cNumberText = document.createTextNode(iNumber)
  cNumberSpan.appendChild(cNumberText)
  return cNumberSpan
}

function create_emblem_for_card(iEmblem) {
  const cEmblemImage = document.createElement("img")
  cEmblemImage.className = "main-selection-player-emblem"
  cEmblemImage.src = iEmblem
  return cEmblemImage
}

function create_card_for_player(iPlayer) {
  const cCard = document.createElement("div")
  cCard.className = "main-selection-player"

  cCard.appendChild(create_name_for_card(iPlayer.Name))
  cCard.appendChild(create_team_for_card(iPlayer.Team))
  cCard.appendChild(create_position_for_card(iPlayer.Position))
  cCard.appendChild(create_number_for_card(iPlayer.Number))
  cCard.appendChild(create_emblem_for_card(iPlayer.Emblem))

  return cCard
}

function render_players(iContainer, iPlayers) {
  const requiredKeys = [
    "Name",
    "Team",
    "Number",
    "Position",
    "Emblem"
  ]
  for (const lPlayer of iPlayers) {
    if (!requiredKeys.every(key => lPlayer.hasOwnProperty(key))) {
      console.error("Player missing one or more keys: skipping\n" + JSON.stringify(lPlayer))
      continue
    }

    let cPlayerElement = create_card_for_player(lPlayer)
    iContainer.appendChild(cPlayerElement)
  }
}

function render(iContainer, iPlayers) {
  clear_container(iContainer)

  if (!iPlayers) {
    render_loading_anim(iContainer)
    return
  }

  render_players(iContainer, iPlayers)
}

export default { render }
