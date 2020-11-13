<script>
  let Tabulator;
  function tabulatorLoaded(n) 
  { 
    console.log(n);
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

<div class="table-wrapper">
</div>

<style>
</style>

<svelte:head>
  <link href="/css/olifolkerd-tabulator/tabulator.min.css" rel="stylesheet">
  <script src='/js/olifolkerd-tabulator/tabulator.min.js' on:load={tabulatorLoaded}></script>

</svelte:head>