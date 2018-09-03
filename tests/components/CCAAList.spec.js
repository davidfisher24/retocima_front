import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import CCAAList from '../../src/components/CCAAList.vue';

import communidadsMockData from '../../mocks/communidads';

describe('Listado', function () {
  let wrp;

  const routes = [
    { path: '/listado', name: 'listado' }
  ];

  const router = new VueRouter({ routes });

  beforeEach(() => {

    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuetify);

    wrp = mount(CCAAList, {
      localVue: localVue,
      router,
      propsData: {
        comms: communidadsMockData, 
      }
    });
  });

  it('displays the list of communidads correctly', () => {

    expect(wrp.findAll('.expansion-panel').length).toBe(2); // We make two expansion lists (to collapse one)
    expect(wrp.findAll('.expansion-panel__header').length).toBe(20) // 20 headers, one for each communidad

    communidadsMockData.forEach((c,i) => {
      expect(wrp.findAll('.expansion-panel__header').at(i).html()).toEqual(expect.stringContaining(c.nombre));
      expect(wrp.findAll('.expansion-panel__header').at(i).html()).toEqual(expect.stringContaining(c.cimas_count + " cimas"));
    })
  });

  it('displays the lists of provinces correctly under each communidad', () => {

    expect(wrp.findAll('.list').length).toBe(20); // We should have 20 lists of provinces
    const lists = wrp.findAll('.list'); // This gets the WRAPPERARRAY. WE have the method at() on this for the loop

    communidadsMockData.forEach((c,i) => {
      let node = lists.at(i); // get the element node. This is the WRAPPER
      expect(node.findAll('.list__tile').length).toBe(c.provincias.length) // Correct number provinces in each section
      
      c.provincias.forEach((p,i) => {
        expect(node.findAll('.list__tile').at(i).html()).toEqual(expect.stringContaining(p.nombre));
      })
    })
  });

});