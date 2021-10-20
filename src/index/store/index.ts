import { IAffix, IConfig, IInfo } from '@src/@types';
import { CONFIG_DATA_URL, EVENT_UPDATE_CONFIG, EVENT_UPDATE_INFO } from '@src/constants';
import { observable, action } from 'mobx';
import emitter from "@event/index";
class AppStore {
    @observable affixs: IAffix[] = [];
    @observable info: IInfo;
    @action updateAffixs = (affixs: IAffix[]) => {
        this.affixs = affixs;
        emitter.emit(EVENT_UPDATE_CONFIG);
    }
    @action updateInfo = (info: IInfo) => {
        this.info = info;
        emitter.emit(EVENT_UPDATE_INFO);
    }

    constructor() {
        this.loadConfig();
    }

    async loadConfig() {
        let config: IConfig = await fetch(CONFIG_DATA_URL).then(res => res.json()).then((res) => {
            return res
        });
        let { affix, info } = config;
        this.updateAffixs(affix);
        this.updateInfo(info);
    }
}

export default new AppStore()