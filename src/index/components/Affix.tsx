import * as React from 'react'
import { Affix, Button, Image, Popover } from 'antd';
import { IAffixData } from '@src/@types';
import { inject, observer } from 'mobx-react'
import emitter from "@event/index";
import { EVENT_UPDATE_CONFIG } from '@src/constants';


interface IState {
    affixs: IAffixData[];
}


@inject('AppStore')
@observer
export default class AffixComponent extends React.Component<IProps, IState, {}>  {
    constructor(props: IProps | Readonly<IProps>) {
        super(props);
        this.state = {
            affixs: []
        };
        emitter.on(EVENT_UPDATE_CONFIG, () => {
            this.loadAffixData();
        })
    }
    
    loadAffixData() {
        let { affixs } = this.props.AppStore;
        this.setState({
            affixs
        })
    }

    render() {
        return (<Affix target={() => window} style={{ position: 'absolute', bottom: "230px", right: "50px" }}>
            <section className="affix">{
                this.state.affixs.map((affix, index) =>
                    affix.hover
                        ?
                        <Popover key={index} placement="left"
                            content={(<Image
                                preview={false}
                                src={affix.image}
                                width={affix.width}
                            />)
                            } title="" trigger="hover">
                            <Button className="affix-btn" type="primary" onClick={() => {
                                affix.href && window.open(affix.href);
                            }}>
                                {affix.name}
                            </Button>
                        </Popover>
                        :
                        <Button className="affix-btn" type="primary" key={index} onClick={() => {
                            affix.href && window.open(affix.href);
                        }}>
                            {affix.name}
                        </Button>
                )
            }</section>
        </Affix>)
    }
}