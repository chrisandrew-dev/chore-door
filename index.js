// File paths in use
let door1Path
let door2Path
let door3Path

const closedPath = "images/closed_door.svg"
const botPath    = "images/robot.svg"
const beachPath  = "images/beach.svg"
const spacePath  = "images/space.svg"

// Selectors
const startBtn = document.getElementById("start-button")
const instructionsContainer = document.getElementById("instructions-container")
const doorsContainer = document.getElementById("doors-container")
const messageContainer = document.getElementById("message-container")
const streakContainer = document.querySelector("span")

// State
let closedDoorCount = 3
let streak = 0

// On-load events
startBtn.addEventListener("click", startGame, {once: true})

// Game functions
function startGame() {
  startBtn.innerText = "Good luck!"
  doorsContainer.addEventListener("click", openDoor)
  setDoorPaths()
}

function setDoorPaths() {
  const choreDoor = Math.floor(Math.random() * 3)
  
  switch(choreDoor) {
    case 0:
      door1Path = botPath
      door2Path = beachPath
      door3Path = spacePath
      break
    case 1:
      door1Path = beachPath
      door2Path = spacePath
      door3Path = botPath
      break
    case 2:
      door1Path = spacePath
      door2Path = botPath
      door3Path = beachPath
  }
}

function openDoor(e) {
  const doorId = e.target.id
  const isClosed = e.target.src.includes(closedPath)
  
  if (doorId && isClosed) {
    switch(doorId) {
      case "door-1":
        e.target.src = door1Path
        break
      case "door-2":
        e.target.src = door2Path
        break
      case "door-3":
        e.target.src = door3Path
    }
    closedDoorCount -= 1
    if (e.target.src.includes(botPath)) endGame()
  }
}

function endGame() {
  doorsContainer.removeEventListener("click", openDoor)

  let message, prompt, color
  
  if (closedDoorCount) {
    streak = 0
    prompt = "You lose! Try again?"
    color = "var(--clr-btn-lose)"
  } else {
    streak += 1
    prompt = "You win! Score a streak?"
    color = "var(--clr-btn-win)"
  }
  
  streakContainer.innerText = streak.toString()
  startBtn.style.transition = "all 1s"
  startBtn.style.backgroundColor = color
  startBtn.innerText = prompt
  startBtn.addEventListener("click", resetGame, {once: true})
}

function resetGame() {
  const doors = doorsContainer.querySelectorAll("img")
  doors.forEach(door => door.src = closedPath)
  closedDoorCount = 3
  startBtn.style.backgroundColor = ""
  startBtn.innerText = "Start"
  startBtn.addEventListener("click", startGame, { once: true })
}