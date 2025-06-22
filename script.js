"use strict";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndUpdateProducts();
  const swiper = new Swiper('.swiper', {
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  });


});

const fetchAndUpdateProducts = async() => {
  try {
    const productsFetch = await fetch("./php/get_products.php");
    const productsJson = await productsFetch.json();
    const productsList = document.querySelector("#products-list");
    const productsHtml = productsJson.map((product) => getCardHtml({
      id:product.id ,
      title: product.title,
      price: product.price
    })).join("");
    productsList.innerHTML  = productsHtml;

  }catch(error) {
    console.error(error);
  }
  
  

}

const getCardHtml = ({
  title, price, id
}) => {
 return `<div class="card">
         <div>
          <div class="title">${title}</div>
            <div class="price">${price}</div>
         </div>
         <button onclick="onUpdate({title: '${title}',price:${price}, id: ${id}})">UPDATE</button>
          <button onclick="onDelete(${id})">DELETE</button>
        </div>`
}

const onDelete  = async(id) => {
  console.log('delete', id);
   await fetch("./php/delete_product.php", {
    body: JSON.stringify({
      id: id
    }),
    method: "post"
  });
  window.location.reload();
  
  
}

const onCreate = async() => {
  try {
    const titleElement = document.querySelector("#product-title");
    const priceElement = document.querySelector("#product-price");
    const titleString = titleElement.value;
    const priceNumber = Number(priceElement.value);

    await fetch('./php/add_product.php', {
      method: 'post',
      body: JSON.stringify({
        title: titleString,
        price: priceNumber
      })
    })
  window.location.reload();

  }catch(error) {
    console.log("🚀 ~ script.js ~ onCreate ~ error:", error)
    
  }
    
}

const onUpdate = async (object) => {
  const {price, title, id} = object;
  const form = document.querySelector("#update-form");

  form.innerHTML = `
    <div>
      <input placeholder="title" value="${title}" id="product-${id}-title"/>
      <input placeholder="price" value="${price}" id="product-${id}-price" type="number"/>
      <button onClick="updateProduct(${id})">UPDATE</button>
    </div>
  `

}

const updateProduct =  async (id) => {
  const priceElement = document.querySelector(`#product-${id}-title`);


  await fetch('./php/update_product.php', {
      method: 'post',
      body: JSON.stringify({
        id: id,
        title: priceElement.value,
      })
    })

  window.location.reload();

}