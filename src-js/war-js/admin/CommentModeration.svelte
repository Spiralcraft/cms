<script>
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import CommentModerationItem from './CommentModerationItem.svelte';
  import m_api from './api.js';
  
  var api = m_api({baseURL: "api"});
  
  let things = [];
  let start;
  let end;
  
  api.fetchCommentsForModeration((data) => { console.log("data="+JSON.stringify(data)); things=data; });
</script>

<h3>Comment Moderation</h3>
<div class="container">
  <VirtualList items={things} bind:start bind:end let:item>
    <CommentModerationItem {...item} api={api}/>
  </VirtualList>
  <p>showing items {start}-{end}</p>
</div>

<style>
  .container {
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    min-height: 200px;
    height: calc(70vh);
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>