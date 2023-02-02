import { PUBLIC_TIMERS_API_ROOT } from "$env/static/public";
import { error } from "@sveltejs/kit";

import type { Timer } from "$lib/types/timer.type"
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`${PUBLIC_TIMERS_API_ROOT}/timers/${params.slug}`);

  if (res.status === 404) throw error(404, "Timer not found");

  const timer: Timer = await res.json();   

  return { timer };
}