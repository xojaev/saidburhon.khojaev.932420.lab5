document.addEventListener('DOMContentLoaded', () => {
    const gadgetList = document.getElementById('gadget-list');
    const themeToggleBtn = document.querySelector('#theme-toggle');
    const addGadgetBtn = document.querySelector('#add-gadget');
    const deleteLastBtn = document.querySelector('#delete-last');
    const toggleListBtn = document.querySelector('#toggle-list');
    const navLinks = document.querySelectorAll('.nav a');

    if (!gadgetList) {
        console.error('Ошибка: элемент #gadget-list не найден на странице.');
        return;
    }

    let gadgets = JSON.parse(localStorage.getItem('gadgets_data')) || [
        { id: Date.now() + 1, name: 'iPhone 15 Pro', specs: ['A17 Pro', 'Титан', '48 МП'] },
        { id: Date.now() + 2, name: 'Asus TUF F15', specs: ['RTX 4060', '144 Гц', '16 ГБ'] }
    ];

    let isLightTheme = localStorage.getItem('theme') === 'light';

    function applyTheme() {
        if (isLightTheme) {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    }

    function renderGadgets() {
        gadgetList.innerHTML = '';

        gadgets.forEach(gadget => {
            const card = document.createElement('div');
            card.classList.add('gadget-item');
            card.setAttribute('data-id', gadget.id);

            const title = document.createElement('h3');
            title.textContent = gadget.name;

            const list = document.createElement('ul');
            gadget.specs.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                list.appendChild(li);
            });

            const delBtn = document.createElement('button');
            delBtn.classList.add('btn-delete-item');
            delBtn.textContent = 'Удалить';
            
            delBtn.addEventListener('click', () => {
                gadgets = gadgets.filter(g => g.id !== gadget.id);
                saveToLocalStorage();
                renderGadgets();
            });

            card.appendChild(title);
            card.appendChild(list);
            card.appendChild(delBtn);
            gadgetList.appendChild(card);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('gadgets_data', JSON.stringify(gadgets));
    }

    themeToggleBtn.addEventListener('click', () => {
        isLightTheme = !isLightTheme;
        applyTheme();
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    });

    addGadgetBtn.addEventListener('click', () => {
        const name = prompt('Введите название гаджета:');
        if (!name) return;

        const specsInput = prompt('Введите характеристики через запятую (например: 120 Гц, 5000 мАч):');
        const specs = specsInput ? specsInput.split(',').map(s => s.trim()) : ['Характеристики не указаны'];

        const newGadget = {
            id: Date.now(),
            name: name,
            specs: specs
        };

        gadgets.push(newGadget);
        saveToLocalStorage();
        renderGadgets();
    });

    deleteLastBtn.addEventListener('click', () => {
        if (gadgets.length > 0) {
            gadgets.pop();
            saveToLocalStorage();
            renderGadgets();
        } else {
            alert('Список гаджетов пуст!');
        }
    });

    toggleListBtn.addEventListener('click', () => {
        gadgetList.classList.toggle('hidden');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log(`Переход по ссылке: ${link.textContent}`);
        });
    });

    applyTheme();
    renderGadgets();
});