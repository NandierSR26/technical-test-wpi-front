import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  modalIsOpen: boolean;
  backdropIsOpen: boolean;
  form1Visible: boolean;
  form2Visible: boolean;
  form3Visible: boolean;
}

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modalIsOpen: false,
    backdropIsOpen: false,
    form1Visible: true,
    form2Visible: false,
    form3Visible: false,
  } as InitialState,
  reducers: {
    onOpenModal: (state) => {
      state.modalIsOpen = true;
    },
    onCloseModal: (state) => {
      state.modalIsOpen = false;
    },
    onOpenBackdrop: (state) => {
      state.backdropIsOpen = true;
    },
    onCloseBackdrop: (state) => {
      state.backdropIsOpen = false;
    },
    onSetForm1: (state) => {
      state.form1Visible = true;
      state.form2Visible = false;
      state.form3Visible = false;
    },
    onSetForm2: (state) => {
      state.form1Visible = false;
      state.form2Visible = true;
      state.form3Visible = false;
    },
    onSetForm3: (state) => {
      state.form1Visible = false;
      state.form2Visible = false;
      state.form3Visible = true;
    },
    onHideForms: (state) => {
      state.form1Visible = false;
      state.form2Visible = false;
      state.form3Visible = false;
    },
    onHideFloatingElements: (state) => {
      state.backdropIsOpen = false;
      state.modalIsOpen = false;
    },
  },
});

export const {
  onCloseBackdrop,
  onCloseModal,
  onOpenBackdrop,
  onOpenModal,
  onSetForm1,
  onSetForm2,
  onSetForm3,
  onHideFloatingElements,
  onHideForms
} = uiSlice.actions;
