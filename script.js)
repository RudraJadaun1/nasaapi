document.getElementById('fetchAsteroids').addEventListener('click', () => {
    const apiKey = "ZwLlnV5qUrs7GFXoH0R6knI7THU1IT4SGPK5ZTV3";
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-12-08&end_date=2024-12-09&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const asteroidContainer = document.getElementById('asteroidData');
            asteroidContainer.innerHTML = ""; // Clear old data

            const asteroids = data.near_earth_objects["2024-12-08"];
            if (asteroids.length > 0) {
                asteroids.forEach(asteroid => {
                    const element = document.createElement('div');
                    element.className = "asteroid";
                    element.innerHTML = `
                        <strong>Name:</strong> ${asteroid.name} <br>
                        <strong>Size:</strong> ${Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max)} meters <br>
                        <strong>Velocity:</strong> ${Math.round(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour)} km/h <br>
                        <strong>Distance:</strong> ${Math.round(asteroid.close_approach_data[0].miss_distance.kilometers)} km <br>
                        <strong>Hazardous:</strong> ${asteroid.is_potentially_hazardous_asteroid ? "Yes 🚨" : "No ✅"}
                    `;
                    asteroidContainer.appendChild(element);
                });
            } else {
                asteroidContainer.innerHTML = "<p>No asteroids found near Earth for the selected date.</p>";
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('asteroidData').innerHTML = "<p>Unable to fetch asteroid data. Please try again later.</p>";
        });
});
