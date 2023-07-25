// ! değer atama
const gider = document.getElementById('inputx')
const fiyat = document.getElementById('inputy')
const ekle = document.getElementById('addx')
const listArea = document.getElementById('list')
const checkBox = document.getElementById('checkbox')
const sumPrice = document.getElementById('sum-price')
const userInput = document.getElementById('username')
const select = document.getElementById('select')

// ! olay izleme

ekle.addEventListener('click', mainfuc)
listArea.addEventListener('click', degistir)
userInput.addEventListener('input', usernameSave)
document.addEventListener('DOMContentLoaded', getUser)
select.addEventListener('change', filter)

// ! fonksiyonlar

// genel fonksiyon

function mainfuc() {

    if (!gider.value || !fiyat.value) {
        document.getElementById("inputx").placeholder = "Boş Bırakılamaz"
        document.getElementById("inputy").placeholder = "Boş Bırakılamaz"
        gider.id = 'inputz'
        fiyat.id = 'inputz'
        return;
    }
    gider.id = 'inputx'
    fiyat.id = 'inputy'
    document.getElementById("inputx").placeholder = "Harcama Kalemi Girin"
    document.getElementById("inputy").placeholder = "Fiyatını Girin"
    // div ekleme 
    const newDiv = document.createElement('div')

    //  div class
    newDiv.classList.add('newdiv')

    // div içi

    newDiv.innerHTML = `
<h2 class="name">${gider.value}</h2>
<h2 class="price">${fiyat.value}</h2>
<div class="btns">
    <img id="edit" src="img/pay.png">
    <img id="delete" src="img/delete.png">
</div>
`

    listArea.appendChild(newDiv)

    // tik yapılması sonucu "payed" clasını ekleme

    if (checkBox.checked === true) {
        newDiv.classList.add('payed')
    }


    // diğer
    updateSum(fiyat.value)


    // Temizleme kodu
    gider.value = ""
    fiyat.value = ""
    checkBox.checked = false

}

// toplama fonksiyonu
let sum = 0;

function updateSum(toplama) {
    sum += Number(toplama)

    sumPrice.textContent = sum
}

// js de oluşturulan div değiştirme ve silme fonksiyon

function degistir(x) {
    const tiklama = x.target
    const parent = tiklama.parentElement.parentElement

    if (tiklama.id === ('delete')) {

        parent.remove();

        const silme = parent.querySelector('.price').textContent

        updateSum(Number(silme) * -1)
    }

    if (tiklama.id === ('edit')) {
        parent.classList.toggle('payed')
    }
}

//  ismi local storage kaydetme

function usernameSave(z) {
    localStorage.setItem('username', z.target.value);
}

// local storage den veri alma

function getUser() {
    // local'edn ismi al | isim yoksa null yerine "" olsun
    const usernameto = localStorage.getItem('username') || '';

    // kullanıcı ismini inputa aktar
    userInput.value = usernameto;
}

// ! Filtre

function filter(eventt) {
    const selected = eventt.target.value
    const items = list.childNodes

    items.forEach((item) => {

        switch (selected) {

            case 'all':
                item.style.display = 'flex'
                break;

            case 'payed':
                if (item.classList.contains('payed')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;

            case 'not-payed':
                if (!item.classList.contains('payed')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
        }
    })
}