<script>
    import Api from '$lib/components/Api.svelte';
    import apis from '$lib/data/apis.json';
</script>

<div class="article" style="padding: 1em 0;">
    <h3 style="text-align: center;">APIs Showcase</h3><br>
    <div class="apis-container">
        {#each apis as api}
            <Api api={api.api} description={api.description} path={api.path} image={api.image} text="API" />
        {/each}
    </div>
</div>