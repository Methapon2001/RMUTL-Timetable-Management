<script>
  let path = window.location.pathname;

  function handlePath(e) {
    path = e.target.pathname;
  }
</script>

<div class="py-3 pl-3 pr-1">
  <a
    href="/"
    class="nav-link {path == '/'
      ? 'bg-slate-600'
      : 'hover:bg-slate-600'}"
    on:click={handlePath}
  >
    Timetable
  </a>
  <a
    href="/instructor"
    class="nav-link {path == '/instructor'
      ? 'bg-slate-600'
      : 'hover:bg-slate-600'}"
    on:click={handlePath}
  >
    Instructor
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
  <a href="#placeholder" class="nav-link" on:click={handlePath}>
    Placeholder
  </a>
</div>
