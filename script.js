document.addEventListener("DOMContentLoaded", function () {
    
    function displayCurrentDay() {
        const currentDay = moment().format("dddd, MMMM Do YYYY");
        document.getElementById("currentDay").textContent = currentDay;
    }

    function createTimeBlocks() {
        const timeBlocks = document.getElementById("time-blocks");
        const currentHour = moment().hour();

        for (let hour = 9; hour <= 17; hour++) {
            const timeBlock = document.createElement("div");
            timeBlock.classList.add("time-block");
            const hourLabel = document.createElement("div");
            hourLabel.classList.add("hour-label");
            hourLabel.textContent = moment({ hour }).format("hA");
            const textarea = document.createElement("textarea");
            textarea.setAttribute("data-hour", hour);

            if (hour < currentHour) {
                textarea.classList.add("past");
            } else if (hour === currentHour) {
                textarea.classList.add("present");
            } else {
                textarea.classList.add("future");
            }

            const savedEvent = localStorage.getItem(`event-${hour}`);
            if (savedEvent) {
                textarea.value = savedEvent;
            }

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.classList.add("save-button");

            saveButton.addEventListener("click", function () {
                const eventText = textarea.value;
                localStorage.setItem(`event-${hour}`, eventText);
            });

            timeBlock.appendChild(hourLabel);
            timeBlock.appendChild(textarea);
            timeBlock.appendChild(saveButton);
            timeBlocks.appendChild(timeBlock);
        }
    }
    displayCurrentDay();
    createTimeBlocks();
});
