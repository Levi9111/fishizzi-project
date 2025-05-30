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
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
    headers:
      payload instanceof FormData
        ? undefined // Let the browser set Content-Type automatically
        : { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errotext = response.text();
    console.log(errotext);
  }

  const result = await response.json();

  return result;
};

export const updateDataIntoDB = async (
  url: string,
  payload?: Record<string, unknown>,
) => {
  let response;

  if (payload) {
    response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } else {
    response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const result = await response.json();

  return result;
};

export const deleteDataFromDB = async (
  url: string,
  productId?: Record<string, string>,
) => {
  let response;

  if (productId) {
    response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productId),
    });
  } else {
    response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const result = await response.json();

  return result;
};
