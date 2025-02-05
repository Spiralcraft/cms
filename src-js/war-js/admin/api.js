function encodeQueryComponent(val)
{
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%3B/gi, ';').
    replace(/%20/g, '+');
}

function encodeQuery(obj , prefix)
{
    let str = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + "." + p : p;
        let v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          encodeQuery(v, k) :
          encodeQueryComponent(k) + "=" + encodeQueryComponent(v));
      }
    }
    return str.join("&");
}

export default function(options) 
{
  console.log("BaseURI is "+options.baseURL);
  var api = {
    get: function(method,callback,query)
      {
        let url=options.baseURL + (method?("/"+method):"") + (query?("?"+encodeQuery(query)):"");
        return SPIRALCRAFT.ajax.get(url,callback);        
      },
    post: function(method,callback,data)
      {
        return SPIRALCRAFT.ajax.post(options.baseURL+(method?("/"+method):""),callback,data);
      },
    getJSON: function(method,callback,query)
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
          },
          query
          
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
              console.log("POST ",method,data,jval);
           
              if (callback) { callback(jval); }
            } else 
            { 
              if (callback) { callback(null); } 
            }
          },
          JSON.stringify(data)
        );
        
      },    
    fetchCommentsForModeration: function(callback,query)
      { return api.getJSON("commentsAdmin/",callback,query);
      },
    expungeDeletedComments: function(callback)
      { return api.postJSON
        ("commentsAdmin/.expungeDeleted"
        ,callback
        ,{}
        )
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
        
      },
    setFlagged: function(callback,id,flagged)
      { return api.postJSON
        ("commentsAdmin/"+id+"/.flagIP"
        ,function(data) { api.commentsForModeration.updateRow(data); callback(data); }
        ,{ flagged: flagged }
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
  
  refresh(query)
  { 
    var self=this;
    this.api.fetchCommentsForModeration
     ( function(data) { self.set(data) } , query);
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
  
  expunge(query)
  {
    var self=this;
    this.api.expungeDeletedComments
      ( ()=>self.refresh(query) );
  }
}
