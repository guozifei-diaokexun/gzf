const state = {
  componentList: [], // 中间拖动的组件list
  rightPanelData: {}, //右侧的组件各属性集合
  activeIndex: -1,
};

const actions = {
  addShapeData({ commit, state },data) {
   commit('pushDataToList',data);
  },
  clearCanvasData({ commit }) {
    commit('clearList');
  },
  changeActiveIndex({ commit }, data) {
    commit('changeActiveIndex',data);
  },
  removeNode({ commit }) {
    commit('removeNode');
  },
  saveWrapStyle({ commit }, data) {
    commit('saveWrapStyle',data);
  },
  setRightPanelData({ commit }, data) {
    commit('setRightPanelData',data);
  }
};

const mutations = {
  pushDataToList(state, data) {
    state.componentList.push(data);
  },
  clearList(state) {
    state.componentList = [];
    state.activeIndex = -1;
  },
  changeActiveIndex(state,data) {
    state.activeIndex = data;
  },
  removeNode(state) {
    const { activeIndex } = state;
    state.componentList.splice(activeIndex,1);
    state.activeIndex = -1;
  },
  saveWrapStyle(state, data) {
    const { style, index } = data;
    const cloneStyle = Object.assign({},style);
    for(let key in cloneStyle) {
      cloneStyle[key] = cloneStyle[key] + 'px';

    }
    state.componentList[index].wrapStyle = cloneStyle;
  },
  setRightPanelData(state, data) {
    state.rightPanelData = data;
  }
};

export default {
  state,
  actions,
  mutations
};
