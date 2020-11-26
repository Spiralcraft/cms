<script>
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import CommentModerationItem from './CommentModerationItem.svelte';
  import SvgIcon from './SvgIcon.svelte';
  import {trashIcon} from './AppIcons'
  import m_api from './api.js';
  
  var api = m_api({baseURL: "api"});
  
  let things = [];
  let start;
  let end;
  
  let comments=api.commentsForModeration;
  comments.refresh();
</script>

<div class="_activity-header">
  <h3>Comment Moderation</h3>
  <div class="_toolbar">
    <button class="_svgIconButton" on:click={()=>comments.expunge()}
      tooltip="Expunge deleted comments"
      >
      <SvgIcon d="{trashIcon}" stroke="#FFFFFF"/>
    </button>
  </div>
</div>
<div class="container">
  <VirtualList items={$comments} bind:start bind:end let:item>
    <CommentModerationItem {...item} api={api}/>
  </VirtualList>
  <p>showing items {start}-{end}</p>
</div>

<style>
  ._svgIconButton
  { 
    height: 3em;
    padding: 0.5em;
  }
  
  
  
  ._activity-header h3 
  { display: inline-block; 
  }

  ._toolbar 
  { 
    float: right; 
    margin-block-start: 1em;
    margin-block-end: 1em;
  }
  
  .container 
  {
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    min-height: 200px;
    height: calc(70vh);
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>