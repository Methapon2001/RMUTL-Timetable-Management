<script>
  import axios from "axios";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { buildingStore } from "../store";
  import AddGroup from "../lib/Group/AddGroup.svelte";


  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/group?limit=10")
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
</div>
