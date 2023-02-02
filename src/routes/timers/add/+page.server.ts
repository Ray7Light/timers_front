import { PUBLIC_TIMERS_API_ROOT } from '$env/static/public';
import { fail } from '@sveltejs/kit';

import { formErrorsConverter } from '$lib/utils/converters/formErrors.converter';

import type { Actions } from './$types';
import type { TimerFormData } from '$lib/types/timer.type';

export const actions: Actions = {
  addTimer: async ({ fetch, request }) => {
    const data = await request.formData();
    const timer: TimerFormData = {
      name: String(data.get('name')) || undefined,
      duration: data.get('duration') ? Number(data.get('duration')) : undefined,
    };

    const res = await fetch(`${PUBLIC_TIMERS_API_ROOT}/timers`, {
      method: 'POST',
      body: JSON.stringify(timer),
      headers: {
        'Content-Type': 'application/json',
      },
    });    

    if (res.status === 400) {
      const error = await res.json();
      return fail(400, { ...timer, errors: formErrorsConverter(error?.errors) });
    };

    return res.status === 200 ? { success: true } : { error: 'Server error during timer add.' };
  }
}