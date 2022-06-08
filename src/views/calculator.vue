<template>

<!--  I used vanilla JS approach and not Vue approach for the code of this calculator as per the requirements of the exercise -->
  <div id="calc-container" class="container">
    Dark mode calculator!
    <div id="box" class="calculator-box">
      <div class="calculator-results">
        0
      </div>
      <div id="buttons-area" class="calculator-buttons">
      </div>
    </div>
  </div>
</template>

<script>
export default{
  mounted(){
    this.populateButtons();
  },

  methods:{
    populateButtons(){
      const buttons = ['AC', '+/-', '%', '÷', '7', '8', '9', 'x', '4', '5','6', '-', '1', '2', '3', '+', '0', '.', '=']

      for(let i=0;i<buttons.length;i++){

        let item = document.createElement('div');
        item.textContent = buttons[i];
        item.className = 'key'
        if( (i+1) % 4 === 0) item.className += ' colored';
        if(i < 3) item.className += ' upper'
        if(buttons[i] === '=') item.className += ' colored last-row-right-corner'
        if(buttons[i] === '0') item.className += ' double last-row-left-corner'

        document.getElementById('buttons-area').appendChild(item);
      }
    }
  }
}
</script>
<style lang="scss">
#calc-container{
  $calculator-width: 350px;
  $calculator-height: 550px;
  $key-width: calc(#{$calculator-width} / 4 - 3px);
  $key-height: calc(#{$calculator-height} / 7);

  &.container{
    max-width:1200px;
    margin:0 auto;
    text-align:center;
  }

  .calculator-box{
    position:relative;
    background-color: #2a2d2f;
    width: $calculator-width;
    height:$calculator-height;
    border-radius:12px;
    opacity:0.9;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

    .calculator-buttons{
      position:absolute;
      bottom:2px;
      left:0;
      right:0;
    }

    .calculator-results{
      color:#fff;
      font-size:4rem;
      display:flex;
      justify-content: center;
      padding-left: calc(#{$calculator-width} - #{$key-width}); // position the result in the center of the last key.
      align-items:end;
      height: calc(#{$calculator-height} / 7 * 2); // we assign 2 of the 7 calculator rows.
      padding-right:2px;
      font-weight:300;

    }

    .key{
      background-color:#5f6062;
      height:$key-height;
      width:$key-width;
      display:inline-flex;
      color:#fff;
      align-items:center;
      justify-content:center;
      font-weight:400;
      cursor:pointer;
      font-size:1.6rem;
      margin:1px;
      &:hover{
        filter:brightness(80%);
      }
      &.double{
        width: calc(#{$key-width} * 2 + 2px);
        justify-content: center;
        padding-right: $key-width; // add padding ot center text with other rows
      }
      &.upper{
        background-color:#3e4143;
      }
      &.colored{
        background-color:#ff9e0b;
      }
      &.last-row-left-corner{
        border-bottom-left-radius: 10px;
      }
      &.last-row-right-corner{
        border-bottom-right-radius: 10px;
      }
    }

  }
}

</style>

