<script>
  import { onMount } from "svelte";
  import CommentModeration from './CommentModeration.svelte';
  import StaticMarkupEditor from './StaticMarkupEditor.svelte';
  export let view;
  export let viewProps;
  
  onMount(
    () => {
      console.log("view: " + view);
     }
  );
</script>

<div class="cmp-container">
  {#if view=="comment-moderation"}
    <CommentModeration/>
  {/if}
  {#if view=="static-markup-editor"}
    <StaticMarkupEditor {viewProps}/>
  {/if}
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

