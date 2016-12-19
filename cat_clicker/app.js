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
        catAdminView.init();
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
    },
    renderAdminPanel: function() {
        return catAdminView.render();
    },
    updateCats: function(name, picUrl) {
        var resp = '';
        if (name != null) {
            model.currentCat.catName = name;
            resp += 'Updated cat name' + name + '\n';
        } else {
            resp += 'Did not update cat name\n';
        }
        if (picUrl != null) {
            model.currentCat.imgURL = picUrl;
            resp += 'Updated cat pic' + picUrl + '\n';
        } else {
            resp += 'Did not update cat pic\n';
        }
        octopus.clearAdminSpace();
        octopus.init();
    },
    clearAdminSpace: function() {
        return catAdminView.clearAdminSpace();
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

var catAdminView = {
    init: function() {
        var adminBtn;

        this.adminSpace = document.getElementById('admin-space');

        adminBtn = document.createElement('button');
        adminBtn.setAttribute('id', 'admin-btn');
        adminBtn.textContent = 'Admin';
        adminBtn.addEventListener('click', function() {
            octopus.clearAdminSpace();
            octopus.renderAdminPanel();
        })

        this.adminSpace.appendChild(adminBtn);
    },
    render: function() {
        var adminPanel, nameForm, urlForm, nameLabel, urlLabel, editBtn, backBtn;
        var editName, editPic;
        var currentCat = octopus.getCurrentCat();

        nameLabel = document.createElement('label');
        nameLabel.setAttribute('id', 'name-label');
        nameLabel.textContent = 'Cat Name';

        nameForm = document.createElement('input');
        nameForm.setAttribute('id', 'edit-name');
        nameForm.setAttribute('value', currentCat.catName);

        urlLabel = document.createElement('label');
        urlLabel.setAttribute('id', 'url-label');
        urlLabel.textContent = 'Cat Pic';

        urlForm = document.createElement('input');
        urlForm.setAttribute('id', 'edit-pic');
        urlForm.setAttribute('value', currentCat.imgURL);

        editBtn = document.createElement('input');
        editBtn.setAttribute('type', 'submit');
        editBtn.setAttribute('name', 'edit-btn');
        editBtn.addEventListener('click', function() {
            octopus.updateCats(editName.value, editPic.value);
        });

        backBtn = document.createElement('button');
        backBtn.setAttribute('id', 'back-btn');
        backBtn.textContent = 'Back';
        backBtn.addEventListener('click', function() {
            octopus.clearAdminSpace();
            octopus.init();
        });

        this.adminSpace.appendChild(nameLabel);
        this.adminSpace.appendChild(nameForm);
        this.adminSpace.appendChild(urlLabel);
        this.adminSpace.appendChild(urlForm);
        this.adminSpace.appendChild(editBtn);
        this.adminSpace.appendChild(backBtn);

        editName = document.getElementById('edit-name');
        editPic = document.getElementById('edit-pic');
        console.log(editName.value);
    },
    clearAdminSpace: function() {
        var adminSpace = document.getElementById('admin-space');
        while (adminSpace.firstChild) {
            adminSpace.removeChild(adminSpace.firstChild);
        };
    }
}

octopus.init();


// admin button disappears when pressed
// replace admin button with back button when console is open
// set event on click for submit button
// update info and remove admin panel
// replace admin button