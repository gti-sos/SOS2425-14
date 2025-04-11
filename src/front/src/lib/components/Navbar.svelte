<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const navbar = document.getElementById('navbar');
		const samplesLink = document.getElementById('samples-link');
		const dropdown = document.querySelector('.dropdown');

		if (navbar) {
			window.addEventListener('scroll', () => {
				if (window.scrollY > 0) {
					navbar.classList.add('scrolled');
				} else {
					navbar.classList.remove('scrolled');
				}
			});
		}

		if (samplesLink && dropdown) {
			samplesLink.addEventListener('click', (event) => {
				event.preventDefault();
				dropdown.classList.toggle('show');
			});
		}
	});
</script>

<header id="navbar">
	<h1>SOS2425-14</h1>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li class="dropdown">
				<a id="samples-link" style="cursor: pointer;">APIs<span class="dropdown-arrow"></span></a>
				<ul class="dropdown-content">
					<li><a href="/api/v1/education-data">Education</a></li>
					<li><a href="/api/v1/employment-data">Employment</a></li>
					<li><a href="/api/v1/cybercrime-data">Crime</a></li>
				</ul>
			</li>
			<li><a href="/about">About</a></li>
		</ul>
	</nav>
	<i class="fas fa-bars" id="menu-icon-open"></i>
</header>
