
const $addFormEl = $('#all-add-form')
const $btnAddItemEl = $('#add_item')
const $btnSearchItemEl = $('#search-item')
const $add_formEl = $('#form-add-item')
const $search_formEl = $('#form-search-item')
const $contact_formEl = $('#form-contact-sup')
const $nameEl = $('#brand-name')
const $selectTypeEl = $('#type-item')
const $supNameEl = $('#supplier-name')
const $boxEmailEl = $('#box-email')
const $boxPhoneEl = $('#box-phone-number')
const $boxWebEl = $('#box-web-site')
const $emailEl = $('#supplier-email')
const $phoneEl = $('#supplier-number')
const $webEl = $('#supplier-web')
const $stockEl = $('#stock-number')
const $setPoint = $('#set-point')
const $areaWarning = $('#table-warn-item')
const $btnSearch = $('#search')
const $searchName = $('#search-brand-name') 
const $areaSearch = $('#table-search-item')
const $btnClearAll= $('#clear-all-search')

let itemObj =[]

const getAllStorage = function() {
   return   new Promise(function(resolve,reject) { 
        let values = []
        keys = Object.keys(localStorage),
        i = keys.length;
        while ( i-- ) {
            values.push(JSON.parse(localStorage.getItem(keys[i])));
        }if(values.length = localStorage.length){
            resolve(values)
        }else{
            reject(`reject`)
        }
    })
}

getAllStorage().then((result) => {
    console.log(`get item success`);
    itemObj = result
})
getAllStorage().catch((result) => {
    console.log(`fail to get item from local storage.${reject}`);
})

getAllStorage()

const detailItem= function(input){
    const $tableDetailItem = $('<tr>')
    $tableDetailItem.append($('<td>').text(input.name))
    $tableDetailItem.append($('<td>').text(input.stock))
    $tableDetailItem.append($('<td>').text(input.type))
    $tableDetailItem.append($('<td>').text(input.supplier))
    $tableDetailItem.append($('<td>').text(input.email))
    $tableDetailItem.append($('<td>').text(input.phone))
    $tableDetailItem.append($('<td>').text(input.web))
    $tableDetailItem.append($('<td>').text(input.setpoint))

    return $tableDetailItem
}

const warningItem = function(){
    //const itemWarn = [] //Test Jasmine only
    for(let i=0; i<itemObj.length; i++ ){
        if(parseInt(itemObj[i].stock)<=parseInt(itemObj[i].setpoint)){
            console.log('Item warning') 
            $areaWarning.append(detailItem(itemObj[i]))
           // itemWarn.push(itemObj[i].name) //Test Jasmine only
        }
    }
    //return itemWarn //Test Jasmine only
}

warningItem()

const searchItem = function(input){
    //const itemSearch = [] //Test Jasmine only
    for(let i=0; i<itemObj.length; i++ ){
        debugger
        if(itemObj[i].name===input){
            console.log('success search')
            $areaSearch.append(detailItem(itemObj[i]).append(editButton()))
            //itemSearch.push(itemObj[i].name) //Test Jasmine only
            break;
        }
    }
    //return itemSearch //Test Jasmine only
}

const editItem =function(){
    if($add_formEl.hasClass('hidden')){
        $btnAddItemEl.trigger('click')
    }
    const nameItem = $(this).parent().children()[0].textContent
    for(let i =0; i<itemObj.length;i++){
        if(itemObj[i].name===nameItem){
            $nameEl.val(itemObj[i].name)
            $selectTypeEl.val(itemObj[i].type)
            $supNameEl.val(itemObj[i].supplier) 
            if(itemObj[i].email!==''){
                $boxEmailEl.trigger('click');
                $emailEl.val(itemObj[i].email);
            }
            if(itemObj[i].phone !==''){
                $boxPhoneEl.trigger('click');
                $phoneEl.val(itemObj[i].phone);
            }
            if(itemObj[i].web !==''){
                $boxWebEl.trigger('click');
                $webEl.val(itemObj[i].web);
            }
            $stockEl.val(itemObj[i].stock)
            $setPoint.val(itemObj[i].setpoint)
            break
        }
    }
}

const editButton = function (){
    const $editButton = $('<th>')
    const $inputTag =$('<input>')
    $inputTag.attr('type','button')
    $inputTag.attr('value','edit')
    $editButton.append($inputTag)
    $editButton.on('click',editItem)
    return $editButton
}

$btnSearch.on('click',()=>{
    let inputSearch = $searchName.val()
    searchItem(inputSearch)
})

class Item{
    constructor(name,type,supplier,email,phone,web,stock,setpoint){
        this.name = name;
        this.type = type;
        this.supplier = supplier;
        this.email = email;
        this.phone = phone;
        this.web = web;
        this.stock = stock;
        this.setpoint = setpoint
    } 
}

const addItem = function(){ 
    let item = new Item(
        $nameEl.val(),
        $selectTypeEl.val(),
        $supNameEl.val(),
        $emailEl.val(),
        $phoneEl.val(),
        $webEl.val(),
        $stockEl.val(),
        $setPoint.val()
    );
    localStorage.setItem($nameEl.val(),JSON.stringify(item));
    getAllStorage();
    warningItem()
}

const buttonSelect = function(){
    $(this).parent().next().toggleClass('hidden')
}
const boxSelect = function(){
    $(this).next().next().toggleClass('hidden')
}

$btnAddItemEl.on('click',buttonSelect)
$btnSearchItemEl.on('click',buttonSelect)
$boxEmailEl.on('click',boxSelect)
$boxPhoneEl.on('click',boxSelect)
$boxWebEl.on('click',boxSelect)

const validLengthText = function(input,min){
    let testLength = input.val()
    if(testLength.trim().length >= min){
        return true
    }else{
        return false
    }
}

const validCheck = function(input){
    let valid =false
    if(input[0].checked && validLengthText(input.next().next(),1)){
        valid = true
        return valid
    }else{
        return valid
    }
}

$addFormEl.on('submit',function(e){ 
    if(validCheck($boxEmailEl) || validCheck($boxPhoneEl) || validCheck($boxWebEl)){
        validTotal = true
        addItem();
        console.log('store success')
    }else{
        validTotal = false;
        $contact_formEl.addClass('invalid')
        e.preventDefault()
        console.log('Bad input')
    }
})

