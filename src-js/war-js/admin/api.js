
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
        ,function(data) { api.commentsForModeration.updateRow(data); callback(data); }
        ,{ approved: approved }
        );
        
      },
    setDeleted: function(callback,id,deleted)
      { return api.postJSON
        ("commentsAdmin/"+id+"/.delete"
        ,function(data) { api.commentsForModeration.updateRow(data); callback(data); }
        ,{ deleted: deleted }
        );
        
      }
      
  } 
  
  api.commentsForModeration=new CommentsForModerationStore(api);
  
  return api;
}

class ArrayStore
{ 
  
  constructor(api)
  {
    this.api=api;
    this.data=[];
    this.subscribers=[];
  }
    
  set(data)
  { 
    this.data=data;
    this.notifySubscribers();
  }
  
  notifySubscribers()
  {
    for (var i=0;i<this.subscribers.length;i++)
    { this.subscribers[i](this.data);
    }
  }
  
  subscribe(callback)
  { 
    this.subscribers.push(callback);
    callback(this.data);
    return function() 
      { this.subscribers
         =this.subscribers.filter(function(val) { return val!=callback })
      };
  }
    
   
    
}

class CommentsForModerationStore extends ArrayStore
{
  constructor(api)
  { super(api);
  }
  
  refresh()
  { 
    var self=this;
    this.api.fetchCommentsForModeration
     ( function(data) { self.set(data) } );
  }
  
  updateRow(newRow)
  {
    var i=this.data.findIndex((oldRow) => { return oldRow.id==newRow.id });
    if (i>=0)
    { 
      this.data[i]=newRow;
      this.notifySubscribers();
    }
  }
}
