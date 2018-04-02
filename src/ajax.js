import axios from 'axios'

const ajax = {};

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

ajax.addLogro = function (id) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.API_URL  + 'update-logro',{
            action: 'add',
            cima: id,
        },{ headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
        }}).then(response => resolve(response.data)).catch(err => reject(err));
    });
}

ajax.removeLogro = function (logro) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.API_URL  + 'update-logro',{
            action: 'remove',
            logro: JSON.stringify(logro),
        },{ headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
        }}).then(response => resolve(response.data)).catch(err => reject(err));
    });
}

ajax.userProvinceLogros = function (pid) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.API_URL + 'cimero-logros/' + pid,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
        }
      }).then(function (response) {
        resolve(response.data)
      }).catch(() => reject()); 
    })
}

ajax.updateAccount = function (model) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.API_URL + 'edit-account',model,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
        }
      }).then(function (response) {
        resolve(response.data)
      }).catch(err => reject(response.data.errors)); 
    })
}
export default ajax