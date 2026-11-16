const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const architectureCards = document.querySelectorAll(".architecture-card");
const serviceDetail = document.getElementById("serviceDetail");
const filterButtons = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service-card");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const currentYear = document.getElementById("currentYear");
const backToTop = document.getElementById("backToTop");
const refreshStatusBtn = document.getElementById("refreshStatusBtn");
const deliveryStatus = document.getElementById("deliveryStatus");
const monitoringStatus = document.getElementById("monitoringStatus");

const awsServiceDetails = {
	s3: {
		title: "Amazon S3",
		description:
			"Amazon S3 stores the static application files and can serve the website when configured for static hosting. For production, S3 should be paired with CloudFront for HTTPS, caching, and secure delivery."
	},
	cloudfront: {
		title: "Amazon CloudFront",
		description:
			"Amazon CloudFront works as a content delivery network. It improves speed, reduces latency, supports HTTPS, and delivers Soulinspire content closer to users."
	},
	vpc: {
		title: "Amazon VPC",
		description:
			"Amazon VPC provides a private and controlled network layer. Public resources can be separated from private application servers, databases, and internal services."
	},
	ec2: {
		title: "Amazon EC2",
		description:
			"Amazon EC2 can run the dynamic application layer if Soulinspire later needs server-side processing, APIs, dashboards, authentication, or business logic."
	},
	cloudwatch: {
		title: "Amazon CloudWatch",
		description:
			"Amazon CloudWatch tracks logs, metrics, alarms, and operational health. It helps administrators detect downtime, high CPU usage, traffic spikes, and errors."
	},
	sns: {
		title: "Amazon SNS",
		description:
			"Amazon SNS sends notifications when CloudWatch alarms are triggered. It can alert administrators through email or other channels when attention is required."
	}
};

function toggleMobileMenu() {
	navToggle.classList.toggle("active");
	navMenu.classList.toggle("show");
}

function closeMobileMenu() {
	navToggle.classList.remove("active");
	navMenu.classList.remove("show");
}

function updateArchitectureDetail(card) {
	const service = awsServiceDetails[card.dataset.service];
	if (!service || !serviceDetail) return;

	architectureCards.forEach((item) => item.classList.remove("active"));
	card.classList.add("active");
	serviceDetail.innerHTML = `<h3>${service.title}</h3><p>${service.description}</p>`;
}

function filterServices(filterValue) {
	serviceCards.forEach((card) => {
		card.style.display = filterValue === "all" || card.dataset.category === filterValue ? "block" : "none";
	});
}

function setActiveFilter(button) {
	filterButtons.forEach((btn) => btn.classList.remove("active"));
	button.classList.add("active");
}

function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateContactForm(event) {
	event.preventDefault();
	const name = contactForm.elements.name.value.trim();
	const email = contactForm.elements.email.value.trim();
	const service = contactForm.elements.service.value;
	const message = contactForm.elements.message.value.trim();

	if (!name || !email || !service || !message) {
		formMessage.textContent = "Please complete all fields before submitting.";
		formMessage.style.color = "#ef4444";
		return;
	}
	if (!isValidEmail(email)) {
		formMessage.textContent = "Please enter a valid email address.";
		formMessage.style.color = "#ef4444";
		return;
	}

	const enquiry = { name, email, service, message, submittedAt: new Date().toISOString() };
	try {
		localStorage.setItem("soulinspireLatestEnquiry", JSON.stringify(enquiry));
	} catch (error) {
		// Keep the form usable when browser storage is unavailable.
	}
	formMessage.textContent = "Thank you. Your enquiry has been prepared successfully. In production, this would be sent to the backend service.";
	formMessage.style.color = "#22c55e";
	contactForm.reset();
}

function handleScroll() {
	backToTop.classList.toggle("visible", window.scrollY > 420);
}

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

function refreshPlatformStatus() {
	const statuses = [
		{ delivery: "Operational", monitoring: "Simulated Front-End Status" },
		{ delivery: "Healthy", monitoring: "Latest check completed successfully" },
		{ delivery: "Available", monitoring: "No critical front-end issues detected" }
	];
	const status = statuses[Math.floor(Math.random() * statuses.length)];
	deliveryStatus.textContent = status.delivery;
	monitoringStatus.textContent = status.monitoring;
	refreshStatusBtn.textContent = "Status Updated";
	setTimeout(() => { refreshStatusBtn.textContent = "Refresh Status"; }, 1800);
}

function setCurrentYear() {
	currentYear.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) navToggle.addEventListener("click", toggleMobileMenu);
navLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));
architectureCards.forEach((card) => card.addEventListener("click", () => updateArchitectureDetail(card)));
filterButtons.forEach((button) => button.addEventListener("click", () => {
	setActiveFilter(button);
	filterServices(button.dataset.filter);
}));
if (contactForm && formMessage) contactForm.addEventListener("submit", validateContactForm);
window.addEventListener("scroll", handleScroll);
if (backToTop) backToTop.addEventListener("click", scrollToTop);
if (refreshStatusBtn && deliveryStatus && monitoringStatus) refreshStatusBtn.addEventListener("click", refreshPlatformStatus);
if (currentYear) setCurrentYear();
