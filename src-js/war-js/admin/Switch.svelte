<script>
  export let checked = false;
  export let color = "#2196F3";
  export let checkedColor = color;
  export let uncheckedColor = "#ccc"; 
  export let onChanged = () => {};
  export let height = "1em";
  export let width = "1.9em";
</script>

<label class="switch" style="--unchecked-color: {uncheckedColor}; --back-color: {checked?checkedColor:uncheckedColor}; --height: {height}; --width: {width}">
  <input type="checkbox" bind:checked on:change={onChanged}/>
  <span class="slider" />
</label>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: var(--width);
    height: var(--height);
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--unchecked-color);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: calc(var(--height)/2);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: calc(var(--height)*9/10);
    width: calc(var(--height)*9/10);
    left: calc(var(--width)/15);
    bottom: calc(var(--height)/15);
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: var(--back-color);
  }

  input:checked + .slider {
    box-shadow: 0 0 1px var(--back-color);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(calc(var(--width)/2.5));
    -ms-transform: translateX(calc(var(--width)/2.5));
    transform: translateX(calc(var(--width)/2.5));
  }
</style>

