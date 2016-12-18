var model = {
    currentCat: null,
    cats: [{
        catName: 'Chewy',
        count: 0,
        imgURL: "https://placekitten.com/g/200/300"
    }, {
        catName: 'Candice',
        count: 0,
        imgURL: "https://placekitten.com/g/220/250"
    }, {
        catName: 'Waffles',
        count: 0,
        imgURL: "https://placekitten.com/g/250/220"
    }, {
        catName: 'Willem',
        count: 0,
        imgURL: "https://placekitten.com/g/230/270"
    }, {
        catName: 'Penelope',
        count: 0,
        imgURL: "https://placekitten.com/g/220/260"
    }]
};

var octopus = {
    init: function() {
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
    },
    incrementCounter: function() {
        model.currentCat.count++;
        catView.render();
    },
    getCurrentCat: function() {
        return model.currentCat;
    },
    getCats: function() {
        return model.cats;
    },
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    }
};


var catView = {
    init: function() {
        this.cat = document.getElementById('cat-area');
        this.catName = document.getElementById('cat-name');
        this.catPic = document.getElementById('cat-pic');
        this.counter = document.getElementById('cat-counter');
        this.catPic.addEventListener('click', function() {
            octopus.incrementCounter();
        })
        this.render();
    },
    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.catName.textContent = currentCat.catName;
        this.counter.textContent = currentCat.count;
        this.catPic.src = currentCat.imgURL;
    }
};


var catListView = {
    init: function() {
        this.list = document.getElementById('kitty-list');
        this.render();
    },

    render: function() {
        var cat, elem, i;
        var cats = octopus.getCats();
        this.list.innerHTML = '';
        for (i = 0; i < cats.length; i++) {
            cat = cats[i];
            elem = document.createElement('li');
            elem.textContent = cat.catName;
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                }
            })(cat));
            this.list.appendChild(elem);
        }
    }
}

octopus.init();