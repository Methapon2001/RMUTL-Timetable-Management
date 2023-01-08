<script>
  import axios from "axios";
  import { buildingStore } from "../../store";
  import Modal from "../Components/Modal.svelte";
  import { blurOnEscape } from "../Utilities/inputDirectives";

  export let state = false;

  let form = {
    code: null,
    name: null,
  };

  async function handleSubmit() {
    try {
      const res = await axios.post("http://localhost:3000/api/building", {
        ...form,
      });

      const { data } = res.data;

      if ($buildingStore.data.length < $buildingStore.limit) {
        $buildingStore.data = [...$buildingStore.data, data];
      }

      $buildingStore.total = $buildingStore.total + 1;

      form = {
        code: null,
        name: null,
      };
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<Modal bind:show={state}>
  <div slot="content">
    <form on:submit|preventDefault|stopPropagation={handleSubmit}>
      <div class="text-xl font-bold">Add Building</div>
      <hr class="mb-3" />
      <div class="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-5">
        <div class="md:col-span-2 lg:col-span-2">
          <label class="block mb-2" for="building_code">Building Code: </label>
          <input
            id="building_code"
            type="text"
            class="form-input"
            placeholder="Enter Building Code"
            bind:value={form.code}
            use:blurOnEscape
          />
        </div>
        <div class=" md:col-span-2 lg:col-span-3">
          <label class="block mb-2" for="building_name">Building Name: </label>
          <input
            id="building_name"
            type="text"
            class="form-input"
            placeholder="Enter Building Name"
            bind:value={form.name}
            use:blurOnEscape
          />
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
