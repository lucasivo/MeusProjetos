function tabuada(){
    let num = document.getElementById('txtn')
    op = document.getElementsByName('radop')
    res1 = document.querySelector('div#res1')
    res2 = document.querySelector('div#res2')
    if(num.value.length == 0){
            alert('Por favor digite um número válido entre 1 e 9')
    } else
    if(Number(num.value) >= 1 && Number(num.value) <= 9)
        {
    n = Number(num.value)
    res2.innerHTML = ''
    if(op[0].checked){
        res1.innerHTML = 'Soma: '
        for(c = 1; c <= 9; c++){
            res2.innerHTML += `${n} + ${c} = ${n + c}<br>`
        }
    }
    if(op[1].checked){
        res1.innerHTML = 'Subtração: '
        for(c = 1; c <= 9; c++){
            res2.innerHTML += `${n} - ${c} = ${n - c}<br>`
        }
    }
    if(op[2].checked){
        res1.innerHTML = 'Multiplicação: '
        for(c = 1; c <= 9 ; c++){
            res2.innerHTML += `${n} x ${c} = ${n * c}<br>`
        }
    }
    if(op[3].checked){
        res1.innerHTML = 'Divisão: '
        for(c = 1; c <= 9; c++){
            res2.innerHTML += `${n} % ${c} = ${n / c}<br>`
        }
    }
    } else alert('Por favor, digite um número válido entre 1 e 9!')
    
}