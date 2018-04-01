import axios from 'axios'

const ajax = {};

ajax.discover = function () {
	return new Promise((resolve, reject) => {
        axios.get(process.env.API_URL + 'discover').then(function(response){
	      resolve(response.data);
	    })
    });
};

ajax.maplines = function (id) {
	return new Promise((resolve, reject) => {
        axios.get(process.env.API_URL + 'maplines/'+id).then(function(response){
            resolve(response.data);
        }).catch(err => reject());
    });
}

ajax.search = function (input) {
	return new Promise((resolve, reject) => {
        axios.get(process.env.API_URL + 'cimas/search/' + input).then(function(response){
        	resolve(response.data);
        });
    });
}

ajax.provincias = function () {
	return new Promise((resolve, reject) => {
        axios.get(process.env.API_URL + 'provincias').then(function(response){
        	resolve(response.data);
        });
    });
}

ajax.paises = function () {
	return new Promise((resolve, reject) => {
        axios.get(process.env.API_URL + 'paises').then(function(response){
        	resolve(response.data);
        });
    });
}

export default ajax
