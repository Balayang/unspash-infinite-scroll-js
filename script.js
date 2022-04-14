//SELECT ELEMENTS
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

//SET VARIABLES
const count = 30;
const apiKey = 'ZhItLV7fvw0H4Snl8lzJkYQVXPZFPrQI32Z2DVU3vWA';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
//app will be in demo mode and will be rate-limited to 50 requests per hour

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// CHECK IF ALL IMAGES WERE LOADED
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

//CREATE ELEMENT AND SHOW PHOTOS AND LINKS

function displayPhotos() {
	imagesLoaded = 0;

	photosArray.forEach((photo) => {
		const newItem = `
	<a href="${photo.links.html}" target="_blank">
	<img onload="imageLoaded()" src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}"
	</a>
	`;

		position = 'beforeend';
		imageContainer.insertAdjacentHTML(position, newItem);
	});
}

// GET IMGS FROM AIP
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		totalImages = photosArray.length;
		displayPhotos(photosArray);
	} catch (error) {
		alert(error.message);
	}
}

//CHECK IF SCROLLING IS NEAR TO THE BOTTOM OF THE PAGE AND LEAD MORE PHOTOS
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

getPhotos();
