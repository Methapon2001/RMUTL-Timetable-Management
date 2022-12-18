<script>
  import { fly } from "svelte/transition";
  import Modal from "../lib/Components/Modal.svelte";
  import Table from "../lib/Table/Table.svelte";

  let showModal = true;
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

{#if showModal}
  <Modal bind:show={showModal}>
    <div slot="content">
      <h1>Modal Component</h1>
    </div>
  </Modal>
{/if}

<div in:fly={{ y: 32, duration: 500 }}>
  {#each table_data as td (td.id)}
    <div class="mb-3">
      <Table select={true} />
    </div>
  {/each}

  <button class="btn-primary" on:click={AddTable}>Add table</button>
</div>
