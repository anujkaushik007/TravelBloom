btnSearch.addEventListener('click', searchCondition);

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    if (!input) {
        alert("Please enter a name to search.");
        return;
    }
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        // Try to find the condition in all search criteria's
        let result = null;
        let inputLower = input.toLowerCase();

        // Check in countries
        result = data.countries.find(country => country.name.toLowerCase() === inputLower);
            
        // Check in temples
        if (!result) {
            result = data.temples.find(temple => temple.name.toLowerCase() === inputLower);
        }
        
        // Check in beaches
        if (!result) {
            result = data.beaches.find(beach => beach.name.toLowerCase() === inputLower);
        }
        if (!result) {
            result = data.beaches.find(beach => beach.name.toLowerCase() === inputLower);
        }
        if (!result) {
            if (inputLower === 'beaches') {
                result = data.beaches;
            } else if (inputLower === 'temples') {
                result = data.temples;
            }
        }
        // If result is found, display it
        if (result) {
        if (Array.isArray(result)) {
            resultDiv.innerHTML = result.map(item => `
                <div style="background : #fff; border-radius: 10px; width:100%; overflow : hidden; margin-bottom : 30px">
                    <img src="${item.imageUrl}" alt="${item.name}" />
                    <h4 style="margin: 20px;">${item.name}</h4>
                    <p style="margin: 20px;line-height: 25px;">${item.description}</p>
                </div>
            `).join('');
        } else if (result.cities) {
                // For countries
                resultDiv.innerHTML = `
                        ${result.cities.map(city => `
                                <div style="background : #fff; border-radius: 10px; width:100%; overflow : hidden; margin-bottom : 30px">
                                <img src="${city.imageUrl}" alt="${city.name}" />
                                <h4 style="margin: 20px;">${city.name}</h4>
                                <p style="margin: 20px;line-height: 25px;">${city.description}</p>
                                </div>
                           
                        `).join('')}
                `;
            } else {
                // For temples and beaches (no cities)
                resultDiv.innerHTML = `
                    <div style="background : #fff; border-radius: 10px; width:100%; overflow : hidden; margin-bottom : 30px">
                    <img src="${result.imageUrl}" alt="${result.name}" />
                    <h4 style="margin: 20px;">${result.name}</h4>
                    <p style="margin: 20px;line-height: 25px;">${result.description}</p>
                    </div>
                `;
            }
        } else {
            // If no result found
            resultDiv.innerHTML = `<p>No matching results found for "${condition}".</p>`;
        }
        const localTime = document.getElementById('localTime');
        //localTime.innerHTML = `Current local Time ${}`
    })
    .catch(error => {
        console.error("Error fetching the data:", error);
    });
  }