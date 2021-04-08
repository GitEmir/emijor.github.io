Letters = function() {
    this.lettersDOM = null;
    this.active = null;
    this.letters = [];
    this.alphabet = ["郕", "b", "尰", "d","韷","f","g","h","泙","j","k","l","m","n","o","蓏","q","r","s","嘳","i","u","v","w","x","蕙","z","~","&","|","^","ç","@","]","[","{","}","ù","*","µ","¤","$","£","€","°",")","(","+","贛","/","<",">","²","`","é","è","1","2","統","4","5","6","7","玭","薁","0"
    ];
  
    return this;
  };
  
  Letters.prototype.init = function( word ) {
    
    this.lettersDOM = document.querySelectorAll('.letter');
    this.active = true;
    var i;
    var nextChar;
    var lettersMax = this.lettersDOM.length;
    
    for ( i = 0; i < this.lettersDOM.length; i++ ) {
      
      if ( word.charAt( i ) != "" )
        nextChar = word.charAt( i );
      else 
        nextChar = false;
      
      this.letters.push( new Letter( this.lettersDOM[ i ],  nextChar ) );
      
    }
    
    if ( word.length > lettersMax ) {
      
      var wordContainer = document.getElementById("word");
  
      for ( i = lettersMax; i < word.length; i++ ) {
        var letterSpan = document.createElement('span');
        letterSpan.innerHTML = "";
        letterSpan.classList.add('letter');
        wordContainer.appendChild( letterSpan );
        this.letters.push( new Letter( letterSpan,  word.charAt( i ) ) );
      }
    }
    
    this.animate();
    
    return this;
    
  };
  
  Letters.prototype.animate = function() {
    var i;
    var random;
    var char;
    
    if ( this.active ) {
   
      window.requestAnimationFrame( this.animate.bind(this) );
      
      var indexes = [];
  
      for ( i = 0; i < this.letters.length; i++ ) {
      
        var current = this.letters[ i ];  
        
        if ( !current.isDead ) {     
          random = Math.floor(Math.random() * (this.alphabet.length - 0));
          char = this.alphabet[ random ]; 
          current.render( char );
        } else {
          indexes.push( i );
        }
      } 
      
      for ( i = 0; i < indexes.length; i++ ) {
        this.letters.splice( indexes[ i ], 1 );
      }
      
      if ( this.letters.length == 0 ) {
        this.stop();
      }
    }
  };
  
  Letters.prototype.start = function( word ) {
    this.init( word );
  };
  
  Letters.prototype.stop = function() {
    this.active = false;
  };
  
  Letter = function( DOMElement, nextChar ) {
    
    var scope = this;
    
    this.DOMEl = DOMElement;
    this.char = DOMElement.innerHTML;
    this.next = nextChar;
    this.speed = Math.floor(Math.random() * (300 - 50) );
    this.total = 0;
    this.duration = 2000;
    this.animating = true;
    this.isDead = false;
    
    this.timer = setInterval(function() { 
      if ( scope.animating === true ) {
        scope.total += scope.speed;
      } 
      scope.animating = !scope.animating;
    }, this.speed);
  
    this.animate();
    
    return this;
   
  };
  
  Letter.prototype.animate = function() {
    var i;
    var random;
    
    if ( !this.isDead ) {
      window.requestAnimationFrame( this.animate.bind(this) );
    }
    
    
    if ( this.total < this.duration ) {
      
      if ( this.animating ) {
        this.DOMEl.innerHTML = this.char;
      }
        
    } else {
      this.isDead = true;
      
      if ( !this.next ) {
        var parent = document.getElementById('word');
        parent.removeChild( this.DOMEl );
        return;
      }
      
      this.DOMEl.innerHTML = this.next;
    }
  };
  
  Letter.prototype.render = function( char ) {
    
    if ( !this.animating ) {
      this.char = char;
    }
    
  };
  
  var word = [ "DEVELOPMENT", "開発について", "ï¼©ã€€ï½ï½ã€€ï¼Žï¼Žï¼Ž", "ï¼¹ï½ï½•ã€€ï½—ï½‰ï½Œï½Œã€€ï½“ï½•ï½‚ï½ï½‰ï½”ï¼Œï½ï½Žï½„ã€€ï¼©ã€€ï½“ï½ˆï½ï½Œï½Œã€€ï½ï½ï½“ï½“ï½…ï½“ï½“ã€€ï½™ï½ï½•ï¼Žã€ï¼ï½Žï½…ï½ï½Œï½ï½‰ï½Ž" ];
  var nextWord = 1;
  
  var letters = new Letters();
  
  setTimeout( function() {
    
    letters.start( word[ nextWord ] );
    
    setInterval(function() {
      nextWord++;
      if ( nextWord >= word.length )
        nextWord = 0;
      
      letters.start( word[ nextWord ] );
    }, 10000);
    
  }, 2000);
  


































