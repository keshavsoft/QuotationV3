# Why `createInputRows` Returns a `DocumentFragment`

This document explains the design decision behind returning the `fragment` on line 17 in `createInputRows.js`.

---

## The Dual Purpose of `createInputRows`

Since `createInputRows` is a **shared utility** consumed by two very different layouts (a Form layout and a Table Footer layout), it has to support both use cases efficiently:

### 1. For the Form layout (`htmlForm/v9/render/start.js`)
In a standard vertical form layout, all the inputs are simply appended one after another inside the `<fieldset>`.
* By returning the `fragment`, the form renderer can append all inputs in **one single line of code**:
  ```javascript
  const inputsFragment = createInputRows({ ... });
  fieldset.appendChild(inputsFragment); // <-- Appends the whole block at once
  ```
* If we did not return the fragment, the form renderer would have to loop through the `inputs` object again to append each input to the DOM one-by-one, which would be redundant and slow.

### 2. For the Table Footer layout (`table/v3/index.js`)
In a table footer layout, the inputs cannot be appended as a single block. They must be distributed into separate table cells (`<td>`):
* The table footer renderer **ignores the returned fragment** and instead retrieves each individual input from the `inputs` object by name to append them into separate `<td>` cells.
  ```javascript
  const inputComp = inputs[col.columnName];
  td.appendChild(inputComp); // <-- Appends to individual cell
  ```

---

## Summary
* **The `inputs` parameter** is passed by reference to let the parent components access specific inputs individually.
* **The `return fragment`** is a convenience/performance optimization specifically for the **Form component**, so it doesn't have to manually iterate and append the inputs one by one.
