<script>
  import { roomStore } from "../../store";
  import { fade } from "svelte/transition";
  import axios from "axios";
  import EditRoom from "./EditRoom.svelte";
  import EditIcon from "../Icons/EditIcon.svelte";
  import DeleteIcon from "../Icons/DeleteIcon.svelte";

  let editModal = false;
  let editData = null;

  async function updateData() {
    try {
      const res = await axios
        .get(
          `http://localhost:3000/api/room?limit=${$roomStore.limit}&offset=${$roomStore.offset}`
        )
        .then((res) => res.data);
      $roomStore = {
        data: res.data,
        limit: res.limit,
        offset: res.offset,
        total: res.total,
      };
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async function handleDelete(room) {
    try {
      await axios.delete(`http://localhost:3000/api/room/${room.id}`);
    } catch (e) {
      console.log(e.response.data);
    } finally {
      updateData();
    }
  }

  function showEdit(room) {
    editModal = true;
    editData = { ...room };
  }
</script>

<EditRoom bind:state={editModal} room={editData} />

<div
  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
>
  {#each $roomStore.data as room (room.id)}
    <div class="card flex flex-col justify-between" in:fade>
      <div class="flex flex-col md:flex-row">
        <div class="mr-5">
          <span class="block text-slate-300 text-xs pt-1">Type</span>
          <span class="font-bold capitalize ">{room.type}</span>
        </div>
        <div>
          <span class="block text-slate-300 text-xs pt-1">Name</span>
          <span class="font-bold">{room.building.code}.{room.name}</span>
        </div>
      </div>
      <div class="text-right">
        <button on:click={showEdit(room)} class="btn-icon">
          <EditIcon />
        </button>
        <button on:click={handleDelete(room)} class="btn-icon">
          <DeleteIcon />
        </button>
      </div>
    </div>
  {/each}
</div>
