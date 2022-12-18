<script>
  import { instructorStore } from "../../store";
  import { fade, slide } from "svelte/transition";
  import axios from "axios";
  import EditInstructor from "./EditInstructor.svelte";
  import EditIcon from "../Icon/EditIcon.svelte";
  import DeleteIcon from "../Icon/DeleteIcon.svelte";
    import AddInstructor from "./AddInstructor.svelte";

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

<div>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-3 gap-y-5">
    {#each $instructorStore.data as instructor (instructor.id)}
      <div class="card" in:fade>
        <div class="text-slate-300 text-xs pt-1">Name</div>
        <div class="font-bold">{instructor.name}</div>
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

</div>