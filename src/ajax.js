import axios from 'axios'

const ajax = {};

ajax.discover = function () {
	return new Promise((resolve, reject) => {
        axios.get('http://retocima/api/discover').then(function(response){
	      resolve(response.data);
	    })
    });
};

ajax.maplines = function (id) {
	return new Promise((resolve, reject) => {
        axios.get('http://retocima/maplines/'+id + '.txt').then(function(response){
            resolve(response.data.data);
        }).catch(err => reject());
    });
}

ajax.search = function (input) {
	return new Promise((resolve, reject) => {
        axios.get('http://retocima/api/cimas/search/' + input).then(function(response){
        	resolve(response.data);
        });
    });
}

ajax.provincias = function () {
	return new Promise((resolve, reject) => {
        axios.get('http://retocima/api/provincias').then(function(response){
        	resolve(response.data);
        });
    });
}

ajax.paises = function () {
	return new Promise((resolve, reject) => {
        axios.get('http://retocima/api/paises').then(function(response){
        	resolve(response.data);
        });
    });
}

export default ajax
