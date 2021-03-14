if (document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() 
{
    var removeVar = document.getElementsByClassName('btn-danger')
    for (var i=0; i<removeVar.length; i++)
        {
            var button=removeVar[i]
            button.addEventListener('click', removecartitem)
        }

    var quantityinputs=document.getElementsByClassName('cart-quantity-input')
    for (var i=0; i<quantityinputs.length; i++)
    {
        var input=quantityinputs[i]
        input.addEventListener('change',quantitychanged)
    }

    var addtocartbtns=document.getElementsByClassName('shop-item-button')
    for (var i=0; i<addtocartbtns.length; i++)
    {
        var button=addtocartbtns[i]
        button.addEventListener('click',addtocartclicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseclicked)
}

function purchaseclicked()
{
alert('thank you for your purchase')
var cartitems=document.getElementsByClassName('cart-items')[0]
while(cartitems.hasChildNodes())
{
    cartitems.removeChild(cartitems.firstChild)
}
updatetotal()
}

function removecartitem(event)
{   
    var btnclicked=event.target
    btnclicked.parentElement.parentElement.remove()
    updatetotal()
}

function quantitychanged(event)
{
    var input=event.target
    if (isNaN(input.value) || input.value<=0) 
    {
        input.value=1
    }
    updatetotal()
}

function addtocartclicked(event)
{
    var button=event.target
    var shopitem=button.parentElement.parentElement
    var title=shopitem.getElementsByClassName('shop-item-title')[0].innerText
    var price=shopitem.getElementsByClassName('shop-item-price')[0].innerText
    var imagesrc=shopitem.getElementsByClassName('shop-item-image')[0].src
    additemtocart(title,price,imagesrc)
    updatetotal()
}

function additemtocart(title,price,imagesrc)
{
    var cartrow=document.createElement('div')
    cartrow.classList.add('cart-row')
    var cartitems=document.getElementsByClassName('cart-items')[0]
    var cartitemnames=cartitems.getElementsByClassName('cart-item-title')
    for(var i=0; i<cartitemnames.length;i++)
    {
        if (cartitemnames[i].innerText==title)
        {alert('this item is already added to the cart')
        return}
    }
    var cartrowcontents=`
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imagesrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartrow.innerHTML=cartrowcontents
    cartitems.append(cartrow)
    cartrow.getElementsByClassName('btn-danger')[0].addEventListener('click',removecartitem)
    cartrow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantitychanged)
}

    function updatetotal()
    {
        var cartitemcontainer=document.getElementsByClassName('cart-items')[0]
        var cartrows=cartitemcontainer.getElementsByClassName('cart-row')
        var total=0
        for (var i=0; i<cartrows.length; i++)
        {
            var cartrow=cartrows[i]
            var priceelement=cartrow.getElementsByClassName('cart-price')[0]
            var quantityelement=cartrow.getElementsByClassName('cart-quantity-input')[0]
            var price=parseFloat(priceelement.innerText.replace('Dt', ''))
            var quantity=quantityelement.value
            total=total+(price*quantity)
        }
        total=math.round(total*100)/100
        document.getElementsByClassName('cart-total-price')[0].innerText=total+'Dt'
    }