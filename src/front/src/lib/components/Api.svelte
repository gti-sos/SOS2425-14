<script>
    export let api;
    export let description;
    export let path;
    export let image; 
</script>

<div class="api" style={`background-image: url(${image});`}>
    <h4>{api}</h4>
    <p>{description}</p>
    <span>API</span>
    <a href={path}>Explore Here</a>
</div>