<script>
  import axios from "axios";
  import { buildingStore } from "../../store";
  import { fade } from "svelte/transition";

  export let state = false;
  export let building = null;

  function handleClose() {
    state = false;
  }

  async function handleSubmit(e) {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/building/${building.id}`,
        {
          ...building,
        }
      );

      const { data } = res.data;

      const idx = $buildingStore.data.findIndex((item) => item.id == data.id);

      $buildingStore.data[idx] = data;

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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div class="md:col-span-1">
          <label class="block" for="building_code">Building Code: </label>
          <input
            id="building_code"
            type="text"
            class="form-input"
            placeholder="Enter building Code"
            bind:value={building.code}
          />  
        </div>
        <div class="md:col-span-2">
          <label class="block" for="building_name">Building Name: </label>
          <input
            id="building_name"
            type="text"
            class="form-input"
            placeholder="Enter building Name"
            bind:value={building.name}
          />
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
