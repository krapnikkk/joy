import * as React from 'react'
import { Affix, Button, Image, Popover } from 'antd';
import { IAffixData } from '@src/@types';
import { AFFIX_DATA_URL } from '@src/constants';


interface IState {
    data: IAffixData[];
}
interface IProps {
}
export default class AffixComponent extends React.Component<IProps, IState, {}>  {
    constructor(props: IProps | Readonly<IProps>) {
        super(props);
        this.state = {
            data: []
        };
        this.loadAffixData();
    }

    loadAffixData(){
        fetch(AFFIX_DATA_URL).then((res)=>{return res.json}).then((data)=>{
            console.log(data);
            // this.setState({
            //     data:data.data
            // })
        })
    }

    render() {
        return (<Affix target={() => window} style={{ position: 'absolute', bottom: "230px", right: "50px" }}>
            <section className="affix">{
                this.state.data.map((item, index) =>
                    item.hover
                        ?
                        <Popover key={index} placement="left"
                            content={(<Image
                                preview={false}
                                src={item.image}
                                width={item.width}
                            />)
                            } title="" trigger="hover">
                            <Button className="affix-btn" type="primary" onClick={() => {
                                item.href && window.open(item.href);
                            }}>
                                {item.name}
                            </Button>
                        </Popover>
                        :
                        <Button className="affix-btn" type="primary" key={index} onClick={() => {
                            item.href && window.open(item.href);
                        }}>
                            {item.name}
                        </Button>
                )
            }</section>
        </Affix>)
    }
}