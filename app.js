var app = angular.module("myApp",[]);

app.controller('myController', function($scope) {
    $scope.jsonData='';
    $scope.abcMydata="_a_b_c_d_e";
    $scope.abcMydata2="";
    var pp= ""+$scope.abcMydata;
    pp = pp.replace(/_/g,"");
    $scope.abcMydata2 =pp;
    $scope.data={items:[{"name":"id","$$hashKey":"object:8"},{"name":"name","$$hashKey":"object:11"},{"name":"text"}],modelName:'itemsTable'};
    $scope.data1='';
    $scope.data2='';    
    $scope.data3='';
    $scope.data4='';
    $scope.data5RegRoutes='';
    $scope.data6phpControllerFunctions='';
    $scope.data7Shema='';
    $scope.addnew = function(){
        $scope.data.items.push({'name':'text'});
    }
    $scope.deleteThis = function(item){
         $scope.data.items.splice($scope.data.items.indexOf(item), 1);
    }

    
    $scope.$watch(function () {
        return $scope.data;
    }, function () {
       calculate();
       $scope.jsonData=JSON.stringify($scope.data);
    }, true);
    
    $scope.$watch(function () {
        return $scope.jsonData;
    }, function () {
      $scope.data= JSON.parse($scope.jsonData);
    }, true);
    function calculate(){
         //{"items":[{"name":"id"},{"name":"name"},{"name":"text"}],"modelName":"users"}
         //= $scope.data.dataTableName.substr(0,$scope.data.modelName.length-1);
        console.log('fdfd:');
        
        var obj= "<div> ";
        for(var i=0;i<$scope.data.items.length;i++){
            var item=$scope.data.items[i];
             if(item.name=='id' || item.name=='created_by'){
                 
              }else{
            obj+="<input type='text' ng-model='"+"CreatItem_"+$scope.data.modelName+"."+item.name+"' />\n";}
        }
        obj+= "<a href='' class='btn btn-primary' ng-click='Creat_"+$scope.data.modelName+"()' >Create "+$scope.data.modelName+"</a>" ;
        obj+="</div>"
        $scope.data1 =obj;
        $scope.data2 =getTable();
        $scope.data3 =getAngularCRUDWith_mgr();
        $scope.data4 =getAngular_mgr();
        $scope.data5RegRoutes=getlaravelRouteReg();
        $scope.data6phpControllerFunctions=getlaravelControllerFunctions();
        $scope.data7Shema =getDBShema();
    }
    function getTable(){
        var s="";
        s+="<table class='table'>\n  <thead> \n <tr> ";
            for(var i=0;i<$scope.data.items.length;i++){
                var item=$scope.data.items[i];
                s+="<th>"+item.name+ "</th>\n";
            }
        s+="</tr></thead>";       
        s+="<tbody>";
            
            s+="<tr ng-repeat='"+$scope.data.modelName+' in '+$scope.data.modelName+"s ' >\n";
            for(var i=0;i<$scope.data.items.length;i++){
                var item=$scope.data.items[i];
                s+="<th>"+$scope.data.modelName+"."+item.name+ " <a href='' ng-click='Edit_"+$scope.data.modelName+"("+$scope.data.modelName+")'></a>save</th></th>\n";
            }
        s+="</tr></tbody>";
        s+="</table>";
        return s;
    }
    function getAngularCRUDWith_mgr(){
        var s="";
        s+="$scope."+$scope.data.modelName+"s = [];\n";
        
        //create
        s+="$scope."+'Creat_'+$scope.data.modelName+'= function(){\n';
        s+="var promise= "+$scope.data.modelName+"Manager.creat_"+$scope.data.modelName+"({"+$scope.data.modelName+":$scope.CreatItem_"+$scope.data.modelName+ "});\n";
        s+="promise.then(function(data){\n\t\tconsole.log(JSON.stringify(data));\n\t},function(err){\n\t\tconsole.log(JSON.stringify(data));\n\t});\n";
        s+="}\n";
        //edit
        s+="$scope."+'Edit_'+$scope.data.modelName+'= function(SaveItem_'+$scope.data.modelName+ '){\n';
        s+="var promise= "+$scope.data.modelName+"Manager.edit_"+$scope.data.modelName+"({"+$scope.data.modelName+":SaveItem_"+$scope.data.modelName+ "});\n";
        s+="promise.then(function(data){\n\t\tconsole.log(JSON.stringify(data));\n\t},function(err){\n\t\tconsole.log(JSON.stringify(data));\n\t});\n";
        s+="}\n";
        //delete
        s+="$scope."+'Delete_'+$scope.data.modelName+'= function(Obj'+$scope.data.modelName+'){\n';
        s+="var promise= "+$scope.data.modelName+"Manager.delete_"+$scope.data.modelName+"({"+$scope.data.modelName+":{id:Obj"+$scope.data.modelName+ ".id}});\n";
        s+="promise.then(function(data){\n\t\tconsole.log(JSON.stringify(data));\n\t},function(err){\n\t\tconsole.log(JSON.stringify(data));\n\t});\n";
        s+="}\n";
        //get
        s+="$scope."+'get_'+$scope.data.modelName+'= function(){\n';
        s+="var promise= "+$scope.data.modelName+"Manager.get_"+$scope.data.modelName+"({"+$scope.data.modelName+":{take:10,skip:0}});\n";
        s+="promise.then(function(data){\n\t\tconsole.log(JSON.stringify(data));\n"+
            "$scope."+$scope.data.modelName+"s=data;"
            +"\n\t},function(err){\n\t\tconsole.log(JSON.stringify(data));\n\t});\n";
        s+="}\n";
        return s;
    }
    function getAngular_mgr(){
    var s=
    "var "+$scope.data.modelName+"Manager =app.service('"+$scope.data.modelName+"Manager', function ($rootScope, $http, $q, API_URL) {\n";
        s+= "var self = this;\nself.creat_"+$scope.data.modelName+ "= function(data){                                                  \n" +           
	"var deferred = $q.defer();                                                             \n"+
    "                                                                                       \n" +   
    "$http.post(API_URL +'"+$scope.data.modelName+"/creat_"+$scope.data.modelName+"' ,data).success(function (response) {             \n"+
    "                                                \n"+
    "if (response['MyState'].code == 'OK') {                                                 \n"+
    "                            deferred.resolve(response['data']);                           \n"+
    " } else {                                 \n console.log(JSON.stringify(error));                               \n"+
    "                           deferred.reject(response);                                          \n"+
    "     }                                                                        \n"+
    "                                                                    \n" + 
    "       }).error(function (error) {                                                             \n" +
    "           console.log(JSON.stringify(error));                                                                 \n"  + 
    "           deferred.reject(error);                                                             \n"+
    "       });                                                                                     \n" ;
           
   s+="    return deferred.promise;\n\}\n\n";

        
        
    s+= "self.edit_"+$scope.data.modelName+"= function(data){   \n" +           
	"var deferred = $q.defer();                                                             \n"+
    "                                                                                       \n" +   
    "$http.post(API_URL +'"+$scope.data.modelName+"/edit_"+$scope.data.modelName+"' ,data).success(function (response) {             \n"+
    "                                                \n"+
    "if (response['MyState'].code == 'OK') {                                                 \n"+
    "                            deferred.resolve(response['data']);                           \n"+
    " } else {                                 \n console.log(JSON.stringify(error));                               \n"+
    "                           deferred.reject(response);                                          \n"+
"     }                                                                        \n"+
    "                                                                    \n" + 
    "       }).error(function (error) {                                                             \n" +
    "           console.log(JSON.stringify(error));                                                                 \n"  + 
    "           deferred.reject(error);                                                             \n"+
    "       });                                                                                     \n" ;
           
   s+="    return deferred.promise;\n}\n\n";
        
        
        
         s+= "self.delete_"+$scope.data.modelName+"= function(data){   \n" +           
	"var deferred = $q.defer();                                                             \n"+
    "                                                                                       \n" +   
    "$http.post(API_URL +'"+$scope.data.modelName+"/delete_"+$scope.data.modelName+"' ,data).success(function (response) {             \n"+
    "                                                \n"+
    "if (response['MyState'].code == 'OK') {                                                 \n"+
    "                            deferred.resolve(response['data']);                           \n"+
    " } else {                                 \n console.log(JSON.stringify(error));                               \n"+
    "                           deferred.reject(response);                                          \n"+
"     }                                                                        \n"+
    "                                                                    \n" + 
    "       }).error(function (error) {                                                             \n" +
    "           console.log(JSON.stringify(error));                                                                 \n"  + 
    "           deferred.reject(error);                                                             \n"+
    "       });                                                                                     \n" ;
           
   s+="    return deferred.promise;\n}\n\n";
        
        
        
         s+= "self.get_"+$scope.data.modelName+"= function(data){   \n" +           
	"var deferred = $q.defer();                                                             \n"+
    "                                                                                       \n" +   
    "$http.post(API_URL +'"+$scope.data.modelName+"/get_"+$scope.data.modelName+"' ,data).success(function (response) {             \n"+
    "                                                \n"+
    "if (response['MyState'].code == 'OK') {                                                 \n"+
    "                            deferred.resolve(response['data']);                           \n"+
    " } else {                                 \n console.log(JSON.stringify(error));                               \n"+
    "                           deferred.reject(response);                                          \n"+
"     }                                                                        \n"+
    "                                                                    \n" + 
    "       }).error(function (error) {                                                             \n" +
    "           console.log(JSON.stringify(error));                                                                 \n"  + 
    "           deferred.reject(error);                                                             \n"+
    "       });                                                                                     \n" ;
           
   s+="    return deferred.promise;\n}\n\n});";

        
        
        
        
            
       
        return s;
    }
    function getlaravelRouteReg(){
        var s="";
        s+="Route::post('/api/v1/"+$scope.data.modelName+"/creat_"+$scope.data.modelName+"' ,       '"+$scope.data.modelName+"Controller@"+"creat_"+$scope.data.modelName+"');\n";
        
        s+="Route::post('/api/v1/"+$scope.data.modelName+"/edit_"+$scope.data.modelName+"' , '"+$scope.data.modelName+"Controller@"+"edit_"+$scope.data.modelName+"');\n";
        
        s+="Route::post('/api/v1/"+$scope.data.modelName+"/delete_"+$scope.data.modelName+"' , '"+$scope.data.modelName+"Controller@"+"delete_"+$scope.data.modelName+"');\n";
        
        s+="Route::post('/api/v1/"+$scope.data.modelName+"/get_"+$scope.data.modelName+"' , '"+$scope.data.modelName+"Controller@"+"get_"+$scope.data.modelName+"');\n";
        return s;
    }
    function getlaravelControllerFunctions(){
        var s='';
        
       s+="public function creat_"+$scope.data.modelName+"(Request $request) {\n"+
        "$Mystatus = array('MyState' => ['code' => 'err', 'msg' => 'exception'], 'data' => '');\n"+
        "$data = $request->json()->all();\n"+
        "if(isset($data['"+$scope.data.modelName+"'])){\n";
          for(var i=0;i<$scope.data.items.length;i++){
                var item=$scope.data.items[i];
              if(item.name!='id' && item.name!='created_by' ){
                 s+="$"+item.name+" ='';\n"+
        "if(isset($data['"+$scope.data.modelName+"']['"+item.name+"'])){$"+item.name+"=$data['"+$scope.data.modelName+"']['"+item.name+"'];    }\n";
              }
          
          }
        
        s+="$"+$scope.data.modelName+" = new "+$scope.data.modelName+";\n";
         for(var i=0;i<$scope.data.items.length;i++){
                var item=$scope.data.items[i];
             if(item.name!='id' && item.name!='created_by' ){
                 s+="$"+$scope.data.modelName+"->"+item.name+" = $"+item.name+";\n";
             }
          
          }
        
        
        s+="$"+$scope.data.modelName+"->save();\n"+
        "$Mystatus['MyState']['code'] = 'OK';  \n"+      
        "$Mystatus['data']=$"+$scope.data.modelName+";\n"+
        "\n"+
        "}else{\n"+
        "\n"+
         "   $Mystatus['MyState']['msg'] = 'create_"+$scope.data.modelName+"_err1'; \n"+
          "  \n"+
        "}\n"+
        "return response()->json($Mystatus);\n"+
        "\n"+
        "}\n";
        //-----------------------------------------------------------------------------------
        
        s+="public function edit_"+$scope.data.modelName+"(Request $request) {\n"+
        "$Mystatus = array('MyState' => ['code' => 'err', 'msg' => 'exception'], 'data' => '');\n"+
        "$data = $request->json()->all();\n"+
        "if(isset($data['"+$scope.data.modelName+"']) && isset($data['"+$scope.data.modelName+"']['id'])){\n";
          for(var i=0;i<$scope.data.items.length;i++){
                var item=$scope.data.items[i];
              if(item.name=='id' ){
                 s+="$"+item.name+"=$data['"+$scope.data.modelName+"']['id'];\n"; 
              }else{
                  
              
                 s+="$"+item.name+" ='';\n"+
        "if(isset($data['"+$scope.data.modelName+"']['"+item.name+"'])){$"+item.name+"=$data['"+$scope.data.modelName+"']['"+item.name+"'];    }\n";
              }
          
          }
        
        s+="$"+$scope.data.modelName+" = "+$scope.data.modelName+"::find($id);\n";
         for(var i=0;i<$scope.data.items.length;i++){
                var item=$scope.data.items[i];
             if(item.name!='id'){
                 s+="$"+$scope.data.modelName+"->"+item.name+" = $"+item.name+";\n";
             }
                 
          
          }
        
        
        s+="$"+$scope.data.modelName+"->save();\n"+
        "$Mystatus['MyState']['code'] = 'OK';  \n"+      
        "$Mystatus['data']=$"+$scope.data.modelName+";\n"+
        "\n"+
        "}else{\n"+
        "\n"+
         "   $Mystatus['MyState']['msg'] = 'edit_"+$scope.data.modelName+"_err1'; \n"+
          "  \n"+
        "}\n"+
        "return response()->json($Mystatus);\n"+
        "\n"+
        "}\n";
        //------------------------------------------------------------------------------------------
         s+="public function get_"+$scope.data.modelName+"(Request $request) {\n"+
        "$Mystatus = array('MyState' => ['code' => 'err', 'msg' => 'exception'], 'data' => '');\n $take = 10;\n $skip = 0;\n"+
        "$data = $request->json()->all();\n"+
        "if(isset($data['"+$scope.data.modelName+"']) ){\n";
       
       s+= "if(isset($data['"+$scope.data.modelName+"']['take'])){$take=$data['"+$scope.data.modelName+"']['take'];    }\n";
        s+= "if(isset($data['"+$scope.data.modelName+"']['skip'])){$skip=$data['"+$scope.data.modelName+"']['skip'];    }\n";
          
        
        s+="$results = DB::table('"+$scope.data.modelName+"s')->orderBy('created_at', 'dsec')->take($take)->skip($skip)->get();\n"+
        "$Mystatus['data'] = $results;\n"+
        "$Mystatus['MyState']['code'] = 'OK';"+
        "\n"+
        "}else{\n"+
        "\n"+
         "   $Mystatus['MyState']['msg'] = 'get_"+$scope.data.modelName+"_err1'; \n"+
          "  \n"+
        "}\n"+
        "return response()->json($Mystatus);\n"+
        "\n"+
        "}\n";
        //---------------------------------------------------------------------------------------------------
        
            
                        
                     
        s+="public function delete_"+$scope.data.modelName+"(Request $request) {\n"+
        "$Mystatus = array('MyState' => ['code' => 'err', 'msg' => 'exception'], 'data' => '');\n"+
        "$data = $request->json()->all();\n"+
        "if(isset($data['"+$scope.data.modelName+"']) && isset($data['"+$scope.data.modelName+"']['id'])){\n";
          s+="$id=$data['"+$scope.data.modelName+"']['id'];\n"; 
             
        
        s+="$"+$scope.data.modelName+" = "+$scope.data.modelName+"::find($id);\n";
        
        
        s+="try{\n"+
            "$"+$scope.data.modelName+"->delete();\n"+
            "$Mystatus['MyState']['code'] = 'OK';  \n"+      
            "$Mystatus['data']='deleted.';\n"+
        "}catch(\\Exception $e){$Mystatus['msg'] = 'delete Error.';}\n"+
        
        "\n"+
        "}else{\n"+
        "\n"+
         "   $Mystatus['MyState']['msg'] = 'delete_"+$scope.data.modelName+"_err1'; \n"+
          "  \n"+
        "}\n"+
        "return response()->json($Mystatus);\n"+
        "\n"+
        "}\n";                        
     
        return s;
    }
                    
                    
                    
                    function getDBShema(){
                    /*
                        Schema::create('useraccounts',function(Blueprint $table){
           $table->bigIncrements('id');
           $table->string('fname',100);
           $table->string('lname',100);
           $table->string('email',120)->unique();
           $table->string('pass',150)->nullable();
           $table->string('phone',20);
           $table->integer('user_type')->default(10);
           $table->string('user_type_code',120)->default('MEMBER'); 
            
           $table->string('userToken',150)->nullable();
           $table->binary('accessToken')->nullable();
           $table->string('google_usersubkey',180)->nullable();
           $table->string('google_profile_photo',200)->nullable();
           $table->timestamps();
             
            
            
        });*/
                        return '';
                    }
                    
                    
                    
                    
                    

});   
    