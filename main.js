//get total
//create product
//save localstorage
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

console.log(title,price,taxes,ads,discount,total,count,category,submit)

function getTotal(){
if(price.value != ' '){
    let result=(+price.value + +taxes.value + +ads.value)
    - +discount.value
    total.innerHTML=result;
    total.style.background='#040';
}
else{
    total.innerHTML='';
    total.style.background='#a00d02';
}
}

//create product
let datapro;
if(localStorage.product != null){
    datapro=JSON.parse(localStorage.product)
}
else{
   datapro=[]; 
}

submit.onclick=function(){
   let newpro={
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
   } 
   datapro.push(newpro);
   localStorage.setItem('product',  JSON.stringify(datapro))
   //console.log(datapro);
   cleardata();
   showData();
}

//clear data
function cleardata(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}


function showData(){

    let table = ''; 
    for (let i = 0; i < datapro.length; i++) {
        table +=`
            <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].tax}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update"> update </button></td>
                <td><button onclick="deleteData (${i})" id="delete"> delete </button></td>
            </tr>
        `;
    }
        document.getElementById('tbody').innerHTML = table;
        let btnDelete = document.getElementById('deleteAll');
        if(datapro.length > 0){
            btnDelete.innerHTML = `<button onclick="DeleteAll()">  Delete All </button>`;
        }else{
            btnDelete.innerHTML = '';
        }
}
showData();
//count one or more product
//delete

function deleteData(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}

function DeleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}

//update

function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    tax.value = datapro[i].tax;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = datapro[i].category;
    submit.innerHTML = 'update';
    mood ='update';
    temp =i;
    scroll({
        top : 0,
        behavior:'smooth'
    })
}
//search

let searchmood = 'title';

function getSearchMood(id){

    let search = document.getElementById("search");
    if(id == 'searchTitle'){
        searchmood = 'title';
        search.placeholder = 'search by title';
    }else{
        searchmood = 'category';
        search.placeholder = 'search by category';
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value){
    let table = '';
    if(searchmood == 'title'){
        
        for (let i = 0; i < datapro.length; i++) {
            if(datapro[i].title.includes(value)){
                table +=`
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].tax}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update"> update </button></td>
                <td><button onclick="deleteData (${i})" id="delete"> delete </button></td>
            </tr>
        `;
            }
        }
    }else{
        for (let i = 0; i < datapro.length; i++) {
            if(datapro[i].category.includes(value)){
                table +=`
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].tax}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update"> update </button></td>
                <td><button onclick="deleteData (${i})" id="delete"> delete </button></td>
            </tr>
        `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;

}

//clean data