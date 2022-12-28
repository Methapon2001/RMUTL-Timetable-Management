<script>
  import axios from "axios";
  import { subjectStore } from "../../store";

  let errors = {
    code: "",
    name: "",
    credit: "",
    lecture: "",
    lab: "",
    exam: "",
    type: "",
    category: "",
  };

  let state = {
    code: undefined,
    name: undefined,
    credit: 3,
    lecture: 2,
    lab: 3,
    exam: undefined,
    type: undefined,
    category: undefined,
  };

  let listType = [
    {
      value: "compulsory",
      text: "Compulsory",
    },
    {
      value: "elective",
      text: "Elective",
    },
  ];

  let listCategory = [
    {
      value: "internal",
      text: "Internal",
    },
    {
      value: "external",
      text: "External",
    },
  ];

  async function handleSubmit(e) {
    if (!state.name) errors.name = "Please fill out this field.";
    if (!state.code) errors.code = "Please fill out this field.";
    if (!state.credit) errors.credit = "Please select some options.";
    if (!state.lecture) errors.lecture = "Please select some options.";
    if (!state.lab) errors.lab = "Please fill out this field.";
    if (!state.exam) errors.exam = "Please select some options.";
    if (!state.type) errors.type = "Please select some options.";
    if (!state.category) errors.category = "Please select some options.";

    const values = Object.entries(state);

    for (let i = 0; i < values.length; i++) {
      if (values[i][1] == null || values[i][1] == undefined) return;
    }


    try {
      const res = await axios.post("http://localhost:3000/api/subject", {
        ...state,
      });

      const { data } = res.data;

      if ($subjectStore.data.length < $subjectStore.limit) {
        $subjectStore.data = [...$subjectStore.data, data];
      }

      $subjectStore.total = $subjectStore.total + 1;

      state.code = undefined;
      state.name = undefined;
      state.credit = undefined;
      state.lecture = undefined;
      state.lab = undefined;
      state.exam = undefined;
      state.type = "compulsory";
      state.category = "internal";
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<div class="border border-slate-300 rounded p-5">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
      <div class="md:col-span-1">
        <label class="block" for="subject_code">Subject Code: </label>
        <input
          id="subject_code"
          type="text"
          class="form-input uppercase placeholder:capitalize"
          placeholder="Enter Subject Code"
          bind:value={state.code}
        />
        <span class="text-red-600 font-bold"> { errors.code}   </span>
      </div>
      <div class="md:col-span-3">
        <label class="block" for="subject_name">Subject Name: </label>
        <input
          id="subject_name"
          type="text"
          class="form-input"
          placeholder="Enter Subject Name"
          bind:value={state.name}
        />
        <span class="text-red-600 font-bold"> { errors.name}   </span>
      </div>
      <div class="md:col-span-1">
        <label class="block" for="subject_credit">Credit: </label>
        <input
          id="subject_credit"
          type="number"
          class="form-input"
          placeholder="Enter Subject Credit"
          bind:value={state.credit}
        />
        <span class="text-red-600 font-bold"> { errors.credit}   </span>
      </div>
      <div class="md:col-span-1">
        <label class="block" for="subject_lecture">Lecture Hours: </label>
        <input
          id="subject_lecture"
          type="number"
          class="form-input"
          placeholder="Enter Lecture Hours"
          bind:value={state.lecture}
        />
        <span class="text-red-600 font-bold"> { errors.lecture}   </span>
      </div>
      <div class="md:col-span-1">
        <label class="block" for="subject_lab">Lab Hours: </label>
        <input
          id="subject_lab"
          type="number"
          class="form-input"
          placeholder="Enter Lab Hours"
          bind:value={state.lab}
        />
        <span class="text-red-600 font-bold"> { errors.lab}   </span>
      </div>
      <div class="md:col-span-1">
        <label class="block" for="subject_exam">Exam Hours: </label>
        <input
          id="subject_exam"
          type="number"
          class="form-input"
          placeholder="Enter Exam Hours"
          bind:value={state.exam}
        />
        <span class="text-red-600 font-bold"> { errors.exam}   </span>
      </div>
      <div class="md:col-span-1">
        <label class="block" for="subject_type">Type: </label>
        <select bind:value={state.type} class="form-input" id="subject_type">
          {#each listType as item}
            <option value={item.value}>{item.text}</option>
          {/each}
        </select>
        <span class="text-red-600 font-bold"> { errors.type}   </span>
      </div>
      <div class="md:col-span-1">
        <label class="block" for="subject_category">Category: </label>
        <select
          bind:value={state.category}
          class="form-input"
          id="subject_category"
        >
          {#each listCategory as item}
            <option value={item.value}>{item.text}</option>
          {/each}
        </select>
        <span class="text-red-600 font-bold"> { errors.category}   </span>
      </div>
    </div>
    <div>
      <input type="submit" class="btn-primary w-full" value="Add Subject" />
    </div>
  </form>
</div>

<style>
  label {
    @apply font-bold;
  }
</style>
