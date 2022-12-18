<script>
  import axios from "axios";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { instructorStore } from "../store";
  import AddInstructor from "../lib/Instructor/AddInstructor.svelte";
  import ViewInstructor from "../lib/Instructor/ViewInstructor.svelte";

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
</script>

<div in:fly={{ y: 32, duration: 500 }}>
  <div class="mb-3">
    <AddInstructor />
  </div>
  <div class="flex items-center justify-between rounded-lg drop-shadow mb-3 bg-slate-500 p-3 text-white">
    <div>
      <span class="font-bold text-xl">Intructors</span>
    </div>
    <div>
      <input class="rounded-lg p-2 outline-none focus:outline-slate-600 w-48 focus:outline-2" placeholder="Search" type="text">
    </div>
  </div>
  <div>
    <ViewInstructor />
  </div>
</div>
