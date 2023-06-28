console.log('Script chargé');
import { getFullHour, getTimeToDeparture } from './utils.js';

const noBookingHTML = document.querySelector('#noBooking');
const validBooking = document.querySelector('#validBooking');
const bookingsContainer = document.querySelector('#bookingsContainer');

/* BOOKINGS */
window.addEventListener('load', () => {
	const URL = 'http://localhost:3000/products/paid ';
	validBooking.style.display = 'none';
	noBookingHTML.style.display = 'block';
	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			const { result, products } = data;

			if (result) {
				// Paid products found - display bookings and remove empty bookings message
				noBookingHTML.style.display = 'none';
				validBooking.style.display = 'block';

				// Fill the html with paid products
				for (let i = 0; i < products.length; i++) {
					let product = products[i];

					// Get time of product trip on HH:MM format
					let completeHour = getFullHour(product.date);

					// Get time before departure on HH:MM format
					let timeToDeparture = getTimeToDeparture(product.date); //5 hours
					// Add html element for every product
					bookingsContainer.innerHTML += `<p>
					<span>${product.departure} >
					${product.arrival}</span>
					<span>${completeHour}</span>
					<span>${product.price}€</span>
					<span> Departure in ${timeToDeparture}</span>
				</p>`;
				}
			}
		});
});
