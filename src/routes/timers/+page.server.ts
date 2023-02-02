import { PUBLIC_TIMERS_API_ROOT } from '$env/static/public';
import { fail } from '@sveltejs/kit';

import type { Timer } from '$lib/types/timer.type';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {  
  const res = await fetch(`${PUBLIC_TIMERS_API_ROOT}/timers`);
  const timers: Timer[] = await res.json();  
  return { timers };
};

export const actions: Actions = {
  deleteTimer: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    if (!id) return fail(500, { error: 'No timer id provided.' });

    const res = await fetch(`${PUBLIC_TIMERS_API_ROOT}/timers/${id}`, {
      method: 'DELETE',
    });

    if (res.status !== 200) return fail(500, { error: 'Server error during timer delete.' });

    return { success: true };
  }
}