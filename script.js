const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");

const questionPage = document.getElementById("questionPage");
const meetingPage = document.getElementById("meetingPage");
const noMessage = document.getElementById("noMessage");

const submitPlan = document.getElementById("submitPlan");
const finalMessage = document.getElementById("finalMessage");

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderPlan(data) {
  const date = data.date;
  const time = data.time;
  const place = data.place.trim();
  const plan = data.plan.trim();

  const dateObject = new Date(date + "T00:00:00");
  const formattedDate = dateObject.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const timeObject = new Date("1970-01-01T" + time);
  const formattedTime = timeObject.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit"
  });

  finalMessage.style.display = "block";
  finalMessage.textContent = "";

  const title = document.createElement("div");
  title.textContent = "💕 It's a date! 💕";

  const details = document.createElement("div");
  details.innerHTML =
    "<br>📅 <strong>" + escapeHTML(formattedDate) + "</strong>" +
    "<br>⏰ <strong>" + escapeHTML(formattedTime) + "</strong>" +
    "<br>📍 <strong>" + escapeHTML(place) + "</strong>" +
    "<br><br>💭 <strong>Our plan:</strong><br>" +
    escapeHTML(plan).replace(/\n/g, "<br>") +
    "<br><br>Can't wait! 🥰❤️";

  finalMessage.appendChild(title);
  finalMessage.appendChild(details);

  finalMessage.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

async function submitPlanToApi(payload) {
  const response = await fetch("/api/plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result;
}

yesButton.addEventListener("click", function () {
  questionPage.classList.add("hidden");
  meetingPage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

noButton.addEventListener("click", function () {
  noMessage.classList.remove("hidden");
});

submitPlan.addEventListener("click", async function () {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const place = document.getElementById("place").value.trim();
  const plan = document.getElementById("plan").value.trim();

  if (!date || !time || !place || !plan) {
    alert("Please fill in all the details first ❤️");
    return;
  }

  const payload = { date, time, place, plan };

  try {
    const apiResult = await submitPlanToApi(payload);
    renderPlan(apiResult.data || payload);
  } catch (error) {
    console.error(error);
    renderPlan(payload);
  }
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (4 + Math.random() * 4) + "s";
  heart.style.fontSize = (15 + Math.random() * 25) + "px";
  document.body.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, 8000);
}

setInterval(createHeart, 500);
