<script>
  import axios from "axios";
  import { roomStore } from "../../store";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  export let state = false;
  export let room = null;

  let listBuilding = [];

  let listRoomType = [
    {
      value: "lecture",
      text: "Lecture",
    },
    {
      value: "lab",
      text: "Lab",
    },
    {
      value: "both",
      text: "Lecture & Lab",
    },
  ];

  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/building?limit=999")
        .then((res) => res.data);

      listBuilding = res.data;
    } catch (e) {
      console.log(e.response.data);
    }
  });

  function handleClose() {
    state = false;
  }

  async function handleSubmit(e) {
    try {
      const res = await axios.put(`http://localhost:3000/api/room/${room.id}`, {
        ...room,
      });

      const { data } = res.data;

      const idx = $roomStore.data.findIndex((item) => item.id == data.id);

      $roomStore.data[idx] = data;

      state = false;
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<div class="modal_wrapper" transition:fade={{ duration: 200 }}>
  <div class="modal rounded-md w-10/12 md:w-2/3">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="text-xl font-bold">Edit Building</div>
      <hr class="mb-3" />
      <div class="grid grid-cols-1 md:grid-cols-6 gap-5 mb-5">
        <div class="md:col-span-2">
          <label class="block" for="building_name">Building: </label>
          <select
            bind:value={room.buildingId}
            class="form-input"
            id="building_name"
          >
            <option value="" disabled>Select Building</option>
            {#each listBuilding as item}
              <option value={item.id}>{item.name}</option>
            {/each}
          </select>
        </div>
        <div class="md:col-span-3">
          <label class="block" for="room_name">Room Name: </label>
          <input
            id="room_name"
            type="text"
            class="form-input"
            placeholder="Enter Room Name"
            bind:value={room.name}
          />
        </div>
        <div class="md:col-span-1">
          <label class="block" for="room_type">Room Type: </label>
          <select bind:value={room.type} class="form-input" id="room_type">
            {#each listRoomType as item}
              <option value={item.value}>{item.text}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="mb-5">
        <input type="submit" class="btn-primary w-full" value="Submit" />
      </div>
    </form>

    <button on:click={handleClose} class="btn-primary w-full">Close</button>
  </div>
</div>

<style>
  .modal_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
  }

  .modal {
    background: #fff;
    padding: 1rem;
  }
</style>
