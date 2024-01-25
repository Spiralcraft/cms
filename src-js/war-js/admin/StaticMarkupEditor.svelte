<script>
  import {onMount} from 'svelte';
  import apiConst from './api.js';
  import Select from 'svelte-select';
  import Editor from '@tinymce/tinymce-svelte/dist/component/Editor.svelte';
  
  export let viewProps;
  
  let editorDefaults = { save_onsavecallback: onSave };
  let editorConfig = {  ...editorDefaults, ...viewProps.editorConfig };
  let editor;
  let editorEle;
  
  let api = apiConst({baseURL: "api"});
  let slots;
  let selectedSlot;
  let editorContent;
  let markupItem;
  let dirty=false;
  
  function slotSelected(e) 
  { 
    selectedSlot=e.detail;
    markupItem="";
    fetchSlot(e.detail.slotId);
  }

  function onDirty()
  { dirty=true;
  }
    
  function onUndo(e)
  { 
    dirty=e.detail.editor.isDirty();
  }
  
  function onSave(e)
  {
    console.log(e);
    let content=e.getContent();
    console.log("Saving "+markupItem.slotId+":"+content);
    storeSlot(content);
    dirty=false;
  }

  function onSelectFocus()
  { 
    if (editorEle) 
    { editorEle.style.visibility=false;
    }
  }

  function onSelectBlur()
  {
    if (editorEle) 
    { editorEle.style.visibility=true;
    }
  }
  
  function updateContent(content)
  { 
    dirty=false;
    editorContent=content;
    if (editor)
    { 
      editor.setContent(content);
      editor.undoManager.clear();
    }
    editorEle.style.visibility=true;
  }
    
  function fetchSlot(selectedSlotId)
  {
    api.postJSON("staticMarkup/fetchSlot"
              ,(r) => 
                { markupItem = r.item && r.item.slotId
                   ?r.item
                   :{ slotId: selectedSlotId, content: "" };
                  updateContent(markupItem.content);
                  console.log("editorContent: "+editorContent);
                }
              ,{ slotId: selectedSlotId } 
             );

  }
  
  function storeSlot(content)
  {
    api.postJSON("staticMarkup/storeSlot"
                ,(r) => 
                  { markupItem = r.item && r.item.slotId
                     ?r.item
                     :{ slotId: markupItem.slotId, content: "" };
                    updateContent(markupItem.content);
                    console.log("editorContent: "+editorContent);                     
                  }
                ,{ slotId: markupItem.slotId, content: content }
                );
  
  }
  
  function onEditorInit(e)
  { editor=e.detail.editor;
  }
  
  onMount(() => 
    { api.getJSON("staticMarkup/staticSlots"
              ,(r) => { slots = r.slots; }
             );
      console.log("View props: "+viewProps);
    })
</script>

<div class="edit-panel">
  {#if slots}
    <div class="slot-selector-panel">
      <Select  items={slots} itemId="slotId" label="name" 
        on:change={slotSelected}
        disabled={dirty}
        on:focus={onSelectFocus}
        on:blur={onSelectBlur}
      />
    </div>
  {/if}
  <div class="editor-panel" bind:this={editorEle}>
    {#if selectedSlot && markupItem!=null}
      <Editor 
        on:init={onEditorInit}
        conf={editorConfig} 
        value={editorContent} 
        scriptSrc="/js/npm/tinymce/tinymce.min.js" 
        on:dirty={onDirty}  
        on:undo={onUndo}
      />
  
    {/if}
  </div>
</div>

<style>
.edit-panel
{
  height: 100%;
  min-height: 400px;
}

:global(.tox .tox-editor-header)
{ z-index: 1 !important;
}

:global(.svelte-select-list)
{ z-index: 2 !important;
}

</style>