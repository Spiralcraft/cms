export default function(options) 
{
  console.log("BaseURI is "+options.baseURL);
  var api = {
    get: function(method,callback)
      {
        return SPIRALCRAFT.ajax.get(options.baseURL+(method?("/"+method):""),callback);        
      },
    post: function(method,callback,data)
      {
        return SPIRALCRAFT.ajax.post(options.baseURL+(method?("/"+method):""),callback,data);
      },
    getJSON: function(method,callback)
      {
        return api.get
        (
          method,
          function(val) 
          { 
            if (val!=null && val.length>0) 
            { 
              var jval=SPIRALCRAFT.json.parse(val); 
              console.log("POST ",method,jval);
           
              if (callback) { callback(jval); }
            } else 
            { 
              if (callback) { callback(null); } 
            }
          }
        );
        
      },
    postJSON: function(method,callback,data)
      {
        return api.post
        (
          method,
          function(val) 
          { 
            if (val!=null && val.length>0) 
            { 
              var jval=SPIRALCRAFT.json.parse(val); 
              console.log("POST ",method,jval);
           
              if (callback) { callback(jval); }
            } else 
            { 
              if (callback) { callback(null); } 
            }
          },
          JSON.stringify(data)
        );
        
      },      
    fetchCommentsForModeration: function(callback)
      { return api.getJSON("commentsAdmin/",callback);
      },
    setApproved: function(callback,id,approved)
      { return api.postJSON
        ("commentsAdmin/"+id+"/.approve"
        ,callback
        ,{ approved: approved }
        );
        
      },
    setDeleted: function(callback,id,deleted)
      { return api.postJSON
        ("commentsAdmin/"+id+"/.delete"
        ,callback
        ,{ deleted: deleted }
        );
        
      }
      
  } 
  
  return api;
}
