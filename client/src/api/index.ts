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

export const getDataFromDB = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  return data;
};

export const postToDB = async (
  url: string,
  payload: Record<string, unknown> | FormData,
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

export const updateDataIntoDB = async (
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

export const deleteDataFromDB = async (
  url: string,
  productId: Record<string, string>,
) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productId),
  });
  const result = await response.json();

  return result;
};
