const apiKey = "a04a4c32746c4738a1043359251803"; // Your API key

async function getWeather() {
    const location = document.getElementById("locationInput").value;
    const errorDiv = document.getElementById("error");
    const card = document.getElementById("weatherCard");

    if (!location) {
        errorDiv.textContent = "Please enter a location.";
        card.classList.add("hidden");
        return;
    }

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Location not found.");
        }

        const data = await response.json();

        // Display data
        document.getElementById("locationName").textContent = `${data.location.name}, ${data.location.country}`;
        document.getElementById("weatherIcon").src = `https:${data.current.condition.icon}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.current.temp_c}°C`;
        document.getElementById("condition").textContent = `Condition: ${data.current.condition.text}`;

        // Display the card with animation
        card.classList.remove("hidden");
        errorDiv.textContent = "";

    } catch (error) {
        card.classList.add("hidden");
        errorDiv.textContent = `Error: ${error.message}`;
    }
}
