var topics = [
    {
        name: "Fraction Review",
        numberComplete: 20,
        numberTotal: 50
    },
    {
        name: "Fraction Review",
        numberComplete: 20,
        numberTotal: 50
    }
];

var cnt = 0;

function slider() {
    cnt++;
    if(cnt == topics.length) {
        cnt= 0;
    }

    var slider= document.getElementById('slider');
}

function next() {
    cnt++; 
    if(cnt == topics.length) {
        cnt = 0;
    }
      
    var slider= document.getElementById('slider');
}

function prev() {
    cnt--;
    if(cnt == -1) {
        cnt = imgadr.length - 1;
    }

    var slider = document.getElementById('slider');
}
