import * as defines from './defines';

export default class Builder {
    constructor(manager) {
        this.manager = manager;
        this.tasks = manager.tasks;
        this.all = this.tasks;
        this.input = Builder.getElement('input');
    }

    init() {
        this.input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.manager.addTask(event.currentTarget.value);
                event.currentTarget.value = '';
                this.update();
            }
        });

        this.update();
    }

    update() {
        Builder.refresh();

        this.tasks.forEach((task) => {
            const el = Builder.addElementOnBlock(task.pinned ? defines.divPinned : defines.divAll,
                defines.getDivOptions(task));
            el.querySelector('input[type=checkbox]').addEventListener('change', () => {
                this.manager.changePin(task.id);
                this.update();
            });
            el.querySelector('button').addEventListener('click', () => {
                this.manager.removeTask(task.id);
                this.update();
            });
        });

        // Event if not founded tasks
        let taskDiv = Builder.getElement(defines.divPinned.parentId);
        if (!taskDiv.contains(taskDiv.querySelector('.task'))) {
            Builder.addElementOnBlock(defines.spanPinned, 'No pinned tasks');
        }
        taskDiv = Builder.getElement(defines.divAll.parentId);
        if (!taskDiv.contains(taskDiv.querySelector('.task'))) {
            Builder.addElementOnBlock(defines.spanAll, 'Empty tasks table');
        }
    }

    static refresh() {
        Builder.removeSpanMessage('all');
        Builder.removeSpanMessage('pinned');
        Builder.getTaskElementsArray().forEach((el) => el.remove());
    }

    /*
    @objData - defines object
    */
    static addElementOnBlock(objData, message = '') {
        const parentDiv = Builder.getElement(objData.parentId);
        const el = Builder.createElement({
            tag: objData.tag,
            inner: message,
        }, ['class', objData.class]);
        parentDiv.appendChild(el);
        return el;
    }

    static removeSpanMessage(...divIds) {
        Array.from(divIds).forEach((divId) => {
            const el = Builder.getElement(divId).querySelector('.message');
            if (el) el.remove();
        });
    }

    /*
    @objInfo - object information type: { tag, classname, inner }
    @attr - attributes array format ['key', 'value']
    */
    static createElement(objInfo, ...attr) {
        const el = document.createElement(objInfo.tag);
        el.innerHTML = objInfo.inner;
        attr.forEach((attribute) => el.setAttribute(attribute[0], attribute[1]));
        return el;
    }

    static getTaskElementsArray() {
        return Array.from(document.getElementsByClassName('task'));
    }

    static getTaskId(el) {
        return el.getAttribute('data-task-id');
    }

    static getElement(id) {
        try {
            return document.getElementById(id);
        } catch (err) {
            this.manager.error = err;
            this.manager.setError();
        }
        return null;
    }
}