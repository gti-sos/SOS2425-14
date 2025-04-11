<script>
	import { onMount } from 'svelte';
	onMount(() => {
		const menuIconOpen = document.getElementById('menu-icon-open');
		const menuIconClose = document.getElementById('menu-icon-close');
		const menu = document.getElementById('menu');

		if (menuIconOpen && menuIconClose && menu) {
			const toggleMenu = () => {
				menu.classList.toggle('show');
				document.body.classList.toggle('no-scroll');
			};

			menuIconOpen.addEventListener('click', toggleMenu);
			menuIconClose.addEventListener('click', toggleMenu);
		}
	});
</script>

<div id="menu" class="">
	<i class="fas fa-times" id="menu-icon-close"></i>
	<div class="menu-container">
		<h2>SOS2425-14</h2>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/api/v1/education-data">Eduaction Data</a></li>
			<li><a href="/api/v1/employment-data">Employment Data</a></li>
			<li><a href="/api/v1/cybercrime-data">Crime Data</a></li>
			<li><a href="/about">About</a></li>
		</ul>
	</div>
</div>
