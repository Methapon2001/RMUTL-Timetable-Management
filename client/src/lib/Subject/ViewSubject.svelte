<script>
  import { subjectStore } from "../../store";
  import axios from "axios";
  import EditSubject from "./EditSubject.svelte";
  import DeleteIcon from "../Icon/DeleteIcon.svelte";
  import EditIcon from "../Icon/EditIcon.svelte";

  let next = true;
  let previous = true;
  let editModal = false;
  let editData = null;

  async function updateData() {
    try {
      const res = await axios
        .get(
          `http://localhost:3000/api/subject?limit=${$subjectStore.limit}&offset=${$subjectStore.offset}`
        )
        .then((res) => res.data);
      $subjectStore = {
        data: res.data,
        limit: res.limit,
        offset: res.offset,
        total: res.total,
      };
    } catch (e) {
      console.log(e.response.data);
    }
  }

  function showEdit(subject) {
    editModal = true;
    editData = subject;
  }

  async function handleDelete(subject) {
    try {
      await axios.delete(`http://localhost:3000/api/subject/${subject.id}`);
    } catch (e) {
      console.log(e.response.data);
    } finally {
      updateData();
    }
  }

  function handleNextPage(e) {
    if ($subjectStore.offset + $subjectStore.limit < $subjectStore.total)
      $subjectStore.offset += $subjectStore.limit;
    updateData();
  }

  function handlePrevPage(e) {
    if ($subjectStore.offset >= $subjectStore.limit)
      $subjectStore.offset -= $subjectStore.limit;
    updateData();
  }

  $: {
    if ($subjectStore.offset + $subjectStore.limit < $subjectStore.total) {
      next = true;
    } else {
      next = false;
    }

    if ($subjectStore.offset >= $subjectStore.limit) {
      previous = true;
    } else {
      previous = false;
    }
  }
</script>

{#if editModal}
  <EditSubject bind:state={editModal} bind:subject={editData} />
{/if}

<div class="border border-slate-300 rounded p-5">
  <div class="overflow-x-auto mb-5">
    <table class="w-full">
      <thead>
        <tr class="bg-slate-100">
          <th class="w-32 p-2 border">Code</th>
          <th class="p-2 border">Name</th>
          <th class="w-16 p-2 border">Credit</th>
          <th class="w-32 p-2 border">Lecture Hours</th>
          <th class="w-32 p-2 border">Lab Hours</th>
          <th class="w-32 p-2 border">Exam Hours</th>
          <th class="w-16 p-2 border">Type</th>
          <th class="w-16 p-2 border">Category</th>
          <th class="w-8 p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each $subjectStore.data as subject (subject.id)}
          <tr>
            <td class="p-1 text-center uppercase border">{subject.code}</td>
            <td class="p-1 text-center capitalize border">{subject.name}</td>
            <td class="p-1 text-center border">{subject.credit}</td>
            <td class="p-1 text-center border">{subject.lecture}</td>
            <td class="p-1 text-center border">{subject.lab}</td>
            <td class="p-1 text-center border">{subject.exam}</td>
            <td class="p-1 text-center capitalize border">{subject.type}</td>
            <td class="p-1 text-center capitalize border">{subject.category}</td
            >
            <td class="p-1 text-center border">
              <button
                on:click={showEdit(subject)}
                class="p-3 rounded-full transition hover:bg-slate-100"
              >
                <EditIcon />
              </button>
              <button
                on:click={handleDelete(subject)}
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
