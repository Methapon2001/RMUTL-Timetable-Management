<script>
  import { buildingStore } from "../../store";
  import axios from "axios";
  import EditBuilding from "./EditBuilding.svelte";
  import EditIcon from "../Icon/EditIcon.svelte";
  import DeleteIcon from "../Icon/DeleteIcon.svelte";

  let next = true;
  let previous = true;
  let editModal = false;
  let editData = null;

  async function updateData() {
    try {
      const res = await axios
        .get(
          `http://localhost:3000/api/building?limit=${$buildingStore.limit}&offset=${$buildingStore.offset}`
        )
        .then((res) => res.data);
      $buildingStore = {
        data: res.data,
        limit: res.limit,
        offset: res.offset,
        total: res.total,
      };
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async function handleDelete(building) {
    try {
      await axios.delete(`http://localhost:3000/api/building/${building.id}`);
    } catch (e) {
      console.log(e.response.data);
    } finally {
      updateData();
    }
  }

  function showEdit(building) {
    editModal = true;
    editData = building;
  }

  function handleNextPage(e) {
    if ($buildingStore.offset + $buildingStore.limit < $buildingStore.total)
      $buildingStore.offset += $buildingStore.limit;
    updateData();
  }

  function handlePrevPage(e) {
    if ($buildingStore.offset >= $buildingStore.limit)
      $buildingStore.offset -= $buildingStore.limit;
    updateData();
  }

  $: {
    if ($buildingStore.offset + $buildingStore.limit < $buildingStore.total) {
      next = true;
    } else {
      next = false;
    }

    if ($buildingStore.offset >= $buildingStore.limit) {
      previous = true;
    } else {
      previous = false;
    }
  }
</script>

{#if editModal}
  <EditBuilding bind:state={editModal} bind:building={editData} />
{/if}

<div class="border border-slate-300 rounded p-5">
  <div class="overflow-x-auto mb-5">
    <table class="w-full">
      <thead>
        <tr class="bg-slate-100">
          <th class="w-16 p-2 border">Code</th>
          <th class="w-64 p-2 border">Name</th>
          <th class="w-16 p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each $buildingStore.data as building (building.id)}
          <tr>
            <td class="p-1 text-center uppercase border">{building.code}</td>
            <td class="p-1 text-center capitalize border">{building.name}</td>
            <td class="p-1 text-center border">
              <button
                on:click={showEdit(building)}
                class="p-3 rounded-full transition hover:bg-slate-100"
              >
                <EditIcon />
              </button>
              <button
                on:click={handleDelete(building)}
                class="p-3 rounded-full transition hover:bg-slate-100"
              >
                <DeleteIcon />
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <button on:click={handlePrevPage} disabled={!previous} class="btn-primary">
    Previous
  </button>

  <button on:click={handleNextPage} disabled={!next} class="btn-primary">
    Next
  </button>
</div>
