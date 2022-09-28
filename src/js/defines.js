export const spanAll = {
    parentId: 'all',
    tag: 'span',
    class: 'message',
};
export const spanPinned = {
    parentId: 'pinned',
    tag: 'span',
    class: 'message',
};
export const divAll = {
    parentId: 'all-tasks',
    tag: 'div',
    class: 'task div-align task-style',
};
export const divPinned = {
    parentId: 'pinned-tasks',
    tag: 'div',
    class: 'task div-align task-style',
};
export function getDivOptions(taskObj) {
    const checked = taskObj.pinned ? 'checked' : '';
    return `<span class='taskname'>${taskObj.name}</span>
  <div class='div-align' data-task-id='${taskObj.id}'>
    <button type='button' data-id='${taskObj.id}'>Remove</button>
    <input type='checkbox' class='pin' ${checked}>
  </div>`;
}