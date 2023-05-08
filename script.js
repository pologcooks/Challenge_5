window.addEventListener("load", () => {
    function updatehourBlockColor(hourBlock, currentTime) {
        let time = hourBlock.querySelector('.time').textContent;
        let input = hourBlock.querySelector('input');

        //Remove AM and PM from time in HTML text and get the 24 hour number
        if (time.includes("PM")) {
            let hour = time.replace("PM", "");
            time = parseInt(hour)
            if (time < 12) {
                time = time + 12;
            }
        } else {
            let hour = time.replace("AM", "");
            time = parseInt(hour)
        }


        //If the time is before our current time make the background grey
        //If the time if the current hour make it pink
        //If the time is for the future hours make it green
        if (time < currentTime.getHours()) {
            input.style.backgroundColor = 'grey';
        } else if (time === currentTime.getHours()) {
            input.style.backgroundColor = 'pink';
        } else {
            input.style.backgroundColor = 'green';
        }
    }

    function saveAppointment(e) {
        const hourBlock = e.target.parentElement;
        //Get the time value
        const time = hourBlock.querySelector('.time').textContent;
        //Get the text input value
        const eventText = hourBlock.querySelector('input').value;

        //Save to local storage
        localStorage.setItem(time, eventText);
        alert("Appointment saved to local storage!")
    }

    function loadAppointments() {
        document.querySelectorAll('.hourBlock').forEach(hourBlock => {
            //Get the current block time
            const time = hourBlock.querySelector('.time').textContent;
            //Get the appointment from local storage based on the time
            const eventText = localStorage.getItem(time);

            //If there is an appointment display it
            if (eventText) {
                hourBlock.querySelector('input').value = eventText;
            }
        });
    }

    //Show the current day
    const currentDay = document.getElementById('currentDay');
    const currentTime = new Date();
    currentDay.textContent = currentTime.toDateString();

    //Update background for each time block and bind the save event to the button click
    document.querySelectorAll('.hourBlock').forEach(hourBlock => {
        updatehourBlockColor(hourBlock, currentTime);
        hourBlock.querySelector('button').addEventListener('click', saveAppointment);
    });

    loadAppointments();
});