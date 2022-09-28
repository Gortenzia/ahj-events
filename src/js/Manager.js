export default class Manager {
    constructor() {
        this.counter = 1;
        this.tasks = [];
        this.error = null;
    }

    addTask(value) {
        if (!this.validator(value)) { return; }

        this.tasks.push({
            name: value,
            id: this.generateId(),
            pinned: false,
        });
    }

    removeTask(taskId) {
        const index = this.getTaskIndexOnArray(taskId);
        this.tasks.splice(index, 1);
    }

    changePin(taskId) {
        const index = this.getTaskIndexOnArray(taskId);
        this.tasks[index].pinned = !this.tasks[index].pinned;
    }

    getTaskIndexOnArray(taskId) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === taskId) { return i; }
        }
        return null;
    }

    generateId() {
        this.counter += 1;
        return this.counter;
    }

    validator(value) {
        this.error = null;
        const string = value.replace(/^\s*/, '').replace(/\s*$/, '');
        if (value !== string) {
            this.error = 'Название не должно начинаться и заканчиваться пробелами';
        } else if (string.length < 1) {
            this.error = 'Название не должно быть пустым';
        } else if (this.tasks.some((t) => t.name === string)) {
            this.error = `Задача с именем "${value}" уже существует.`;
        }

        return this.setError();
    }

    setError() {
        const errorElement = document.getElementsByClassName('error');
        if (typeof this.error !== 'string') {
            errorElement[0].classList.remove('active');
            return true;
        }
        errorElement[0].classList.add('active');
        errorElement[0].innerHTML = this.error;
        return false;
    }
}