<script>
	export let name;
  let Tabulator;
  function tabulatorLoaded(n) 
  { 
    alert(n); 
    Tabulator = window.Tabulator; 
    //define data
    var tabledata = [
        {id:1, name:"Billy Bob", age:12, gender:"male", height:95, col:"red", dob:"14/05/2010"},
        {id:2, name:"Jenny Jane", age:42, gender:"female", height:142, col:"blue", dob:"30/07/1954"},
        {id:3, name:"Steve McAlistaire", age:35, gender:"male", height:176, col:"green", dob:"04/11/1982"},
    ];
    
    //define table
    var table = new Tabulator(".table-wrapper", {
        data:tabledata,
        autoColumns:true,
    }); 
  };
  
</script>

<div class="cmp-container">
  
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<div class="table-wrapper">
	</div>
	<script>
   </script>
</div>

<style>
	.cmp-container {
		text-align: center;
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

<svelte:head>
  <link href="/css/olifolkerd-tabulator/tabulator.min.css" rel="stylesheet">
  <script src='/js/olifolkerd-tabulator/tabulator.min.js' on:load={tabulatorLoaded}></script>

</svelte:head>