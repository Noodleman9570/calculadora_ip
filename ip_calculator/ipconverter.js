$(document).ready(function(){
    
    var table = $('#example').DataTable({
        'pageLength': 25,
        "pagingStyle": "simple",

        responsive: true,
    

        "language": {
            "processing": "Procesando...",
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningún dato disponible en esta tabla",
            "info": "Mostrando la pagina _PAGES_ de _PAGES_",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "loadingRecords": "Cargando...",
            "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
          }  
    });
    
    table.buttons().container()
    .appendTo('#example_wrapper .col-md-6:eq(0)');

});

var ip;
var pref;
var nsub;

var global = [];

class IP {

    constructor(ip, pref){

        this.pref = pref;

        this.ip = ip;
        this.ipBin = this.decToBin(ip);
        //console.log(this.ipBin);

        this.maskBin = this.setMaskBin(pref);
        //console.log(this.maskBin);
        this.maskDec = this.binToDec(this.maskBin);

        this.wildcardBin = this.setWildcardBin(pref);
        //console.log(this.wildcardBin);
        this.wildcarDec = this.binToDec(this.wildcardBin);
        //console.log(this.wildcarDec);

        this.netBin = this.calcNet(this.ipBin, this.maskBin);
        //console.log(this.netBin);
        this.netDec = this.binToDec(this.netBin)
        //console.log(this.netDec);

        this.rangoHost = this.numHost(pref);
        this.firstHostBin = this.firstHost(this.netBin, pref);
        this.firstHostDec = this.binToDec(this.firstHostBin);
        //console.log(this.firstHost)
        this.lastHostBin = this.lastHost(this.netBin, pref);
        this.lastHostDec = this.binToDec(this.lastHostBin);

        this.broadcastBin = this.getBroadcast(this.netBin, pref);
        //console.log(this.broadcastBin)
        this.broadcastDec = this.binToDec(this.broadcastBin);
        console.log(this.broadcastDec)

        this.nHost = this.cantHost(pref);


        //console.log(this.broadcast);

    }

    separateString(array){
        //console.log(array);
        let aux='';

        for (let i = 0; i < array.length; i++) {
            if (i<3) {
                aux = aux+array[i]+'.';
            }else{
                aux = aux+array[i];
            }
            
            
        }

        return aux;

    }

    numHost(pref){
        let nBits = (32-pref);

        let nHost = Math.pow(2,nBits) - 2;

        return nHost;

    }

    firstHost(netBin, pref){
        let nBitH = (32-pref);

        let action = 'firstHost';

        $.ajax({
            url:'process.php', 
            type:'POST',
            async :false,
            data: {action:action,nBitH:nBitH,netBin:netBin},

            success:function(response)
            {                     
                global = JSON.parse(response)
            },

            error:function(error){
            }
        
        });    

        return global;
        
    }

    lastHost(netBin, pref){

        let action = 'lastHost';

        $.ajax({
            url:'process.php', 
            type:'POST',
            async :false,
            data: {action:action,pref:pref,netBin:netBin},

            success:function(response)
            {                     
                global = JSON.parse(response)
            },

            error:function(error){
            }
        
        });    

        return global;
        
    }

    getBroadcast(netBin, pref){

        let action = 'broadcast';

        $.ajax({
            url:'process.php', 
            type:'POST',
            async :false,
            data: {action:action,pref:pref,netBin:netBin},

            success:function(response)
            {                     
                global = JSON.parse(response)
            },

            error:function(error){
            }
        
        });    

        return global;
        
    }

    stringToArray(str){
        console.log(str);
        let array = [];
        const afterSplit = str.split('.');
        array = afterSplit;
        return array;
    }

    decToBin(str){
        let binary = []
        let arr = this.stringToArray(str);
        let subBin = '';
        let size = 0;
        arr.forEach((element, i) => {
            const ipAddrInt = parseInt(element);
            subBin = ipAddrInt.toString(2);
            binary[i] = subBin.padStart(8, '0')
        })

      return binary;
    }


    binToDec(array){

        let action = 'binToDec';
        $.ajax({
            url:'process.php', 
            type:'POST',
            async :false,
            data: {action:action,array:array},

            success:function(response)
            {                     
                global = JSON.parse(response)
            },

            error:function(error){
            }
        
        });    

        return global;

    }

    setMaskBin(pref){

            var action = 'getMask';
     
             $.ajax({
                 url:'process.php', 
                 type:'POST',
                 async :false,
                 data: {action:action,pref:pref},
     
                 success:function(response)
                 {
                    
                    global = JSON.parse(response);
                 },

                 error:function(error){
                 }
          
             });    

            return global;

    }

