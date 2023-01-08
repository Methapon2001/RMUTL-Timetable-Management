<script>
  import axios from "axios";
  import { roomStore } from "../../store";
  import Modal from "../Components/Modal.svelte";
  import { blurOnEscape } from "../Utilities/inputDirectives";
  import { onMount } from "svelte";

  export let state = false;

  let form = {
    type: "lecture",
    name: null,
    buildingId: null,
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

  async function handleSubmit() {
    try {
      const res = await axios.post("http://localhost:3000/api/room", {
        ...form,
      });

      const { data } = res.data;

      if ($roomStore.data.length < $roomStore.limit) {
        $roomStore.data = [...$roomStore.data, data];
      }

      $roomStore.total = $roomStore.total + 1;

      form = {
        type: "lecture",
        name: null,
        buildingId: null,
      };
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<Modal bind:show={state}>
  <div slot="content">
    <form on:submit|preventDefault|stopPropagation={handleSubmit}>
      <div class="text-xl font-bold">Add Room</div>
      <hr class="mb-3" />
      <div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-9 gap-5">
        <div class="md:col-span-2 lg:col-span-2">
          <label class="block" for="building_code">Building: </label>
          <select
            bind:value={form.buildingId}
            class="form-input"
            id="building_code"
          >
            <option value={null} disabled>Select Building</option>
            {#each listBuilding as item}
              <option value={item.id}>{item.code}</option>
            {/each}
          </select>
        </div>
        <div class="md:col-span-2 lg:col-span-3">
          <label class="block" for="room_name">Room Name: </label>
          <input
            id="room_name"
            type="text"
            class="form-input"
            placeholder="Enter Room Name"
            bind:value={form.name}
            use:blurOnEscape
          />
        </div>
        <div class="md:col-span-2 lg:col-span-2">
          <label class="block" for="room_type">Room Type: </label>
          <select bind:value={form.type} class="form-input" id="room_type">
            {#each listRoomType as item}
              <option value={item.value}>{item.text}</option>
            {/each}
          </select>
        </div>
        <div class="md:col-span-1 lg:col-span-2 flex items-end">
          <input
            type="submit"
            class="btn-primary w-full"
            value="Add Building"
          />
        </div>
      </div>
    </form>
  </div>
</Modal>
