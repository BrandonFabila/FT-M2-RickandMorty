let traverseDomAndCollectElements = function(matchFunc, startEl = document.body) { //startEl es el body del html 
  let resultSet = [];

  /*if (typeof startEl === "undefined") {//si no se pasa parametro 
    startEl = document.body;
  }*/

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) {//si se encuentra
    resultSet.push(startEl);
  }
  
  for (let i = 0; i < startEl.children.length; i++){
    let aux = traverseDomAndCollectElements(matchFunc, startEl.children[i])//verifica cada hijo que busca
    resultSet = [...resultSet, ...aux]//concatena asegurandose de no pisar los viejos por los nuevos del aux enviados 

  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


let selectorTypeMatcher = function(selector) {
  // tu código aquí
  if (selector[0] === '#') {
    return 'id';
  }
  else if (selector[0] === '.') {
    return 'class';
  }
  else if (selector.split('.').length > 1) {//separa y guarda en array ['div', 'pepito']
    return 'tag.class'
  }
  return 'tag';
  
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

let matchFunctionMaker = function(selector) {
  let selectorType = selectorTypeMatcher(selector);
  let matchFunction;

  if (selectorType === "id") { 
    matchFunction = (elemento) => `#${elemento.id}` === selector;//true/false

  } else if (selectorType === "class") {
    matchFunction = (elemento) => {
      let classes = elemento.classList;//[] <---array con nombre de las clases del elemento
      classes.forEach(el => { 
        if (`.${el}` === selector) return true
      });
    return false
    }

  } else if (selectorType === "tag.class") {
    matchFunction = elemento => {
      let [t, c] = selector.split('.'); //separa en el punto [t= tag, c= class]
      return matchFunctionMaker(t)(elemento) && matchFunctionMaker(`.${c}`)(elemento);//se llama y pasa el tag 
        // se llama dos veces una funcion distinta primero a matchfunctionmaker y despues a matchfunction
    }
    
  } else if (selectorType === "tag") { 
    matchFunction = (elemento) => elemento.tagName === selector.toUpperCase();
    
  }
  return matchFunction;
};

let $ = function(selector) {
  let elements;
  let selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