    setWildcardBin(pref){
        let action = 'setWildcard'

        // for (let i = 0; i < 4; i++) {
        //     for (let j = 0; j < 8; j++) {
        //         if (cont<pref) {
        //             aux = aux+'0';
        //         }else{
        //             aux = aux+'1';
        //         }
        //         cont++;
        //     }
        //     console.log(aux);
        //     wildCard[i] = aux;
        //     aux = 0;
        // }

        $.ajax({
            url:'process.php', 
            type:'POST',
            async :false,
            data: {action:action,pref:pref},

            success:function(response)
            {
               global = JSON.parse(response);
            },

            error:function(error){
            }
     
        });    

        return global;

    }

    calcNet(ipBin, maskBin){

        var action = 'netBin';

        $.ajax({
            url:'process.php', 
            type:'POST',
            async :false,
            data: {action:action,ipBin:ipBin,maskBin:maskBin},

            success:function(response)
            {
               
                global = JSON.parse(response);
            },

            error:function(error){
            }
     
        });    

        return global;

    }

    cantHost(pref){
        
        let nBitH = 0;
        let nHost = 0;
        nBitH = (32-pref);

        nHost = Math.pow(2, nBitH)-2;

        return nHost;

        
    }

    jumpNet(broadcast, pref){

        let action = 'nexNet'

        $.ajax({
            url:'process.php', 
            type:'POST',
            async :false,
            data: {action:action,broadcast:broadcast,pref:pref},

            success:function(response)
            {
               
                global = JSON.parse(response);
            },

            error:function(error){
            }
     
        });    

        return global;
    }
    

    renderTableIp(){
        let html;

        html = `
        <thead>
          <td>Item</td>
          <td>Decimal</td>
          <td>Binario</td>
      </thead>
      <tbody>
        <tr>
          <td>Dirección IPv4</td>
          <td>${this.ip}</td>
          <td>${this.separateString(this.ipBin)}</td>
        </tr>
        <tr>
          <td>Máscara de red</td>
          <td>${this.separateString(this.maskDec)}</td>
          <td>${this.separateString(this.maskBin)}</td>
        </tr>
        <tr>
          <td>Máscara Wildcard</td>
          <td>${this.separateString(this.wildcarDec)}</td>
          <td>${this.separateString(this.wildcardBin)}</td>
        </tr>
        <tr>
          <td>Dirección de red</td>
          <td>${this.separateString(this.netDec)}</td>
          <td>${this.separateString(this.netBin)}</td>
        </tr>
        <tr>
          <td>Dirección del primer host</td>
          <td>${this.separateString(this.firstHostDec)}</td>
          <td>${this.separateString(this.firstHostBin)}</td>
        </tr>
        <tr>
          <td>Dirección del último host</td>
          <td>${this.separateString(this.lastHostDec)}</td>
          <td>${this.separateString(this.lastHostBin)}</td>
        </tr>
        <tr>
          <td>Dirección de difusión</td>
          <td>${this.separateString(this.broadcastDec)}</td>
          <td>${this.separateString(this.broadcastBin)}</td>
        </tr>
        <tr>
          <td>Número de direcciónes asignables</td>
          <td>${this.nHost}</td>
          <td></td>
        </tr>
      </tbody>`;

        return html;

    }

    renderVlsmTable(nsub, array = {}){
        let html = `
            <thead>
                <th>Subred</th>
                <th>Número de Hosts</th>
            </thead>
            <tbody>
        `;




        for (let i = 0; i < nsub; i++) {

            html = html+ `

                <tr>
                    
                    <td>Subred ${i+1}</td>
                    <td>
                        <div class='input-group'>
                            <input class='form-control col-md-8' id='subred${i}' type='number' placeholder='Introduce el numero de host de la subred ${i+1}'>
                        </div>
                    </td>
                </tr>

            `;
            
        }

        html = html + `
            <tfooter>
                <tr>
                    <td class='col-md-12' colspan='3'>
                        <div class='d-grid gap-2 col-6 mx-auto'>
                            <button class='btn btn-primary col-6 mx-auto' id='calc_vlsm' >Calcular</button>
                        </div>
                    </td>
                </tr>
            </tfooter>
            
        </tbody>
            
        `;


        return html;

        


    }

    renderSubNettingTable(){
        let html = `
            <thead>
                <th>Subred</th>
                <th>Número de Hosts</th>
                <th>IP de red</th>
                <th>Mascara</th>
                <th>Primer Host</th>
                <th>Ultimo Host</th>
                <th>Boradcast</th>
            </thead>
            <tbody id='tbodyvlsm'>
            
            </tbody>
            
        `;

        return html;

    }

    renderSubNettingTableRows(index){
        let html = '';

            html = html+ `

                <tr>
                    
                    <td>Subred ${index+1}</td>
                    <td>${this.nHost}</td>
                    <td>${this.separateString(this.netDec)+' / '+ this.pref}</td>
                    <td>${this.separateString(this.maskDec)}</td>
                    <td>${this.separateString(this.firstHostDec)}</td>
                    <td>${this.separateString(this.lastHostDec)}</td>
                    <td>${this.separateString(this.broadcastDec)}</td>
                </tr>

            `;
            
        return html;

        
    }


    
    

    
}

