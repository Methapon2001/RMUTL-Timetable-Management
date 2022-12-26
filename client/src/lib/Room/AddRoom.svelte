<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { roomStore } from "../../store";

  let errors = {
    name: "",
    type: "",
    buildingId: "",
  };

  let state = {
    name: undefined,
    type: "lecture",
    buildingId: undefined,
  };

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

  async function handleSubmit(e) {
    if (!state.name) errors.name = "Please fill out this field.";
    if (!state.type) errors.type = "Please select some options.";
    if (!state.buildingId) errors.buildingId = "Please select some options.";

    for (const value in Object.values(state)) {
      if (value == null || value == undefined) return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/room", {
        ...state,
      });

      const { data } = res.data;

      if ($roomStore.data.length < $roomStore.limit) {
        $roomStore.data = [...$roomStore.data, data];
      }

      $roomStore.total = $roomStore.total + 1;

      state.name = undefined;
      state.type = "lecture";
      state.buildingId = undefined;
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<div class="border border-slate-300 rounded p-5">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-1 md:grid-cols-6 gap-5 mb-5">
      <div class="md:col-span-2">
        <label class="block" for="building_name">Building: </label>
        <select
          bind:value={state.buildingId}
          class="form-input"
          id="building_name"
        >
          <option value="" disabled>Select Building</option>
          {#each listBuilding as item}
            <option value={item.id}>{item.name}</option>
          {/each}
        </select>
        <span class="text-red-600 font-bold"> { errors.buildingId}   </span> 

      </div>
      <div class="md:col-span-3">
        <label class="block" for="room_name">Room Name: </label>
        <input
          id="room_name"
          type="text"
          class="form-input"
          placeholder="Enter Room Name"
          bind:value={state.name}
        />
        <span class="text-red-600 font-bold"> { errors.name}   </span> 
      </div>
      <div class="md:col-span-1">
        <label class="block" for="room_type">Room Type: </label>
        <select bind:value={state.type} class="form-input" id="room_type">
          {#each listRoomType as item}
            <option value={item.value}>{item.text}</option>
          {/each}
        </select>
        <span class="text-red-600 font-bold"> { errors.type}   </span> 
      </div>
    </div>
    <div class="mb-5">
      <input type="submit" class="btn-primary w-full" value="Add Room" />
    </div>
  </form>
</div>

<style>
  label {
    @apply font-bold;
  }
</style>
