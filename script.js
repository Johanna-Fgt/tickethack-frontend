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
				imageTrain.style.display = 'none';
				casper.style.display = 'none';
				//fill the html with trips
				for (let i = 0; i < trips.length; i++) {
					let trip = trips[i];
					let hour =
						new Date(trip.date).getHours() +
						':' +
						new Date(trip.date).getMinutes();
					tripsContainer.innerHTML += `<div class="trip">
                    <p> 
                        <span >${trip.departure}</span> > <span >${trip.arrival}</span> <span >${hour}</span> <span >${trip.price}€</span>
                    </p>
                    <button type="button" class="book-button" id="${trip._id}" >Book</button>
                </div>`;
				}
				bookATrip();
			} else {
				// no trip found
				imageTrain.src = './images/notfound.png';
				casper.textContent = 'No trip found';
			}
		});
});

function bookATrip() {
	const URL = 'http://localhost:3000/products';

	for (let i = 0; i < document.querySelectorAll('.book-button').length; i++) {
		document
			.querySelectorAll('.book-button')
			[i].addEventListener('click', () => {
				console.log();
				fetch(URL, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: document.querySelectorAll('.book-button')[i].id,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.result) {
							window.location.assign('cart.html');
						}
					});
			});
	}
}

/* CART */
window.addEventListener('load', () => {
	const URL = 'http://localhost:3000/products';

	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			const { result, products } = data;
			if (result) {
				//products found - fill the html with it
				for (let i = 0; i < trips.length; i++) {
					let trip = trips[i];
					let hour =
						new Date(trip.date).getHours() +
						':' +
						new Date(trip.date).getMinutes();
					tripsContainer.innerHTML += `<div class="trip">
                    <p> 
                        <span >${trip.departure}</span> > <span >${trip.arrival}</span> <span >${hour}</span> <span >${trip.price}€</span>
                    </p>
                    <button type="button" class="book-button" id="${trip._id}" >Book</button>
                </div>`;
				}
				bookATrip();
			} else {
				// no trip found
				imageTrain.src = './images/notfound.png';
				casper.textContent = 'No trip found';
			}
		});
});
