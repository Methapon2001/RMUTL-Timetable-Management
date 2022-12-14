<script>
  import axios from "axios";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { buildingStore } from "../store";
  import AddBuilding from "../lib/Building/AddBuilding.svelte";
  import ViewBuilding from "../lib/Building/ViewBuilding.svelte";

  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/building?limit=10")
        .then((res) => res.data);
      $buildingStore = {
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
    <AddBuilding />
  </div>
  <div class="mb-5">
    <ViewBuilding />
  </div>
</div>
