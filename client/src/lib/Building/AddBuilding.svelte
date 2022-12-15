<script>
  import axios from "axios";
  import { buildingStore } from "../../store";

  let state = {
    code: undefined,
    name: undefined,
  };

  async function handleSubmit(e) {
    try {
      const res = await axios.post("http://localhost:3000/api/building", {
        ...state,
      });

      const { data } = res.data;

      if ($buildingStore.data.length < $buildingStore.limit) {
        $buildingStore.data = [...$buildingStore.data, data];
      }

      $buildingStore.total = $buildingStore.total + 1;

      state.code = undefined;
      state.name = undefined;
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<div class="border border-slate-300 rounded p-5">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
      <div class="md:col-span-1">
        <label class="block" for="building_code">Building Code: </label>
        <input
          id="building_code"
          type="text"
          class="form-input"
          placeholder="Enter building Code"
          bind:value={state.code}
        />
      </div>
      <div class="md:col-span-2">
        <label class="block" for="building_name">Building Name: </label>
        <input
          id="building_name"
          type="text"
          class="form-input"
          placeholder="Enter building Name"
          bind:value={state.name}
        />
      </div>
    </div>
    <div>
      <input type="submit" class="btn-primary w-full" value="Add building" />
    </div>
  </form>
</div>

<style>
  label {
    @apply font-bold;
  }
</style>
