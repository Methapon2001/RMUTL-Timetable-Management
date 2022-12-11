<script>
  import axios from "axios";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { sectionStore } from "../store";
  import AddSection from "../lib/Section/AddSection.svelte";
  import ViewSection from "../lib/Section/ViewSection.svelte";

  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/section?limit=10")
        .then((res) => res.data);
      $sectionStore = {
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
    <AddSection />
  </div>
  <div>
    <ViewSection />
  </div>
</div>
