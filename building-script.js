let totalPrice = 0;

function createDraggableElement(type, price) {
    const element = document.createElement('div');
    element.classList.add('draggable');
    element.draggable = true;
    element.innerHTML = `${type}<br>$${price}`;
    element.dataset.price = price;

    element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({type, price}));
    });

    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showDeleteMenu(e, element);
    });

    return element;
}

function showDeleteMenu(e, element) {
    const deleteMenu = document.createElement('div');
    deleteMenu.classList.add('delete-menu');
    deleteMenu.innerHTML = 'Delete';
    deleteMenu.style.left = `${e.clientX}px`;
    deleteMenu.style.top = `${e.clientY}px`;

    deleteMenu.addEventListener('click', () => {
        totalPrice -= parseInt(element.dataset.price);
        document.getElementById('totalPrice').textContent = totalPrice;
        element.remove();
        deleteMenu.remove();
    });

    document.body.appendChild(deleteMenu);

    // Remove menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function removeMenu(e) {
            if (e.target !== deleteMenu) {
                deleteMenu.remove();
                document.removeEventListener('click', removeMenu);
            }
        });
    }, 0);
}

const toolbox = document.getElementById('toolbox');
toolbox.appendChild(createDraggableElement('Room', 5000));
toolbox.appendChild(createDraggableElement('Kitchen', 10000));
toolbox.appendChild(createDraggableElement('Bathroom', 7500));

const canvas = document.getElementById('canvas');

canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    let data;
    
    try {
        data = JSON.parse(e.dataTransfer.getData('text/plain'));
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return;
    }
    
    const element = createDraggableElement(data.type, data.price);
    
    // Calculate grid position
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 102);
    const y = Math.floor((e.clientY - rect.top) / 102);
    
    element.style.gridColumnStart = x + 1;
    element.style.gridRowStart = y + 1;
    
    // Check if the cell is already occupied
    const existingElement = document.elementFromPoint(e.clientX, e.clientY);
    if (existingElement && existingElement !== canvas && existingElement.classList.contains('draggable')) {
        return; // Cell is occupied, don't place the new element
    }
    
    canvas.appendChild(element);
    
    totalPrice += parseInt(data.price);
    document.getElementById('totalPrice').textContent = totalPrice;
});

document.getElementById('saveProject').addEventListener('click', () => {
    // Implement save functionality
    alert('Project saved!');
});

document.getElementById('viewHouse').addEventListener('click', () => {
    window.location.href = 'render.html';
});
