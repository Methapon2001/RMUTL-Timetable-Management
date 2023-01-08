<script>
  import { fly } from "svelte/transition";
  import Table from "../lib/Table/Table.svelte";
  import { sectionStore } from "../store";
  import SectionCard from "../lib/Table/SectionCard.svelte";
  import { onMount } from "svelte";
  import axios from "axios";

  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/section?limit=10")
        .then((res) => res.data);
      $sectionStore = {
        data: res.data,
        limit: res.limit,
        offset: res.offset,
        total: res.total,
      };
    } catch (e) {
      console.log(e.response.data);
    }
  });

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
  <div class="grid grid-cols-12 gap-3">
    <div class="col-span-8">
      {#each table_data as td (td.id)}
        <div class="mb-3">
          <Table select={true} />
        </div>
      {/each}
      <button class="btn-primary" on:click={AddTable}>Add table</button>
    </div>
    <div class="col-span-4">
      <SectionCard />
    </div>
  </div>
</div>
