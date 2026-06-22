// Get all the needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const attendeeCountEl = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greetingEl = document.getElementById("greeting");

// Track attendance
let count = 0;
const maxCount = 50;

let waterCount = 0;
let zeroCount = 0;
let powerCount = 0;

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  // Increment total count
  count++;

  // Update attendee number
  attendeeCountEl.textContent = count;

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";

  // Update team count
  if (team === "water") waterCount++;
  if (team === "zero") zeroCount++;
  if (team === "power") powerCount++;

  document.getElementById("waterCount").textContent = waterCount;
  document.getElementById("zeroCount").textContent = zeroCount;
  document.getElementById("powerCount").textContent = powerCount;

  // Show welcome message
  if (count < maxCount) {
    greetingEl.textContent = `👋 Welcome ${name}! You joined ${teamName}.`;
  }

  // Keeping Track of Goals
  if (count >= maxCount) {
    let winner = "Team Water Wise";
    let highest = waterCount;

    if (zeroCount > highest) {
      highest = zeroCount;
      winner = "Team Net Zero";
    }

    if (powerCount > highest) {
      highest = powerCount;
      winner = "Team Renewables";
    }

    greetingEl.style.display = "block";
    greetingEl.textContent = `🎉 Goal reached! ${winner} wins with ${highest} attendees!`;

    form.querySelector("button").disabled = true;
  }

  // Reset form
  form.reset();
});