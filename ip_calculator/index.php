<?php

require_once '../partials/header.php';

?>
    <style>
      @import url('https://fonts.googleapis.com/css?family=Open+Sans');

*{
  box-sizing: border-box;
}
body{
  background: #3f51b5;
  color:#777;
  font-family: 'Open Sans', sans-serif;
  font-size:16px;
}
.form_container{
  background: #f1f1f1;
  max-width: 350px;
  margin:32px auto;
  box-shadow:20px 0px 0px #5c6bc0;
  
}

.table{
  background-color: white !important;
}

.menu{
  display:flex;
  box-shadow:0px 1px 1px rgba(0,0,0,0.3) ;
}
.active{
  background:rgba(0,0,0,0.5);
  color:#f1f1f1;
}
.menu-item{
  height: 42px;
  width:100%;
  line-height:42px;
  text-align:center;
  text-transform:capitalize;
  cursor:pointer;
}
.container-form{
  padding:10px;
}
.container-form p{
  margin:0px 0px 2px 0px;
  text-transform:capitalize;
}
.control {
  display:flex;
  margin-bottom:10px;
}
.control i{
  
  background: rgba(0,0,0,0.2);
  border:1px solid rgba(0,0,0,0.3);
  line-height:3em;
  padding:0px 7px;
  border-radius:4px 0px 0px 4px;
  
}



#example_length{
  display: none !important;
}

.dataTables_filter{
  display: none !important;
}

.dataTables_info{
  display: none !important;
}

.dataTables_paginate{
  display: none !important;
}

[type='text'],.control [type='password']{
  width: 100%;
  margin-left:-1px;
  line-height:3em;
  border:1px solid rgba(0,0,0,0.3);
  outline:none;
  padding-left:5px;
  color:#777;
  border-radius:0px 4px 4px 0px;
}
[type='submit'],[type='reset']{
  width: 100%;
  height: 3em;
  background: #3f51b5;
  color:#f1f1f1;
  border:0;
  cursor:pointer;
  border-radius:4px;
}

.control-group{
  display:flex;
  justify-content:space-between;
}
.control-linear{
  width: 49%;
}
    </style>
</head>
<body>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

  <div class="form_container">
    <div class="menu">
      <div  class="menu-item active" id="login">
        Calculadora IP
      </div>  
    </div>
    <div class="container-form">
     <form action="">
        <p>Direccion IP:</p>
        <div class="control">
          <i class="fa fa fa-envelope-o"></i>
          <input type="text" id="ip" placeholder="192.168.1.1"/>
        </div>
        <p>Prefijo de red:</p>
        <div class="control">
          <i class="fa fa-key"></i>
          <input type="text" id="pref" placeholder="1-32"/>
        </div>
        <p>Número de subredes</p>
        <div class="control">
          <i class="fa fa-key"></i>
          <input type="text" id="nsub" placeholder=""/>
        </div>
        <input type="submit" id="calc_btn" value="Ingresar numero de host por subred"/>
      </form>
    </div>
  </div>


  <div class="container mx-auto mb-4" >
    <table id="example" class="table table-responsive table-striped" style="margin-right: 20px;">
      
    </table>
  </div>

  <div class="container mx-auto">
      <table id="vlsmhost" class="table table-responsive table-striped" style="margin-right: 20px;" >
        
      </table>
  </div>


  <div class="container mx-auto">
      <table id="vlsmSubred" class="table table-responsive table-striped" style="margin-right: 20px;" >
        
      </table>
  </div>


  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  <script src="libs/Bootstrap/bootstrap.bulde.min.js"></script>
  <script src="https://cdn.datatables.net/v/dt/dt-1.13.4/datatables.min.js"></script>
  <!-- <script src="libs/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script> -->
  <script src="libs/DataTables/DataTables-1.13.4/js/dataTables.bootstrap5.min.js"></script>
  <script src="IP.js"></script>
  <script src="ipconverter.js"></script>
  
</body>

<?php

require_once '../partials/footer.php';

?>
</html>