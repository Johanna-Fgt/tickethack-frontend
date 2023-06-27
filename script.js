console.log('Script chargé');

/* INDEX */
const searchBtn = document.querySelector('#searchBtn');
const departureInput = document.querySelector('#departure');
const arrivalInput = document.querySelector('#arrival');
const dateInput = document.querySelector('#date');
const imageTrain = document.querySelector('#imageTrain');
const casper = document.querySelector('#casper');
const tripsContainer = document.querySelector('#tripsContainer');

searchBtn.addEventListener('click', () => {
	let departure = departureInput.value;
	let arrival = arrivalInput.value;
	let date = dateInput.value; // '2023-06-27'
	const URL = 'http://localhost:3000/trips';
	const config = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departure, arrival, date }),
	};

	fetch(URL, config)
		.then((response) => response.json())
		.then((data) => {
			const { result, trips } = data;
			if (result) {
				//trips found
				console.log(trips);
				imageTrain.style.display = 'none';
				casper.style.display = 'none';
				for (let i = 0; i < trips.length; i++) {
					let trip = trips[i];
					tripsContainer.innerHTML += `<div class="trip">
                    <p> 
                        <span >${trip.departure}</span> > <span >${trip.arrival}</span> <span >${trip.date}</span> <span >${trip.price}€</span>
                    </p>
                    <button type="button" >Book</button>
                </div>`;
				}
			} else {
				// no trip found
				imageTrain.src = './images/notfound.png';
				casper.textContent = 'No trip found';
			}
		});
});
