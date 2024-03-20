class ShoppingList{
    static lastId=1;
    constructor(itemName,itemDescription=''){
        this._itemId = ShoppingList.lastId++;
        this._itemName = itemName;
        this._itemDescription = itemDescription;
        this._isDeleted = false;
        this._isCompleted = false;
    }
    get itemId(){
        return this._itemId;
    }
    set itemName(itemName){
        this._itemName = itemName;
    }
    get itemName(){
        return this._itemName;
    }

    set itemDescription(description){
        this._itemDescription = description;
    }
    set isDeleted(value){
        this._isDeleted = value;
    }
    set isCompleted(value){
        this._isCompleted = value;
    }
    get isCompleted(){
        return this._isCompleted;
    }
    get isDeleted(){
        return this._isDeleted;
    }

}
const shoppingList = [];
 

function render(){
    const table_body=document.querySelector("#table-list tbody")
    table_body.innerHTML = "";
    shoppingList.forEach(item=>{
        if(!item.isDeleted){
            const row=document.createElement("tr");
            row.classList.add("row-element");
            
            const itemNameElement=document.createElement("td")
            itemNameElement.textContent = item.itemName;

            const deleteButtonEle = document.createElement("td");
            deleteButtonEle.classList.add("button_parent");
            const deleteButton = document.createElement("button");
            deleteButton.dataset.id = item.itemId;
            deleteButton.classList.add("delete-btn");
            deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';

            
            deleteButtonEle.appendChild(deleteButton);
            row.appendChild(itemNameElement);
            row.appendChild(deleteButtonEle)

            if (item.isCompleted) {
                itemNameElement.classList.add("marked-class");
            }

            itemNameElement.addEventListener("click", function() {
                toggleCompletion(item, itemNameElement);
            });
            table_body.appendChild(row);
        }
    })
}

function productStatus(product){
    return product.isCompleted;
}
function count(){
    const c = shoppingList.filter(productStatus).length;

   
    const markedSection = document.getElementById('info-1');
    markedSection.innerHTML="";
    const unmarkedSection = document.getElementById('info-2');
    unmarkedSection.innerHTML="";
    
    const mHead = document.createElement('h3');
    const mPara = document.createElement('p');
    mHead.textContent = "Marked Items Count";
    mPara.textContent = c;

    markedSection.appendChild(mHead);
    markedSection.appendChild(mPara);

    
    
    const unmHead = document.createElement('h3');
    const unmPara = document.createElement('p');
    unmHead.textContent = "UnMarked Items Count";
    unmPara.textContent =shoppingList.length-c;

    unmarkedSection.appendChild(unmHead);
    unmarkedSection.appendChild(unmPara);
    
}

render();
count();
function toggleCompletion(item, element) {
    item.isCompleted = !item.isCompleted;
    element.classList.toggle("marked-class");
    count();
}
function handleDelete(event) {
    const id = parseInt(event.target.dataset.id);
    const index = shoppingList.findIndex(item => item.itemId === id);
    if (index !== -1) {
        shoppingList[index].isDeleted=true;
        render();
        count();
    }
 }

document.querySelector("#table-list tbody").addEventListener("click", function(event) {
    if(event.target.classList.contains("delete-btn")) {
      handleDelete(event);
    }
 });


 function Additem(){
    let additeminput=document.getElementById("add-item-input");
    if(additeminput.value===""){
        alert("Please give proper input");
    }
    else{
        const newItem = new ShoppingList(additeminput.value);
        shoppingList.unshift(newItem);
        additeminput.value="";
        render();
        count();
    }
 }

 