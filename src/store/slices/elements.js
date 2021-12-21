import { createSlice } from "@reduxjs/toolkit";

const elementsSlice = createSlice({
  name: "elements",
  initialState: { elements: [] }, // change to { elements: [] }
  reducers: {
    saveElements: (state, action) => {
      // console.log("payload", action.payload)
      // console.log("state", state.elements);
      state.elements = action.payload;
      // console.log("state", state.elements)
    },
    updateElements: (state, action) => {
      state.elements = [...state.elements, action.payload];
    },
    updateStructureInput: (state, action) => {
      //  console.log("payload", action.payload)
      //  console.log("state", state)
      // return (state.elements[action.payload.index].data.structureInput =
      //   action.payload.input); state= [...state, structureInput : 'kjlbafz']
      state.elements.map((e, i) => {
        if (i === action.payload.elementIndex)
          e.data.structureInput = action.payload.structureInput;
        return e;
      });
    }
  }
});

export const {
  saveElements,
  updateStructureInput,
  updateElements
} = elementsSlice.actions;
export default elementsSlice.reducer;
