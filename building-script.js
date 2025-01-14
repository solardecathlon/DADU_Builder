let totalPrice = 0;

function createDraggableElement(type, price) {
    const element = document.createElement('div');
    element.classList.add('draggable');
    element.draggable = true;
    element.textContent = type;
    element.dataset.price = price;

    element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', type);
    });

    return element;
}

const toolbox = document.getElementById('toolbox');
toolbox.appendChild(createDraggableElement('Room', 5000));
toolbox.appendChild(createDraggableElement('Kitchen', 10000));
toolbox.appendChild(createDraggableElement('Bathroom', 7500));

const canvas = document.getElementById('canvas');
canvas.addEventListener('dragover', (e) => e.preventDefault());
canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text');
    const element = createDraggableElement(type, e.target.dataset.price);
    element.style.position = 'absolute';
    element.style.left = `${e.clientX - canvas.offsetLeft}px`;
    element.style.top = `${e.clientY - canvas.offsetTop}px`;
    canvas.appendChild(element);
    
    totalPrice += parseInt(element.dataset.price);
    document.getElementById('totalPrice').textContent = totalPrice;
});

document.getElementById('saveProject').addEventListener('click', () => {
    // Implement save functionality
    alert('Project saved!');
});

document.getElementById('viewHouse').addEventListener('click', () => {
    window.location.href = 'render.html';
});
