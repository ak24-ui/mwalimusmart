// Toggle Password
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);

        input.type = input.type === "password" ? "text" : "password";
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    console.log("Dashboard Loaded");

    // Handle Action Buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.querySelector('span').innerText;
            alert("Opening: " + action);
            // Later we will redirect to specific pages like andalio.html
        });
    });
});

// ===== AUTO CURRENT MONTH CALENDAR =====

const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (calendarGrid) {

    // Always start with the real current date
    let currentDate = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const prevLastDate = new Date(year, month, 0).getDate();

        monthYear.textContent = date.toLocaleString("default", {
            month: "long",
            year: "numeric"
        });

        calendarGrid.innerHTML = "";

        // Previous month overflow
        for (let x = firstDay; x > 0; x--) {
            const div = document.createElement("div");
            div.textContent = prevLastDate - x + 1;
            div.classList.add("other-month");
            calendarGrid.appendChild(div);
        }

        // Current month days
        for (let i = 1; i <= lastDate; i++) {
            const div = document.createElement("div");
            div.textContent = i;

            const today = new Date();

            // Highlight TODAY dynamically
            if (
                i === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                div.classList.add("today");
            }

            calendarGrid.appendChild(div);
        }

        // Fill next month overflow
        const totalCells = calendarGrid.children.length;
        const remaining = 42 - totalCells;

        for (let j = 1; j <= remaining; j++) {
            const div = document.createElement("div");
            div.textContent = j;
            div.classList.add("other-month");
            calendarGrid.appendChild(div);
        }
    }

    // Navigation buttons
    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Render calendar on load with real current date
    renderCalendar(new Date());

    // OPTIONAL: Auto refresh at midnight to switch month
    setInterval(() => {
        const now = new Date();
        if (
            now.getMonth() !== currentDate.getMonth() ||
            now.getFullYear() !== currentDate.getFullYear()
        ) {
            currentDate = new Date();
            renderCalendar(currentDate);
        }
    }, 60 * 1000); // check every minute
}