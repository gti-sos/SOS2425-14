<script>
	import ApiShowcase from '$lib/components/ApiShowcase.svelte';
	import Members from '$lib/components/Members.svelte';
</script>

<svelte:head>
	<title>SOS2425-14</title>
</svelte:head>

<div class="wrapper">
	<div class="container">
		<h2>SOS2425-14</h2>
		<hr />
		<div class="article">
			<h3>Project description</h3>
			<p>
				This project aims to analyze three datasets to identify potential correlations and trends
				between different socioeconomic factors. The datasets include:
			</p>
			<ul class="list-disc list-inside space-y-4">
				<li>
					<strong>employment-data (developed by Jaime Duffy Panés)</strong>: Covers unemployment
					rates, employment rates, and activity rates of the active population.
					<a
						href="https://www.youtube.com/watch?v=tooqnXtBThs"
						target="_blank"
						style="margin-left: 0.75rem; color:var(--main); text-decoration:none;">Video D03</a
					>
				</li>
				<li>
					<strong>education-data (developed by Francisco Javier Rodríguez Martín)</strong>: Includes
					enrollment rates in Basic Vocational Training, Intermediate Vocational Training, and
					Higher Vocational Training.
					<a
						href="https://www.youtube.com/watch?v=Bbw-OgZx530"
						target="_blank"
						style="margin-left: 0.75rem; color:var(--main); text-decoration:none;">Video D03</a
					>
				</li>
				<li>
					<strong>cybercrime-data (developed by Pablo Domínguez Galván) </strong>: Displays the
					total number of criminal offenses, cybercrime-related incidents, and arrests or
					investigations related to cybercrime.
					<a
						href="https://www.youtube.com/watch?v=09nooIEXFUQ"
						target="_blank"
						style="margin-left: 0.75rem; color:var(--main); text-decoration:none;">Video D03</a
					>
				</li>
			</ul>
		</div>
		<Members />
		<ApiShowcase />
	</div>
</div>
