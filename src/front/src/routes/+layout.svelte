<script>
    import '$lib/css/style.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Menu from '$lib/components/Menu.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import GitHub from '$lib/components/GitHub.svelte';
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="/favicon.png" type="image/x-icon" />
    <meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<Navbar/>
<Menu/>
<GitHub/>

<div class="wrapper">
    <div class="container">
        <slot />
    </div>
</div>

<Footer/>