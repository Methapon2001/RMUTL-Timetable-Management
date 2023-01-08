<script>
  import axios from "axios";
  import { roomStore } from "../../store";
  import Modal from "../Components/Modal.svelte";
  import { blurOnEscape } from "../Utilities/inputDirectives";
  import { onMount } from "svelte";

  export let state = false;
  export let room = null;

  let reset = { ...room };

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

  async function handleSubmit() {
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

<Modal bind:show={state}>
  <div slot="content">
    <form on:submit|preventDefault|stopPropagation={handleSubmit}>
      <div class="text-xl font-bold">Edit Room</div>
      <hr class="mb-6" />
      <div class="mb-5">
        <label class="block mb-2" for="building_code">Building: </label>
        <select
          bind:value={room.buildingId}
          class="form-input"
          id="building_code"
        >
          <option value="" disabled>Select Building</option>
          {#each listBuilding as item}
            <option value={item.id}>{item.code}</option>
          {/each}
        </select>
      </div>
      <div class="mb-5">
        <label class="block mb-2" for="room_name">Room Name: </label>
        <input
          id="room_name"
          type="text"
          class="form-input"
          placeholder="Enter Room Name"
          bind:value={room.name}
          use:blurOnEscape
        />
      </div>
      <div class="mb-5">
        <label class="block mb-2" for="room_type">Room Type: </label>
        <select bind:value={room.type} class="form-input" id="room_type">
          {#each listRoomType as item}
            <option value={item.value}>{item.text}</option>
          {/each}
        </select>
      </div>
      <div>
        <input type="submit" class="btn-primary w-full mb-3" value="Save" />
        <input
          type="reset"
          class="btn-primary w-full"
          value="Reset"
          on:click|preventDefault={() => (room = { ...reset })}
        />
      </div>
    </form>
  </div>
</Modal>
