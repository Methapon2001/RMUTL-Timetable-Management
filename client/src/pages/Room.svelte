<script>
  import axios from "axios";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { roomStore } from "../store";
  import AddRoom from "../lib/Room/AddRoom.svelte";
  import ViewRoom from "../lib/Room/ViewRoom.svelte";

  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/room?limit=10")
        .then((res) => res.data);
      $roomStore = {
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
    <AddRoom />
  </div>
  <div class="mb-5">
    <ViewRoom />
  </div>
</div>
