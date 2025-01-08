import React from 'react';


function Test(thing) {
  return (
    <div class="grid grid-col-3 h-screen">
        <div class="col-start-0 row-span-1 col-span-2 border-2"> thing </div>
        <div class="col-start-3 row-span-0 border-2"> Chat </div>
        <div class="row-start-2 col-start-3 border-2"> Map</div>
        <div class="row-start-2 col-start-0 col-span-2 border-2"> mot</div>
     

    </div>
  );
}

export default Test;
