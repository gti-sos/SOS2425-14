<script>
	import ApiShowcase from '$lib/components/ApiShowcase.svelte';
	import Members from '$lib/components/Members.svelte';
</script>

<svelte:head>
	<title>SOS2425-14 - About Us</title>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<h2>About our project</h2>
<hr />
<div class="article">
	<h3>Proyect Description</h3>
	<p>
		This project aims to analyze three datasets to identify potential correlations and trends
		between different socioeconomic factors. The datasets include:
	</p>
	<ul>
		<li>
			<strong>Labor Market Data:</strong> Covers unemployment rates, employment rates, and activity rates
			of the active population.
		</li>
		<li>
			<strong>Education Enrollment Data:</strong> Includes enrollment rates in Basic Vocational Training,
			Intermediate Vocational Training, and Higher Vocational Training.
		</li>
		<li>
			<strong>Crime and Cybercrime Data:</strong> Displays the total number of criminal offenses, cybercrime-related
			incidents, and arrests or investigations related to cybercrime.
		</li>
	</ul>
	<p>
		The analysis will provide insights into how these factors may be interconnected and their
		potential social implications.
	</p>
</div>
<br />
<Members />
<ApiShowcase />
<div class="article borderless">
    <h3>Check Out Our Website</h3>
    <p>Here’s the link to our project site! Take a look to see what we’ve been working on, learn more about our ideas, and follow our progress.</p>
    <a href="https://sos2425-14.onrender.com/" target="_blank">Explore</a>
</div>
