<script>
  import Switch from './Switch.svelte';
  
  export let commentDate="";
  export let content="";
  export let displayName="";
  export let approved=false;
  export let deleted=false;
  export let id="";
  export let postTitle="";
  export let commenterIP="";
  export let api;
  
  const toggleApproved = function()
    { 
      api.setApproved((data) => {  },id,approved);
      console.log('Approved: '+approved);
      
    };
  
  const toggleDeleted = function()
    { 
      api.setDeleted((data) => { },id,deleted);
      console.log('Deleted: '+deleted);
      
    };
</script>

<div class='card'>
  <h3 class="comment-byline">{commentDate?new Date(commentDate).toLocaleString():""} - {displayName}</h3>
  <p class="post-info"><i>commented on</i> <strong>{postTitle}</strong></p>
  <p class="commenterIP"><i>IP address:</i> <strong>{commenterIP}</strong></p>
  <p class="content">{content}</p>
  <div class="actionBar">
    <span class='control'>
      <Switch checkedColor="green" 
        uncheckedColor="darkorange" 
        bind:checked={approved} 
        onChanged={toggleApproved}
        height="1.5em"
        width="2.8em"
        >
      </Switch>
      <span class="switch-label">Approve
      </span>
    </span>
    <span class='control'>
      <Switch checkedColor="red" 
        uncheckedColor="black" 
        bind:checked={deleted} 
        onChanged={toggleDeleted}
        height="1.5em"
        width="2.8em"
        >
      </Switch>
      <span class="switch-label">Delete
      </span>
    </span>
  </div>
</div>

<style>
  h3 {
    padding-bottom: .5em;
    margin: 0;
    font-size: 1em;
  }
  
  p.post-info, p.commenterIP {
    padding-bottom: .5em;
  }
  
  
  .card {
    position: relative;
    margin: 0.5em;
    padding: 0.5em 0.5em 0.5em 0.5em;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    min-height: 5em;
  }

  .card::after {
    clear: both;
    display: block;
  }

  .avatar {
    position: absolute;
    width: 5em;
    height: 5em;
    left: 0.5em;
    top: 0.5em;
    border-radius: 50%;
    background: no-repeat 50% 50%;
    background-size: cover;
  }

  .actionBar {
    margin-top: 2em;
  }
  
  .control {
    margin-top: 0.5em;
    margin-right: 3em;
  }
  
  .switch-label {
    font-weight: bold;
    margin-left: 1em;
  }
  
  p {
    margin: 0;
  }
  
  .active {
    border-color: green;
  }
  
</style>