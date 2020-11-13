<script>
  import CommentModeration from './CommentModeration.svelte';
  
  
</script>

<div class="cmp-container">
  <CommentModeration/>
  
</div>

<style>
	.cmp-container {
		text-align: left;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		.cmp-container {
			max-width: none;
		}
	}
</style>

