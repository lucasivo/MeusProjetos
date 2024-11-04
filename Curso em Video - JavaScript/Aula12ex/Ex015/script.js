function verificar(){
    data = new Date()
    ano = data.getFullYear()
    fano = document.getElementById('txtano')
    res = document.querySelector('div#res')
    
    if(fano.value.length == 0 || Number(fano.value > ano)){
        alert('[ERRO] Verifique os dados e tente novamente!')
    } else fsex = document.getElementsByName('radsex')
    idade = ano - Number(fano.value)

    genero = ''
    img = document.createElement('img')
    img.setAttribute('id', 'foto')

    if(fsex[0].checked){
        genero = "homem"
        if(idade >= 0 && idade < 10){
            img.setAttribute('src', 'menino.png')
        } else if (idade < 21){
            img.setAttribute('src', 'jovemhomem.png')
        } else if (idade < 50){
            img.setAttribute('src', 'homemadulto.png')
        } else {
            img.setAttribute('src', 'idoso.png')
        }

    } else if(fsex[1].checked){
        genero = "mulher"
        if(idade >= 0 && idade < 10){
            img.setAttribute('src', 'menina.png')
        } else if (idade < 21){
            img.setAttribute('src', 'jovemmulher.png')
        } else if (idade < 50){
            img.setAttribute('src', 'mulheradulta.png')
        } else {
            img.setAttribute('src', 'idosa.png')
        }
    }
    res.style.textAlign = 'center'
    res.innerHTML = `Detectamos ${genero} com ${idade} anos.`
    res.appendChild(img)
}