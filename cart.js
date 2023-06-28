console.log('Script chargé');
import { getFullHour } from './utils.js';
const emptyCartHTML = document.querySelector('#emptyCart');
const cartHTML = document.querySelector('#cart');
const cartContainer = document.querySelector('#cartContainer');
const totalPrice = document.querySelector('#totalPrice');
const purchaseBtn = document.querySelector('#purchase');

/* CART */
window.addEventListener('load', () => {
	const URL = 'https://tickethack-backend-dun.vercel.app/products';
	cartHTML.style.display = 'none';
	emptyCartHTML.style.display = 'block';
	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			const { result, products } = data;
			let total = 0;
			if (result) {
				//products found - display cart and remove empty cart message
				emptyCartHTML.style.display = 'none';
				cartHTML.style.display = 'block';

				// Fill the html with products
				for (let i = 0; i < products.length; i++) {
					let product = products[i];

					// Get time of product trip on HH:MM format
					let completeHour = getFullHour(product.date);

					// Add html element for every product
					cartContainer.innerHTML += `<div class="trip">
					    <p>
					        <span >${product.departure} >
							${product.arrival}</span>
							<span >${completeHour}</span>
							<span >${product.price}€</span>
					    </p>
					    <button type="button" class="btn delete-button" id="${product._id}" >X</button>
					</div>`;

					// Calculate total price
					total += product.price;
				}
				deleteAProduct();
			}

			// Whatever happens display a price
			totalPrice.textContent = `${total}`;
		});
});

purchaseBtn.addEventListener('click', () => {
	const URL = 'https://tickethack-backend-dun.vercel.app/products/paid';
	const btns = document.querySelectorAll('.delete-button');
	const ids = [];
	btns.forEach((btn) => ids.push(btn.id));
	console.log(ids);

	fetch(URL, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ids }),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.result) window.location.assign('bookings.html');
		});
});

function deleteAProduct() {
	const URL = 'https://tickethack-backend-dun.vercel.app/products/delete';

	for (let i = 0; i < document.querySelectorAll('.delete-button').length; i++) {
		let btn = document.querySelectorAll('.delete-button')[i];

		btn.addEventListener('click', () => {
			fetch(URL, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: btn.id }),
			})
				.then((response) => response.json())
				.then((data) => data.result && location.reload()); // Refresh the page to get the updated products list
		});
	}
}
