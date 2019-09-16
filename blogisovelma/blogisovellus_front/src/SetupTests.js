import '@testing-library/jest-dom';
import '@testing-library/react';
import '@testing-library/jest-dom';
import 'babel-jest';

let savedItems = {};

const localStoragemock = {
  setItem: (key, item) => {
    savedItems[key] = item;
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
};

Object.defineProperty(window, 'localStorage', {value: localStoragemock});