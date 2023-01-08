<script>
  import axios from "axios";
  import { buildingStore } from "../../store";
  import Modal from "../Components/Modal.svelte";
  import { blurOnEscape } from "../Utilities/inputDirectives";

  export let state = false;
  export let building = null;

  let reset = { ...building };

  async function handleSubmit() {
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

<Modal bind:show={state}>
  <div slot="content">
    <form on:submit|preventDefault|stopPropagation={handleSubmit}>
      <div class="text-xl font-bold">Edit Building</div>
      <hr class="mb-6" />
      <div class="mb-5">
        <label class="block mb-2" for="building_code">
          Building Code: 
        </label>
        <input
          id="building_code"
          type="text"
          class="form-input"
          placeholder="Enter Building Code"
          bind:value={building.code}
          use:blurOnEscape
        />
      </div>
      <div class="mb-5">
        <label class="block mb-2" for="building_name">
          Building Name: 
        </label>
        <input
          id="building_name"
          type="text"
          class="form-input"
          placeholder="Enter Building Name"
          bind:value={building.name}
          use:blurOnEscape
        />
      </div>
      <div>
        <input type="submit" class="btn-primary w-full mb-3" value="Save" />
        <input
          type="reset"
          class="btn-primary w-full"
          value="Reset"
          on:click|preventDefault={() => (building = { ...reset })}
        />
      </div>
    </form>
  </div>
</Modal>
