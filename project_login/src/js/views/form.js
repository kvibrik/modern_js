/**
 * Function inputErrorTemplate
 * @param {String} msg
 */
function inputErrorTemplate(msg) {
  return `
    <div class="invalid-feedback">${msg}</div>
  `;
}

/**
 * Function showInputError. Add input error
 * @param {HTMLInputElement} el
 */
export function showInputError(el) {
  const parent = el.parentElement;
  const msg = el.dataset.invalidMessage || 'Invalid input';
  const template = inputErrorTemplate(msg);
  const invalidFeedback = parent.querySelector('.invalid-feedback');

  el.classList.add('is-invalid');
  if (invalidFeedback) {
    parent.removeChild(invalidFeedback);
  }
  parent.insertAdjacentHTML('beforeend', template);
}

/**
 * Function removeInputError. Remove input error
 * @param {HTMLInputElement} el
 */
export function removeInputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelector('.invalid-feedback');
  if (!err) return;

  el.classList.remove('is-invalid');
  // err.forEach(el => el.remove());
  parent.removeChild(err);
}
