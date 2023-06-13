<?php


if($_POST['action'] == 'getMask')
{
    $pref = $_POST['pref'];
    $array = [];
    $cont = 0;

    for ($i=0; $i < 4; $i++) { 

        for ($j=0; $j < 8; $j++) { 
            $cont++;
            if ($cont <= $pref) {
                $array[$i] = $array[$i].'1';
            }else{
                $array[$i] = $array[$i].'0';
            }
        }
    }
 
    echo json_encode($array, JSON_UNESCAPED_UNICODE);


}

if($_POST['action'] == 'binToDec')
{
    $array = $_POST['array'];
    $decArray = [];

    for ($i=0; $i < count($array); $i++) { 
        $decArray[$i] = bindec($array[$i]);
    }
    
    echo json_encode($decArray, JSON_UNESCAPED_UNICODE);
}

if($_POST['action'] == 'netBin')
{
    $ip  = $_POST['ipBin'];
    $mask = $_POST['maskBin'];

    $concat = '';
    $net = [];

    for ($i=0; $i < 4; $i++) { 

        for ($j=0; $j < 8; $j++) { 
            if ($ip[$i][$j] && $mask[$i][$j]) {
                $concat .= '1';
            }else{
                $concat .= '0';
            }
        }

        $net[$i] = $concat;
        $concat = '';
    }

    echo json_encode($net, JSON_UNESCAPED_UNICODE);
}

if($_POST['action'] == 'firstHost')
{
    $nBits  = $_POST['nBitH'];
    $netBin  = $_POST['netBin'];

    $concat = '';

    $wildCard = [];

    // for ($i=0; $i < 4; $i++) { 

    //     for ($j=0; $j < 8; $j++) { 
    //         if () {
    //             $concat .= '1';
    //         }else{
    //             $concat .= '0';
    //         }
    //     }

    //     $net[$i] = $concat;
    //     $concat = '';
    // }

    $aux = '';

    for ($i=0; $i < 8; $i++) { 
        if ($i < 7) {
            $aux .= $netBin[3][$i];
        }else{
            $aux .= '1';
        }
    }

    $netBin[3] = $aux;

    

    echo json_encode($netBin, JSON_UNESCAPED_UNICODE);
}

if($_POST['action'] == 'lastHost')
{
    $pref  = $_POST['pref'];
    $netBin  = $_POST['netBin'];

    $concat = '';
    $cont = 1;
    $aux = '';
    $lastHost = [];

    for ($i=0; $i < 4; $i++) { 
        for ($j=0; $j < 8; $j++) { 
            
            if ($cont > $pref) {
                if ($i == 3 && $j == 7) {
                    $aux .= '0';
                }else{
                    $aux .= '1';
                }
            }else {
                $aux .= $netBin[$i][$j];
            }
            $cont++;
        }
        $lastHost[$i] = $aux;
        $aux = '';
    }

    

    echo json_encode($lastHost, JSON_UNESCAPED_UNICODE);
}



if($_POST['action'] == 'broadcast')
{
    $pref  = $_POST['pref'];
    $netBin  = $_POST['netBin'];

    $concat = '';
    $cont = 1;
    $aux = '';
    $lastHost = [];

    for ($i=0; $i < 4; $i++) { 
        for ($j=0; $j < 8; $j++) { 
            
            if ($cont > $pref) { 
                $aux .= '1';
            }else {
                $aux .= $netBin[$i][$j];
            }
            $cont++;
        }
        $lastHost[$i] = $aux;
        $aux = '';
    }

    

    echo json_encode($lastHost, JSON_UNESCAPED_UNICODE);
}

if($_POST['action'] == 'setWildcard')
{
    $wildCard  = [];
    $pref  = $_POST['pref'];


    $cont = 0;
    $aux = '';

    for ($i=0; $i < 4; $i++) { 
        for ($j=0; $j < 8; $j++) { 
            if ($cont < $pref) {
                $aux .= '0';
            }else{
                $aux .= '1';
            }
            $cont++;
        }
        $wildCard[$i] = $aux;
        $aux = '';
    }

    

    echo json_encode($wildCard, JSON_UNESCAPED_UNICODE);
}

if($_POST['action'] == 'nexNet')
{
    $pref  = $_POST['pref'];
    $broad = $_POST['broadcast'];
    $cont = 0;
    $aux = '';

    for ($i=0; $i < 4; $i++) { 
        
        for ($j=0; $j < 8; $j++) { 
            
            if ($cont > $pref-2) {
                if ($cont == $pref-1) {
                    $aux .= '1';
                }else {
                    $aux .= '0';
                }
                
            }else {
                $aux .= $broad[$i][$j];
            }

            $cont++;

        }

        $broad[$i] = $aux; 
        $aux = '';
    }
    

    

    echo json_encode($broad, JSON_UNESCAPED_UNICODE);
}