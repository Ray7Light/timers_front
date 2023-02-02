<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>Details</h1>
<p>{data.timer.name}</p>