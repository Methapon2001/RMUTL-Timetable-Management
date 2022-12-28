<script>
  import axios from "axios";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { instructorStore } from "../store";
  import AddInstructor from "../lib/Instructor/AddInstructor.svelte";
  import ViewInstructor from "../lib/Instructor/ViewInstructor.svelte";
  import AddIcon from "../lib/Icons/AddIcon.svelte";

  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/instructor?limit=10")
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
  });

  let addData = false;

  function showAddData() {
    addData = !addData;
  }
</script>

<div in:fly={{ y: 32, duration: 500 }}>
  <div class="mb-3">
    <div class="grid grid-cols-4 lg:grid-cols-5 gap-3 mb-3">
      <div class="self-center col-span-3 md:col-span-2">
        <input
          class="form-input bg-white text-black"
          placeholder="Search"
          type="text"
        />
      </div>
      <div class="self-center justify-self-end col-start-5">
        <button
          class="btn-primary bg-teal-500 hover:bg-teal-600"
          on:click={showAddData}><AddIcon /></button
        >
      </div>
    </div>
  </div>

  <AddInstructor bind:state={addData} />
  <div class="mb-3">
    <div class="rounded-t-lg shadow border bg-slate-500 text-white p-3">
      <span class="font-bold text-xl">Intructors</span>
    </div>
    <div class="rounded-b-lg shadow border bg-slate-200 p-3">
      <ViewInstructor />
    </div>
  </div>
</div>
