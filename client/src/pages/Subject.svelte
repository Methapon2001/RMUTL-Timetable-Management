<script>
  import axios from "axios";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { subjectStore } from "../store";
  import AddSubject from "../lib/Subject/AddSubject.svelte";
  import ViewSubject from "../lib/Subject/ViewSubject.svelte";

  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/subject?limit=10")
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
  });
</script>

<div in:fly={{ y: 32, duration: 500 }}>
  <div class="mb-5">
    <AddSubject />
  </div>
  <div>
    <ViewSubject />
  </div>
</div>
