/*
*----2019
*----Developed by Sergio de la Fuente
*/

Array.prototype.HowMany = function(item) {
  let cont = 0;
  this.forEach(arrayitem => {
    if (item == arrayitem) {
      cont += 1;
    }
  });
  return cont;
};
Array.prototype.print = function(separator) {
  return this.join(separator);
};

const App = new Vue({
    
    el: '#app',

    data: {
        codifinput: '',
        sentence: '',
        letters: [],
        dict: [],
        panel_start: true,
        panel_codi: false
    },
    methods: {
        Builder() {
            this.sentence = this.codifinput.split("");
            this.sentence.forEach(letter => {
                if (!this.letters.includes(letter)) {
                    this.letters.push(letter)
                }
            });
            this.letters.forEach(letter => {
                this.dict.push({ key: letter, 
                    value: this.sentence.HowMany(letter), bits: '' });
            });
            this.dict.sort(function (a, b) {
                return (b.value - a.value)
            })
            let bit = '1';
            for (let i = 0; i < this.dict.length; i++) {
                if (i == this.dict.length - 1) {
                    this.dict[i].bits = "0".repeat(i);
                } else {
                    this.dict[i].bits = "0".repeat(i) + bit;
                }

            }
            this.panel_codi = true;
            this.panel_start = false;
            console.log(this.dict);


        },
        Entropia() {
            var entropia = 0;
            this.dict.forEach(element => {
                let Pi = element.value/this.sentence.length
                entropia += Pi*Math.log2(1/Pi);
            });
            return Math.round(entropia * 100) / 100;
        },
        CadenaBits() {
            let cadena = [];
            console.log(this.sentence);
            
            this.sentence.forEach(letter => {
                for (let i = 0; i < this.dict.length; i++) {
                    if (letter == this.dict[i].key) {
                        cadena.push(this.dict[i].bits);
                        break;
                    }
                    
                }
            });
            return cadena;
        }
    }
})