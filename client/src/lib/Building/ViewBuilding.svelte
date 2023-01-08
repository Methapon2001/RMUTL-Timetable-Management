<script>
  import { buildingStore } from "../../store";
  import { fade } from "svelte/transition";
  import axios from "axios";
  import EditBuilding from "./EditBuilding.svelte";
  import EditIcon from "../Icons/EditIcon.svelte";
  import DeleteIcon from "../Icons/DeleteIcon.svelte";

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
    editData = { ...building };
  }
</script>

<EditBuilding bind:state={editModal} building={editData} />

<div
  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
>
  {#each $buildingStore.data as building (building.id)}
    <div class="card flex flex-col justify-between" in:fade>
      <div class="flex flex-col md:flex-row">
        <div class="mr-3">
          <span class="block text-slate-300 text-xs pt-1">Code</span>
          <span class="font-bold">{building.code}</span>
        </div>
        <div>
          <span class="block text-slate-300 text-xs pt-1 ">Name</span>
          <span class="font-bold">{building.name}</span>
        </div>
      </div>
      <div class="text-right">
        <button on:click={showEdit(building)} class="btn-icon">
          <EditIcon />
        </button>
        <button on:click={handleDelete(building)} class="btn-icon">
          <DeleteIcon />
        </button>
      </div>
    </div>
  {/each}
</div>
