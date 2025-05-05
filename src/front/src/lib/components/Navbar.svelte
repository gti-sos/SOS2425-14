<script>
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	onMount(() => {
		const navbar = document.getElementById('navbar');
		const apisLink = document.getElementById('apis-link');
		const dashboardLink = document.getElementById('dashboard-link');
		const dropdownApis = document.getElementById('apis');
		const dropdownDash = document.getElementById('dash');
		const graphsLink = document.getElementById('graphs-link');
		const dropdownGraphs = document.getElementById('graphs');

		if (navbar) {
			window.addEventListener('scroll', () => {
				navbar.classList.toggle('scrolled', window.scrollY > 0);
			});
		}

		if (apisLink && dropdownApis && dropdownDash && dropdownGraphs) {
			apisLink.addEventListener('click', (event) => {
				if (dropdownDash.classList.contains('show')) {
					dropdownDash.classList.remove('show');
				}
				if (dropdownGraphs.classList.contains('show')) {
					dropdownGraphs.classList.remove('show');
				}
				event.preventDefault();
				dropdownApis.classList.toggle('show');
			});
		}

		if (graphsLink && dropdownApis && dropdownDash && dropdownGraphs) {
			graphsLink.addEventListener('click', (event) => {
				if (dropdownApis.classList.contains('show')) {
					dropdownApis.classList.remove('show');
				}
				if (dropdownDash.classList.contains('show')) {
					dropdownDash.classList.remove('show');
				}
				event.preventDefault();
				dropdownGraphs.classList.toggle('show');
			});
		}

		if (dashboardLink && dropdownDash && dropdownApis && dropdownGraphs) {
			dashboardLink.addEventListener('click', (event) => {
				if (dropdownApis.classList.contains('show')) {
					dropdownApis.classList.remove('show');
				}
				if (dropdownGraphs.classList.contains('show')) {
					dropdownGraphs.classList.remove('show');
				}
				event.preventDefault();
				dropdownDash.classList.toggle('show');
			});
		}

		const navLinks = document.querySelectorAll('nav a');

		navLinks.forEach((link) => {
			link.addEventListener('click', () => {
				if (link.id !== 'apis-link' && link.id !== 'dashboard-link' && link.id !== 'graphs-link') {
					dropdownApis?.classList.remove('show');
					dropdownDash?.classList.remove('show');
					dropdownGraphs?.classList.remove('show');
				}
			});
		});
	});
</script>

<header id="navbar">
	<h1>SOS2425-14</h1>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li class="dropdown" id="dash">
				<a id="dashboard-link" style="cursor: pointer;"
					>Dashboards<span class="dropdown-arrow"></span></a
				>
				<ul class="dropdown-content">
					<li><a href="/education">Education</a></li>
					<li><a href="/employment">Employment</a></li>
					<li><a href="/cybercrime">Crime</a></li>
				</ul>
			</li>
			<li class="dropdown" id="graphs">
				<a id="graphs-link" style="cursor: pointer;"
					>Graphs<span class="dropdown-arrow"></span></a
				>
				<ul class="dropdown-content">
					<li><a href="/education-graph">Education</a></li>
					<li><a href="/employment-graph">Employment</a></li>
					<li><a href="/cybercrime-graph">Crime</a></li>
					<li><a href="/analytics">Group</a></li>
				</ul>
			</li>
			<li><a href="/integrations">Integrations</a></li>
			<li class="dropdown" id="apis">
				<a id="apis-link" style="cursor: pointer;">APIs<span class="dropdown-arrow"></span></a>
				<ul class="dropdown-content">
					<li><a href="/api/v1/education-data/docs">Education</a></li>
					<li><a href="/api/v1/employment-data/docs">Employment</a></li>
					<li><a href="/api/v1/cybercrime-data/docs">Crime</a></li>
				</ul>
			</li>
			<li><a href="/about">About</a></li>
		</ul>
	</nav>
	<i class="fas fa-bars" id="menu-icon-open"></i>
</header>
