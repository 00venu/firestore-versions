export const GET_DATA = "GET_DATA";

export const FETCH_DATA = "FETCH_DATA";

export const fetchData = (data) => {
  return {
    type: FETCH_DATA,
    payload: data,
  };
};