$("#calc_btn").on("click", function(e){
    e.preventDefault();
    inicio();
    
})


function inicio(e){
    //$('#vlsmSubred').adClass("desactive");

    $('#vlsmhost').show();

    $('#vlsmSubred').hide();

    $('#example').hide();
    
    ip = $("#ip").val();
    pref = $('#pref').val();
    nsub = $('#nsub').val();

    let nBitH = (32-pref);

    let cantHost = Math.pow(2, nBitH);
    let cantHostSub = cantHost-2;
    cantHost = cantHost / 4;

    let band1 = false;
    let band2 = false;
    let band3 = false;
    let ipTs;

    band1 = isValidIP(ip);
    band2 = intoRange(pref, 32);
    band3 = intoRange(nsub, cantHost)
    
    if (band1) {
        if (band2) {
            if (band3) {
                
      
        let ipObj = new IP(ip, pref); //objeto de direccion ip


        $('#vlsmhost').html(ipObj.renderVlsmTable(nsub));



        $('#calc_vlsm').on('click', function(){

            calculate(cantHostSub, cantHost, ipTs, ipObj, nsub);

        });

        

        

        }else{
            alert("Minimo de sub redes: 1, Maximo de subredes: "+cantHost);
        }
    }else{
        alert("El prefijo de red debe estar comprendido entre 1 a 32");
    }




    }else{
        alert("La ip ingresada no cumple con el formato correcto")
    }
}

function calculate(cantHostSub, cantHost, ipTs, ipObj, nsub, arrayH = {}){
    //$('#vlsmSubred').removeClass("desactive");
    $('#tbodyvlsm').hide;
            
            let array = [];
            let band = false;
            
            let total = 0;

            for (let i = 0; i < nsub; i++) {
               
                array[i] = $('#subred'+i).val()
                if (array[i].length == 0) {
                    console.log(array[i]);
                    band = false;
                }else{
                    band = true;
                }
                
            }


            

                   

                    array = burbuja(array);

                    let n;
                    let h;
                    let sumNhosts = 0;
                    let pref;
                    let arrayPref = [];

                    for (let i = 0; i < array.length; i++) {

                        res = bitsNec(array[i])

                        n = res[0];
                        h = res[1];
                        
                        array[i] = h;
                        sumNhosts = sumNhosts + parseInt(array[i])
                        pref = (32-n);

                        arrayPref[i] = pref;
                        
                    }


            

            // alert(cantHost)
            // alert(total)

            if (sumNhosts <= cantHostSub) {
                
                $('#vlsmSubred').show();
                if (band) {

                    // console.log(array)
                    // console.log(arrayPref);

                    let ipObjArr = [];
                    let nxRedBin = [];
                    let nxRedDec = [];
                    let broadBin = [];

                    

                    for (let i = 0; i < array.length; i++) {
                        if (i == 0) {
                            nxRedDec = ipObj.netDec;
                            nxRedDec = nxRedDec.join(".");
                        }else{
                            broadBin = ipObjArr[i-1].broadcastBin;
                            nxRedBin = ipObj.jumpNet(broadBin, arrayPref[i-1]);
                            nxRedDec = ipObj.binToDec(nxRedBin);
                            nxRedDec = nxRedDec.join(".");

                        }

                        ipObjArr[i] = new IP(nxRedDec, arrayPref[i]);
                        
                    }

                    $('#vlsmhost').hide();

                    $('#example').show();

                    $('#example').html(ipObj.renderTableIp());

                    $('#vlsmSubred').html(ipObj.renderSubNettingTable())

                    let html = '';

                    for (let i = 0; i < ipObjArr.length; i++) {
                        
                        html = html + ipObjArr[i].renderSubNettingTableRows(i);
                        
                        
                    }   
                    
                    $('#tbodyvlsm').html(html);

                }else{
                    alert("No pueden haber campos vacios");
  
                }

            }else{
                alert("No se pueden tener en total mas de:  "+(cantHostSub)+" hosts entre las subredes");
                
                for (let i = 0; i < array.length; i++) {
                    $('#subred'+i).val(array[i]);
                    
                }
                
            }
}

function burbuja(lista) {

    lista = lista.sort(function(a, b){return b - a});;

    return lista;
        
}

function bitsNec(numHost){

    let n = 0;

    let h = 0;

    while (!(h >= numHost)) {
        h = Math.pow(2, n) - 2;
        n++
    }

    n--;

    return [n, h];

}

function isValidIP(str) {
    let verdad = str.split('.');
    if(verdad.length != 4)
      return false;
    for(i in verdad){
      if(!/^\d+$/g.test(verdad[i])
      ||+verdad[i]>255
      ||+verdad[i]<0
      ||/^[0][0-9]{1,2}/.test(verdad[i]))
        return false;
    }
    return true
}

function intoRange(num, max) {
    var num;
    if (parseInt(num) >= 1 && parseInt(num) <= max) {
       return true;
    } else {
       return false;
    }
}

burbuja();