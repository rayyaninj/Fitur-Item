const url = "https://fakestoreapi.com/products";
const cart = [];
const barang = [];

const divProduk = document.getElementsByClassName("div-produk");
const ambilData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  barang.push(data);

  data.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button class="bg-sky-500 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
      </div>
    `;
  });

  let totalKeranjang = document.getElementsByClassName("cart_count")[0];
  const btnAddCart = document.getElementsByTagName("button");

  Array.from(btnAddCart).forEach((tombol) => {
    tombol.addEventListener("click", function () {
      let title = tombol.closest("div").querySelector(".title").innerText;
      let category = tombol.closest("div").querySelector(".category").innerText;
      let description = tombol
        .closest("div")
        .querySelector(".description").innerText;

      cart.push({ title: title, category: category, description: description });
      totalKeranjang.innerText = cart.length;
    });
  });
};
ambilData();

// Event listener untuk tombol "Tutup"
const modalKeranjang = document.getElementsByClassName("modal")[0];
const btnTutup = document.getElementsByClassName("btn-tutup")[0];
const btnTampilKeranjang =
  document.getElementsByClassName("tampil-keranjang")[0];
const keranjangAnda = document.getElementsByClassName("keranjang-anda")[0];

btnTutup.addEventListener("click", () => {
  modalKeranjang.classList.add("hidden");
});

btnTampilKeranjang.addEventListener("click", () => {
  modalKeranjang.classList.remove("hidden");
  keranjangAnda.innerHTML = "";
  cart.forEach((item, index) => {
    keranjangAnda.innerHTML += `
      <div class="bg-white rounded my-3 p-3">
        <span class="block font-bold text-xl">${item.title}</span>
        <button class="hapus-item bg-red-500 px-2 py-1 rounded text-white">Hapus</button>
      </div>
    `;
  });

  const btnHapusItem = document.getElementsByClassName("hapus-item");
  Array.from(btnHapusItem).forEach((btn, index) => {
    btn.addEventListener("click", () => {
      cart.splice(index, 1); // Hapus item dari keranjang
      const totalKeranjang = document.getElementsByClassName("cart_count")[0];
      totalKeranjang.innerText = cart.length; // Update total keranjang
      btn.parentElement.remove(); // Hapus elemen dari tampilan
    });
  });
});

const searchBar = document.querySelector(".searchbar");
searchBar.addEventListener("keyup", (e) => {
  let namaBarang = e.target.value.toLowerCase();
  const hasilcari = barang[0].filter((item) => {
    return item.title.toLowerCase().includes(namaBarang);
  });
  const divProduk = document.getElementsByClassName("div-produk");
  divProduk[0].innerHTML = "";
  hasilcari.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button class="bg-sky-500 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
      </div>
    `;
  });

  // Event listener untuk tombol "Tambah ke keranjang" setelah pencarian
  const btnAddCart = document.getElementsByTagName("button");
  Array.from(btnAddCart).forEach((tombol) => {
    tombol.addEventListener("click", function () {
      let title = tombol.closest("div").querySelector(".title").innerText;
      let category = tombol.closest("div").querySelector(".category").innerText;
      let description = tombol
        .closest("div")
        .querySelector(".description").innerText;

      cart.push({ title: title, category: category, description: description });
      const totalKeranjang = document.getElementsByClassName("cart_count")[0];
      totalKeranjang.innerText = cart.length;
    });
  });
});
