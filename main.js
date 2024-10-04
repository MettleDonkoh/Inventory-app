
document.getElementById('inventory-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const itemPrice= document.getElementById('item-price').value;
    const numberofitems = document.getElementById('item-number of item').value;
    
    if (itemName && itemQuantity) {
        addItemToInventory(itemName, itemQuantity);
        document.getElementById('inventory-form').reset();
    }
});

document.getElementById('search-bar').addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const items = document.querySelectorAll('#inventory-list li');

    items.forEach(function (item) {
        const text = item.querySelector('span').textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

async function addItemToInventory(name, quantity) {

    
const createInventory=await fetch("http://localhost:8080/items",{headers:{"Content-type":"application/json"},method:'POST',body:JSON.stringify({name:name,quantity:quantity})})
    // const listItem = document.createElement('li');

    // const itemSpan = document.createElement('span');
    // itemSpan.textContent = `${name} - Quantity: ${quantity}`;
    // listItem.appendChild(itemSpan);

    // const editButton = document.createElement('button');
    // editButton.textContent = 'Edit';
    // editButton.classList.add('edit');
    // editButton.addEventListener('click', function() {
    //     editItem(listItem, name, quantity);
    // });
    // listItem.appendChild(editButton);

    // const deleteButton = document.createElement('button');
    // deleteButton.textContent = 'Delete';
    // deleteButton.classList.add('delete');
    // deleteButton.addEventListener('click', function() {
    //     moveToRecycleBin(listItem);
    // });
    // listItem.appendChild(deleteButton); 
   //await getItems()

    // inventoryList.appendChild(listItem);

}
async function getItems(){
    const inventoryList = document.getElementById('inventory-list');
    const response = await fetch("http://localhost:8080/items")
   
    if (!response.ok) return;
    const items = await response.json()
    console.log(items)
    inventoryList.innerHTML=""
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}: ${item.quantity}`;
    
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
          
        };
    
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => {
           
            listItem.remove();
        };
    
        
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
    
        inventoryList.appendChild(listItem);
    });
    
}
setTimeout(async() => {
   await getItems()
  }, "0");

function editItem(listItem, name, quantity) {
    const newName = prompt('Enter new name:', name);
    const newQuantity = prompt('Enter new quantity:', quantity);

    if (newName && newQuantity) {
        listItem.querySelector('span').textContent = `${newName} - Quantity: ${newQuantity}`;
    }
}

