<script>
  import { fly } from "svelte/transition";
  import Table from "../lib/Table/Table.svelte";

  let table_data = [
    {
      table_id: null,
    },
  ];

  function AddTable() {
    if (table_data.table_id == null) {
      table_data.table_id = 0;
    }
    table_data = [
      ...table_data,
      {
        id: table_data.length + 1,
      },
    ];
  }
</script>

<div in:fly={{ y: 32, duration: 500 }}>
  {#each table_data as td (td.id)}
    <Table select={true}/>
  {/each}

  <button class="btn-primary" on:click={AddTable}>Add table</button>
</div>
