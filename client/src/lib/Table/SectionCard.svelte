<script>
  import { sectionStore } from "../../store";

  export let selected = null;

  function handleClick(section) {
    selected = section;
  }
</script>

<div class="rounded-t-lg shadow border bg-slate-500 text-white p-3">
  <span class="font-bold text-xl">Sections</span>
</div>
<div class="rounded-b-lg shadow border bg-slate-200 p-3 grid grid-cols-1 gap-3">
  {#each $sectionStore.data as section (section.id)}
    <div
      class="card p-3 border-4 border-transparent {section.parentId &&
        'bg-cyan-50'} {selected?.id == section.id ? 'active' : ''}"
      on:click={() => handleClick(section)}
      on:keypress
    >
      <div class="pb-1 border-b mb-1">
        <span class="font-bold"
          >{section.subject.code} {section.subject.name}
        </span>
      </div>
      <div class="pb-1 border-b mb-1">
        <span class="block text-slate-400 text-xs pt-1">Instructor</span>
        {#each section.instructorOnSection as { instructor } (instructor.id)}
          <span class="font-bold inline-block mr-5">{instructor.name}</span>
        {/each}
      </div>

      <div>
        <span class="bg-rose-400 text-white badge">Section {section.no}</span>
        <span class="bg-indigo-400 text-white badge">{section.type}</span>
        <span class="bg-blue-400 text-white badge"
          >{section.subject[section.type] * 2} Periods</span
        >
        <span class="bg-green-400 text-white badge"
          >{section.subject.credit} Credits</span
        >
      </div>
    </div>
  {/each}
</div>

<style type="text/postcss">
  .active {
    @apply border-blue-500;
  }
</style>
