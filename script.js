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
                    const size = Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max);
                    const distance = Math.round(asteroid.close_approach_data[0].miss_distance.kilometers);
                    const velocity = Math.round(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour);
                    const isHazardous = asteroid.is_potentially_hazardous_asteroid;
                    
                    // Fake probability calculation
                    const hitProbability = Math.min(100, Math.round((1 / distance) * 100000));

                    // Fake size comparison
                    let sizeComparison = "a car";
                    if (size > 50) sizeComparison = "a bus";
                    if (size > 100) sizeComparison = "a skyscraper";
                    if (size > 500) sizeComparison = "an entire football field";

                    const element = document.createElement('div');
                    element.className = "asteroid";
                    element.innerHTML = `
                        <img src="https://source.unsplash.com/80x80/?asteroid,space" alt="Asteroid">
                        <div class="asteroid-info">
                            <strong>Name:</strong> ${asteroid.name} <br>
                            <strong>Size:</strong> ${size} meters (as big as ${sizeComparison}) <br>
                            <strong>Velocity:</strong> ${velocity} km/h <br>
                            <strong>Distance:</strong> ${distance} km <br>
                            <strong>Hazardous:</strong> ${isHazardous ? "Yes 🚨" : "No ✅"}
                            <div class="chances">
                                <strong>Impact Probability:</strong> ${hitProbability}% ${hitProbability > 50 ? "⚠️" : ""}
                            </div>
                        </div>
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
