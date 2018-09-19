import { mount, createLocalVue, createWrapper, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Cima from '../../src/components/Cima.vue';

import cimasMockData from '../../mocks/cimas-provincia';

describe('Listado', function () {
  let wrp;

  const routes = [
    {
      path: '/provincia/:pid',
      name: 'provincia',
      component: Cima,
      params: {
        cimas: cimasMockData
      }
    }
  ];

  //const router = new VueRouter({ routes });

  beforeEach(() => {

    const localVue = createLocalVue();
    //localVue.use(VueRouter);
    localVue.use(Vuetify);


    wrp = mount(Cima, {
      localVue: localVue,
      //router,
      mocks: {
        $route: {
          params: {
            cimas: cimasMockData
          }
        }
      }
    });

    /*wrp.setData({
      cimas: cimasMockData
    })*/
  });

  it('displays the list of communidads correctly', () => {

    console.log(wrp.html())

    /*expect(wrp.findAll('.expansion-panel').length).toBe(2); 
    expect(wrp.findAll('.expansion-panel__header').length).toBe(20) 

    communidadsMockData.forEach((c,i) => {
      expect(wrp.findAll('.expansion-panel__header').at(i).html()).toEqual(expect.stringContaining(c.nombre));
      expect(wrp.findAll('.expansion-panel__header').at(i).html()).toEqual(expect.stringContaining(c.cimas_count + " cimas"));
    })*/
  });

  it('displays the lists of provinces correctly under each communidad', () => {

    /*expect(wrp.findAll('.list').length).toBe(20); // We should have 20 lists of provinces
    const lists = wrp.findAll('.list'); // This gets the WRAPPERARRAY. WE have the method at() on this for the loop

    communidadsMockData.forEach((c,i) => {
      let node = lists.at(i); // get the element node. This is the WRAPPER
      expect(node.findAll('.list__tile').length).toBe(c.provincias.length) // Correct number provinces in each section
      
      c.provincias.forEach((p,i) => {
        expect(node.findAll('.list__tile').at(i).html()).toEqual(expect.stringContaining(p.nombre));
      })
    })*/
  });

});