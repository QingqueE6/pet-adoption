const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();

async function start() {
    try {
        const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
        if (!weatherPromise.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const weatherData = await weatherPromise.json();
        const floridaTemperature = weatherData.properties.periods[0].temperature;
        console.log(floridaTemperature);

        document.querySelector("#florida-temperature").textContent = floridaTemperature;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

start();

async function petsArea() {
    try {
        const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
        if (!petsPromise.ok) {
            throw new Error('Failed to fetch pets data');
        }
        const petsData = await petsPromise.json();
        petsData.forEach(pet => {
            const clone = template.content.cloneNode(true);
            clone.querySelector("h3").textContent = pet.name;
            clone.querySelector(".pet-description").textContent = pet.description
            clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)
            clone.querySelector(".pet-card-photo img").src = pet.photo
            clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`
            wrapper.appendChild(clone);
        });
        document.querySelector(".list-of-pets").appendChild(wrapper);
    } catch (error) {
        console.error('Error fetching pets data:', error);
    }
}

petsArea();

function createAgeText(birthYear){
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if (age == 1) return "1 year old"
  if (age == 0) return "Less than a year old"
  
  return `${age} years old`
}
