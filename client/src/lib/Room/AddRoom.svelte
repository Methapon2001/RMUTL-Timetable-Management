<script>
  import axios from "axios";
  import { roomStore } from "../../store";

  let state = {
    name: undefined,
    type: undefined,
  };

  let list = [
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

  async function handleSubmit(e) {
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
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<div class="border border-slate-300 rounded p-5">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
      <div class="md:col-span-2">
        <label class="block" for="room_name">Room Name: </label>
        <input
          id="room_name"
          type="text"
          class="form-input"
          placeholder="Enter Room Name"
          bind:value={state.name}
        />
      </div>
      <div>
        <label class="block" for="room_type">Room Type: </label>
        <select bind:value={state.type} class="form-input" id="room_type">
          {#each list as item}
            <option value={item.value}>{item.text}</option>
          {/each}
        </select>
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
