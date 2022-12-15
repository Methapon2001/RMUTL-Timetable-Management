<script>
  import { instructorStore } from "../../store";
  import axios from "axios";
  import EditInstructor from "./EditInstructor.svelte";
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
    editData = instructor;
  }

  function handleNextPage(e) {
    if (
      $instructorStore.offset + $instructorStore.limit <
      $instructorStore.total
    )
      $instructorStore.offset += $instructorStore.limit;
    updateData();
  }

  function handlePrevPage(e) {
    if ($instructorStore.offset >= $instructorStore.limit)
      $instructorStore.offset -= $instructorStore.limit;
    updateData();
  }

  $: {
    if (
      $instructorStore.offset + $instructorStore.limit <
      $instructorStore.total
    ) {
      next = true;
    } else {
      next = false;
    }

    if ($instructorStore.offset >= $instructorStore.limit) {
      previous = true;
    } else {
      previous = false;
    }
  }
</script>

{#if editModal}
  <EditInstructor bind:state={editModal} bind:instructor={editData} />
{/if}

<div class="border border-slate-300 rounded p-5">
  <div class="overflow-x-auto mb-5">
    <table class="w-full">
      <thead>
        <tr class="bg-slate-100">
          <th class="border">Name</th>
          <th class="w-64 p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each $instructorStore.data as instructor (instructor.id)}
          <tr>
            <td class="p-1 text-center capitalize border">{instructor.name}</td>
            <td class="p-1 text-center uppercase border">
              <button
                on:click={showEdit(instructor)}
                class="p-3 rounded-full transition hover:bg-slate-100"
              >
                <EditIcon />
              </button>
              <button
                on:click={handleDelete(instructor)}
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
