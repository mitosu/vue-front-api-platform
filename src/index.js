//const { default: axios } = require("axios");

var app = new Vue({
    el: '#app',
    data: {
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        households: [],
        form: {
            name: '',
            description: '',
            numberRooms: '',
            city: '',
            province: '',
            postalCode: '',
            address: '',
            coverPhoto: '',
            active: false
        },
        htmlElements: {
            select: {
                key: ''
            },
            input: {
                filter: ''
            }
        }
    },
    methods: {
        create: function(e){
            e.preventDefault();
            axios.post('http://localhost:250/api/v1/households/register', this.form)
            .then((response) => {
                this.households.push(response.data);
                this.showAddModal = false;
                
                this.errorMsg = false;

                this.successMsg = true;
                this.formClean();
            }).catch(err => {
                this.errorMsg = true;
            });
        },
        formClean: function(){
            let self = this.form;
            Object.keys(this.form).forEach(function(key,index) {
                self[key] = '';
            });
        },
        filterOnChange: function(e){
            this.htmlElements.select.key = e.target.value;
        },
        filterList: function(){
            if(this.htmlElements.select.key !== ''){
                axios.get('http://localhost:250/api/v1/living_places').then(response => {
                    this.households = response.data['hydra:member'].filter(house => 
                        (this.htmlElements.select.key == 'name' && house.name.includes(this.htmlElements.input.filter)) ||
                        (this.htmlElements.select.key == 'city' && house.city.includes(this.htmlElements.input.filter)) ||
                        (this.htmlElements.select.key == 'province' && house.province.includes(this.htmlElements.input.filter)) ||
                        (this.htmlElements.select.key == 'postalCode' && house.postalCode.includes(this.htmlElements.input.filter))
                    );
                });
            }
        }
    },
    mounted() {
        axios.get('http://localhost:250/api/v1/living_places').then(response => {
            this.households = response.data['hydra:member'];
        });
    }
})





