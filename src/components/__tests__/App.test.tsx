import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

/* TESTING NOTES
-Auth and Database
*/


describe('Contacts', () => {
  beforeEach(() => {
    render(<App />);
    const addContactButton = screen.getByRole("button", { name: "Add Contact" });
    fireEvent.click(addContactButton);
  });

  afterEach(() => {
    localStorage.clear();
  });

  const changeNameInput = (name: string) => {
    const nameInput = screen.getByRole("firstName");
    fireEvent.change(nameInput, { target: { value: name } });
  }

  const clickSaveButton = () => {
    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);
  }

  const clickDeleteButton = () => {
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);
  }

  const changeLabel = (label: string) => {
    const labelDropdown = screen.getByRole("select");
    fireEvent.change(labelDropdown, { target: { value: label } });
  }

  const clickContact = (firstName: string) => {
    const firstNameElement = screen.getByText(firstName);
    fireEvent.click(firstNameElement);
  }

  ////////////////////////////////////////////////////////////TESTS

  test('should display modal on Add Contact click', async () => {
    const contactModal = screen.getByTestId("contactModal");
    expect(contactModal).toBeInTheDocument();
  });

  test('should remove modal on save', () => {
    changeNameInput("Bobby");
    const contactModal = screen.getByTestId("contactModal");
    clickSaveButton();
    expect(contactModal).not.toBeInTheDocument();
  });

  test('should display modal if form is saved empty', () => {
    const contactModal = screen.getByTestId("contactModal");
    clickSaveButton();
    expect(contactModal).not.toBeInTheDocument();
  });

  test('should show contact in contact list', () => {
    changeNameInput("Bobby");
    clickSaveButton();
    const firstNameElement = screen.getByText("Bobby");
    expect(firstNameElement).toBeInTheDocument();
  });

  test('should change label in contact list', () => {
    changeNameInput("Bobby");
    changeLabel("Work");
    clickSaveButton();
    const labelElement = screen.getByRole("contactLabel");
    expect(labelElement).toBeInTheDocument();
  });

  test('should delete contact', () => {
    changeNameInput("Bobby");
    clickSaveButton();
    const firstNameElement = screen.getByText("Bobby");
    clickContact("Bobby");
    clickDeleteButton();
    expect(firstNameElement).not.toBeInTheDocument();
  });

  test('should update contact', () => {
    changeNameInput("Bobby");
    clickSaveButton();
    clickContact("Bobby");
    changeNameInput("John")
    clickSaveButton();
    const firstNameElement = screen.getByText("John");
    expect(firstNameElement).toBeInTheDocument();
  });

});


describe('Filter', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    localStorage.clear();
  });

  const createContact = (firstName: string, label: string) => {
    const addContactButton = screen.getByRole("button", { name: "Add Contact" });
    fireEvent.click(addContactButton);
    const nameInput = screen.getByRole("firstName");
    fireEvent.change(nameInput, { target: { value: firstName } });
    const labelDropdown = screen.getByRole("select");
    fireEvent.change(labelDropdown, { target: { value: label } });
    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);
  }

  const filterInput = (text: string) => {
    const filterInput = screen.getByRole("filterInput");
    fireEvent.change(filterInput, { target: { value: text } });
  }

  const filterLabel = (label: string) => {
    const filterLabels = screen.getByRole("labels");
    fireEvent.change(filterLabels, { target: { value: label } });
  }

  test("should filter based on input", () => {
    createContact("Bobby", "Work");
    createContact("John", "Family");
    filterInput("b");
    const bobby = screen.getByText("Bobby");
    const john = screen.queryByText("John")
    expect(bobby).toBeInTheDocument();
    expect(john).not.toBeInTheDocument();
  });

  test("should filter based on label", () => {
    createContact("Bobby", "Work");
    createContact("John", "Family");
    filterLabel("Work");
    const bobby = screen.getByText("Bobby");
    const john = screen.queryByText("John");
    expect(bobby).toBeInTheDocument();
    expect(john).not.toBeInTheDocument();
  });

  test("should filter based on input and label", () => {
    createContact("Bobby", "Work");
    createContact("Betty", "Work");
    createContact("John", "Family");
    filterInput("b");
    filterLabel("Work");
    const bobby = screen.getByText("Bobby");
    const john = screen.queryByText("John");
    const betty = screen.queryByText("Betty");
    expect(bobby).toBeInTheDocument();
    expect(betty).toBeInTheDocument();
    expect(john).not.toBeInTheDocument();
  });

});