<script>
  import { roomStore } from "../../store";
  import { fade } from "svelte/transition";
  import axios from "axios";

  let next = true;
  let previous = true;

  async function updateData() {
    try {
      const res = await axios
        .get(
          `http://localhost:3000/api/room?limit=${$roomStore.limit}&offset=${$roomStore.offset}`
        )
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
  }

  async function handleDelete(room) {
    try {
      await axios.delete(`http://localhost:3000/api/room/${room.id}`);
    } catch (e) {
      console.log(e.response.data);
    } finally {
      updateData();
    }
  }

  function handleNextPage(e) {
    if ($roomStore.offset + $roomStore.limit < $roomStore.total)
      $roomStore.offset += $roomStore.limit;
    updateData();
  }

  function handlePrevPage(e) {
    if ($roomStore.offset >= $roomStore.limit)
      $roomStore.offset -= $roomStore.limit;
    updateData();
  }

  $: {
    if ($roomStore.offset + $roomStore.limit < $roomStore.total) {
      next = true;
    } else {
      next = false;
    }

    if ($roomStore.offset >= $roomStore.limit) {
      previous = true;
    } else {
      previous = false;
    }
  }
</script>

<div class="border border-slate-300 rounded p-5">
  <table class="w-full mb-5">
    <thead>
      <tr class="bg-slate-100">
        <th class="border">Name</th>
        <th class="w-64 p-2 border">Type</th>
        <th class="w-64 p-2 border">Action</th>
      </tr>
    </thead>
    <tbody>
      {#each $roomStore.data as room (room.id)}
        <tr>
          <td class="p-1 text-center uppercase border">{room.name}</td>
          <td class="p-1 text-center uppercase border">{room.type}</td>
          <td class="p-1 text-center uppercase border">
            <button
              on:click={handleDelete(room)}
              class="px-3 py-2 text-center bg-red-500 text-white rounded transition cursor-pointer hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <button
    on:click={handlePrevPage}
    disabled={!previous}
    class="px-3 py-2 text-center bg-slate-400 text-white rounded transition cursor-pointer hover:bg-slate-500 disabled:bg-slate-300"
    >Previous</button
  >

  <button
    on:click={handleNextPage}
    disabled={!next}
    class="px-3 py-2 text-center bg-slate-400 text-white rounded transition cursor-pointer hover:bg-slate-500 disabled:bg-slate-300"
    >Next</button
  >
</div>
