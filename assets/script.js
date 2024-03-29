// document.querySelectorAll("*").forEach(e=> {e.style.outline = 'grey 1px solid'})
const reversedNum = (num) => parseFloat(num.toString().split("").reverse().join("")) * Math.sign(num);
const noiseGenerate = () => {
	let target = document.querySelector(".customers").lastElementChild;
	if (target) {
		let noise = new Noise(0.5);
		let date = new Date();
		let xPos = parseInt(date.getTime().toString().split("").slice(-8).join(""));
		let yPos = date?.getFullYear?.() * 0.001;
		let res = 0;
		for (let i = 0; i < xPos; i += 10000) {
			res += Math.abs(noise.perlin2(i, yPos)) * 0.001;
		}
		target.textContent = (Math.round(res * 1000) * 11).toLocaleString("id");
	}
};
const AnimationFunction = () => {
	const sectionArray = document.querySelectorAll("[aria-label='content']");
	const sectionPosition = {};
	const offset = document.querySelector(".navbar").offsetHeight;
	sectionArray.forEach((section) => (sectionPosition[section.id] = section.offsetTop));

	window.onscroll = () => {
		let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
		for (id in sectionPosition) {
			if (sectionPosition[id] - offset <= scrollPosition) {
				document.querySelectorAll("a[class*='-links'],a[class^='-links']").forEach((e) => {
					e.ariaSelected = false;
				});
				document.querySelectorAll(`a[class*='-links'][href='#${id}']`).forEach((e) => {
					e.ariaSelected = true;
				});
			}
		}
	};
};

document.addEventListener("DOMContentLoaded", (e) => {
	if (!window.localStorage.getItem("theme")) {
		if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			window.localStorage.setItem("theme", "dark");
		} else {
			window.localStorage.setItem("theme", "lightdim");
		}
	}
	if (window.localStorage.getItem("theme") == "lightdim") {
		document.querySelector("[data-toggle-theme]").checked = true;
	}
	AOS?.init?.({ anchorPlacement: "top-bottom" });
	AnimationFunction();
	noiseGenerate();
	document.querySelector(`a[href="${window.location.hash}"`) && (document.querySelector(`a[href="${window.location.hash}"`).ariaSelected = true);
});

// Scroll up function
document.addEventListener("scroll", (e) => {
	if (window.scrollY > 200) {
		document.querySelector(".floating")?.classList?.remove?.("d-none");
	} else {
		document.querySelector(".floating")?.classList?.add?.("d-none");
	}
});

// Smooth scrolling for anchor links in navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		window.location.replace(this.getAttribute("href"));
		const targetId = this.getAttribute("href").substring(1);
		const targetElement = document.getElementById(targetId);
		let offset = document.querySelector(".navbar").offsetHeight * 0.9;
		window.scrollTo({
			top: (targetElement ?? document.body).offsetTop - offset,
			behavior: "smooth",
		});
	});
});

function closeSidebar() {
	document.querySelector("#my-drawer-3").checked = false;
}
