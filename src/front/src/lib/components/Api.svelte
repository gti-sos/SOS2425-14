<script>
    export let api;
    export let description;
    export let path;
    export let image; 
    export let text;
</script>

<div class="api" style={`background-image: url(${image});`}>
    <h4>{api}</h4>
    <p>{description}</p>
    <span>{text}</span>
    <a href={path}>Explore Here</a>
</div>