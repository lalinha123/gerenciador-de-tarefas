const abreAddForm = () => {
    const form = document.querySelector('#addTarefa');
    form.style.display = 'block';
}

const fechaAddForm = () => {
    const form = document.querySelector('#addTarefa');
    form.style.display = 'none';
}

const abreEditor = (id) => {
    const editor = document.getElementById(`editor${id}`);
    editor.style.display = 'block';
}

const fechaEditor = (id) => {
    const editor = document.getElementById(`editor${id}`);
    editor.style.display = 'none';
}