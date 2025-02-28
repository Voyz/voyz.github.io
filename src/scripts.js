async function loadComponent(id, file, callback) {
	return fetch(file)
		.then(response => {
			if (!response.ok) throw new Error(`Failed to load ${file}`);
			return response.text();
		})
		.then(content => {
			document.getElementById(id).innerHTML = content;
			if (callback) callback(); // Run the callback after loading
		})
		.catch(error => console.error("Component Load Error:", error));
}

// Function to rebind FAQ event listeners
function initializeFAQ() {
	document.querySelectorAll('.faq-question').forEach(item => {
		item.addEventListener('click', () => {
			const answer = item.nextElementSibling;
			answer.classList.toggle('hidden');
		});
	});
}

async function loadAll() {
	await Promise.all([
		loadComponent("header", "components/header.html"),
		loadComponent("services", "components/services.html"),
		loadComponent("why_work", "components/why_work.html"),
		loadComponent("testimonials", "components/testimonials.html"),
		loadComponent("the_way_i", "components/the_way_i.html"),
		loadComponent("faq", "components/faq.html", initializeFAQ)
	]);

	// Now remove the hidden class AFTER everything has loaded
	const loadable = document.getElementById("loadable");
	loadable.classList.remove("opacity-0"); // Start fade-in
}

// Run the function
loadAll();
