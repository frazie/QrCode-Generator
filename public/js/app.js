// get data from the DOM
const form = document.getElementById('generate-code');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault(); //prevents the dom from submitting anything on load of the page

    clearUI()
    //this function clears the dom before any new qrcode is made..it removes the button and the previous qrcode

    const url = document.getElementById('urlText').value 
    const size = document.getElementById('size').value 


    if (url === ''){
        //if the entry is empty/null the alert below will be shown 
        alert('Please enter a text or URL for QrCode generation')
    }else{
        //once the entry if correct,the spinner will show in a second after which the hide spinner function will show
        showSpinner()

        setTimeout(()=>{
            hideSpinner()

            codeGenerator(url, size) //this function generated the qrcode while taking in the url text and the chosen size from the DOM

            setTimeout(() => { //the set time out is set to get the source of the image before it has been submitted for download
                const saveUrl = qr.querySelector('img').src
                saveImage(saveUrl) //this function allows for the qrcode to me downloaded 
            }, 50)
        }, 1000)
    }
}
//this function takes in the url and size of the text selected
const codeGenerator = (url, size) => {
    const qrcode = new QRCode('qrcode',{ //this is an inbuilt function of the qrcode js package that allows for the generation of the qrcode
        text: url,
        size: size,
        height: size,
    })
}

//the function showSpinner shows the spinner after the text has been entered by changing the displa property to block from none
const showSpinner= () => {
    document.getElementById('spinner').style.display = 'block'
}
//this function will hide the spinner by returning the display of the spinner back to none once the result is generated within the setTimeout limit
const hideSpinner= () => {
    document.getElementById('spinner').style.display = 'none'
}

//this function clears the UI of any data from an previous qrCode generation....>>the qr is set to blank and the previous generated save button is removed
const clearUI = () => {
    qr.innerHTML = ''
    const saveBtn = document.getElementById('save-link')
    if (saveBtn) saveBtn.remove()
}

const saveImage = (saveUrl) => {
    const link = document.createElement('a')
    link.id = 'save-link'
    link.classList = 'bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5'
    link.href = saveUrl
    link.download = 'qrcode'
    link.innerHTML = 'Save QrCode Image'

    document.getElementById('generated').appendChild(link)
}

hideSpinner();

form.addEventListener('submit', onGenerateSubmit)