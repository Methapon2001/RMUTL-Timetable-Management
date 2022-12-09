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
  <div class="mb-5">
    <AddInstructor />
  </div>
  <div class="mb-5">
    <ViewInstructor />
  </div>
</div>
