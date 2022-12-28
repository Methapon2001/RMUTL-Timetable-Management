<script>
  import { instructorStore } from "../../store";
  import { fade } from "svelte/transition";
  import axios from "axios";
  import EditInstructor from "./EditInstructor.svelte";
  import EditIcon from "../Icons/EditIcon.svelte";
  import DeleteIcon from "../Icons/DeleteIcon.svelte";
  
  let editModal = false;
  let editData = null;

  async function updateData() {
    try {
      const res = await axios
        .get(
          `http://localhost:3000/api/instructor?limit=${$instructorStore.limit}&offset=${$instructorStore.offset}`
        )
        .then((res) => res.data);
      $instructorStore = {
        data: res.data,
        limit: res.limit,
        offset: res.offset,
        total: res.total,
      };
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async function handleDelete(instructor) {
    try {
      await axios.delete(
        `http://localhost:3000/api/instructor/${instructor.id}`
      );
    } catch (e) {
      console.log(e.response.data);
    } finally {
      updateData();
    }
  }

  function showEdit(instructor) {
    editModal = true;
    editData = { ...instructor };
  }
</script>

<EditInstructor bind:state={editModal} instructor={editData} />

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
  {#each $instructorStore.data as instructor (instructor.id)}
    <div class="card flex flex-col justify-between" in:fade>
      <div>
        <span class="block text-slate-300 text-xs pt-1">Name</span>
        <span class="font-bold">{instructor.name}</span>
      </div>
      <div class="text-right">
        <button on:click={showEdit(instructor)} class="btn-icon">
          <EditIcon />
        </button>
        <button on:click={handleDelete(instructor)} class="btn-icon">
          <DeleteIcon />
        </button>
      </div>
    </div>
  {/each}
</div>
