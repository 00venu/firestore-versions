import { FETCH_DATA } from "./action";
const initialData = {
  data: [
    {
      title: "This is Heading",
      price: 20,
      desc: "Lorem ipsum dummy text",
    },
  ],
};

export default (state = initialData, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
