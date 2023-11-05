
// Default keyword tells other files this is 
// the main function of this file

// export keyword makes this function available outside of 
// this file


/*

This code creates a react component. 
In React, a component is a piece of reusable code that 
represents a part of a user interface. 
Components are used to render, manage, and update the 
UI elements in your application. 

export default function Square() {
  return <button className="square">X</button>;
  / This returns a button. <button> is a jsx element
  / square is a css class, classname is css styling
}
*/


export default function Board() {
  return (
    <>
    <div className="board-row">
      <Square value="2"/>
      <Square />
      <Square />
    </div>
    <div className="board-row">
      <Square />
      <Square />
      <Square />
    </div>
    <div className="board-row">
      <Square />
      <Square />
      <Square />
    </div>
    </>
    /*
    fragments <></> are used to return multiple adjacent jsx elements
    */
  );
}

function Square({ value }) { // { value } indicates this component can be passed a prop called value
  // Functions need to start with capital letters.

  function handleClick() {
    console.log('Clicked!');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
      >
      {value}
    </button>
  );
}