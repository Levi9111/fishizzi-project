'use server';

export const manageUserData = async (
  url: string,
  payload: Record<string, unknown>,
) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};

export const manageUserAddress = async (
  url: string,
  payload: Record<string, unknown>,
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  return result;
};

export const updateUserAddress = async (
  url: string,
  payload: Record<string, unknown>,
) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();

  return result;
};
